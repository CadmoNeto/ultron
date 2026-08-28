import { useEffect, useState } from "react";
import ultronIcon from "./assets/ultron-icon.svg";
import { env } from "./config/ev.ts";
import "./App.css";
import InfoCard from "./components/InfoCard/InfoCard.tsx";

type CoreStatus = "checking" | "online" | "offline";
type UltronState = "idle" | "thinking" | "error";

function getRequestPresentation(sending, state) {
  const status = sending
    ? "PROCESSING..."
    : state === "error"
      ? "ERROR"
      : "READY";

  const tone:   = sending ? "warning" : state === "error" ? "error" : "online";
  return {
    status: status,
    tone: tone,
  };
}

function App() {
  const [coreStatus, setCoreStatus] = useState<CoreStatus>("checking");
  const [ultronState, setUltronState] = useState<UltronState>("idle");
  const [textInput, setTextInput] = useState<string>("");
  const [ultronResponse, setUltronResponse] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);

  const requestPresentation = getRequestPresentation(isSending, ultronState);

  async function sendMessage(message: string) {
    let messageAux = message.replace(/\s+/g, " ");
    messageAux = messageAux.trim();

    if (!isSending && messageAux !== "") {
      try {
        setIsSending(true);
        setUltronState("thinking");
        const bodyRequest = JSON.stringify({ message: messageAux });

        const response = await fetch(`${env.coreUrl}/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: bodyRequest,
        });

        if (!response.ok) {
          const answer = `Infelizmente não consegui processar...`;
          setUltronResponse(answer);
          setUltronState("error");
          setTextInput("");

          return;
        }
        const data = await response.json();

        setUltronResponse(data["message"]);
        setUltronState("idle");
        setTextInput("");
      } catch {
        setUltronResponse("Infelizmente não consegui processar...");
        setUltronState("error");
        setTextInput("");
      } finally {
        setIsSending(false);
      }
    }
  }

  useEffect(() => {
    async function checkCore() {
      try {
        const response = await fetch(`${env.coreUrl}/health`);

        if (!response.ok) {
          throw new Error("Core unavailable");
        }

        const data = await response.json();

        if (data.status === "ok") {
          setCoreStatus("online");
        } else {
          setCoreStatus("offline");
        }
      } catch {
        setCoreStatus("offline");
      }
    }

    checkCore();
    const intervalId = setInterval(checkCore, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <main className="app-shell">
      <header className="header title">
        <span className="header-title">ULTRON</span>
        <span>Command Center</span>
      </header>
      <div className="content-shell">
        <aside className="side-panel panel">
          <span className="title side-panel-title">CORE STATUS</span>
          <InfoCard
            title="Connection"
            content={coreStatus.toUpperCase()}
            tone={
              coreStatus === "online"
                ? "online"
                : coreStatus === "offline"
                  ? "error"
                  : "warning"
            }
          />

          <InfoCard
            title="ULTRON"
            content={ultronState.toUpperCase()}
            tone={
              ultronState === "idle"
                ? "accent"
                : ultronState === "error"
                  ? "error"
                  : "warning"
            }
          />

          <InfoCard
            title="About"
            content={
              coreStatus === "online"
                ? "ULTRON Core está online e pronto para receber requisições"
                : coreStatus === "offline"
                  ? "ULTRON Core está offline no momento"
                  : "ULTRON Command Center está tentando se conectar ao ULTRON Core"
            }
          />

          <div style={{ marginTop: "auto" }}>
            <InfoCard title="" content="v0.1.0 • Local Core" />
          </div>
        </aside>
        <section className="main-panel panel">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img width={"150px"} height={"150px"} alt="" src={ultronIcon} />
          </div>
          <div
            style={{
              position: "absolute",
              top: "16px",
              right: "20px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "14px",
            }}
          >
            {coreStatus === "checking" && (
              <>
                <span>🟡</span>
                <span className="title" style={{ color: "var(--warning)" }}>
                  ❯ CHECKING
                </span>
              </>
            )}
            {coreStatus === "offline" && (
              <>
                <span>🔴</span>
                <span className="title" style={{ color: "var(--error)" }}>
                  ❯ OFFLINE
                </span>
              </>
            )}

            {coreStatus === "online" && (
              <>
                <span>🟢</span>
                <span className="title" style={{ color: "var(--online)" }}>
                  ❯ ONLINE
                </span>
              </>
            )}
          </div>

          <h1 className="title">ULTRON</h1>

          {coreStatus === "checking" && <p>Checking Core...</p>}
          {coreStatus === "online" && (
            <div>
              <input
                placeholder="Escreva aqui..."
                name="textInput"
                value={textInput}
                onKeyDown={(event) => {
                  if (!isSending && textInput.trim() !== "") {
                    if (event.key === "Enter") {
                      sendMessage(textInput);
                    }
                  }
                }}
                onChange={(event) => {
                  setTextInput(event.target.value);
                }}
                disabled={isSending}
              />
              &nbsp;
              <button
                type="button"
                onClick={() => {
                  sendMessage(textInput);
                }}
                disabled={isSending || textInput.trim() === ""}
              >
                Enviar
              </button>
            </div>
          )}
          <p style={{ color: "#FFF" }}>{ultronResponse}</p>
        </section>
        <aside className="side-panel panel">
          <span className="title side-panel-title">INTERACTION</span>
          <InfoCard title="Input" content="TEXT" />

          <InfoCard
            title="Request"
            content={requestPresentation.status}
            tone={requestPresentation.tone}
          />

          <InfoCard title="Endpoint" content="/chat" tone={"accent"} />
        </aside>
      </div>
      <footer>
        <span>
          ULTRON Core •{" "}
          {coreStatus.charAt(0).toUpperCase() + coreStatus.slice(1)}
        </span>
      </footer>
    </main>
  );
}

export default App;
