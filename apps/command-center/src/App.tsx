import { useEffect, useRef, useState } from "react";
import ultronIcon from "./assets/ultron-icon.svg";
import { env } from "./config/ev.ts";
import "./App.css";
import { InfoCard, type Tone } from "./components/InfoCard/InfoCard.tsx";
import { CircularProgressBar } from "./components/CircularProgressBar/CircularProgressBar.tsx";

type CoreStatus = "checking" | "online" | "offline";
type UltronState = "idle" | "thinking" | "error";
type SystemStatusResult = {
  cpu_percent: number;
  memory_percent: number;
  disk_percent: number;
  uptime_seconds: number;
  uptime_string?: string;
};

function getUltronStateTone(state: UltronState) {
  const tone: Tone =
    state === "idle" ? "accent" : state === "error" ? "error" : "warning";

  return tone;
}

function getRequestPresentation(sending: boolean, state: UltronState) {
  const status = sending
    ? "PROCESSING..."
    : state === "error"
      ? "ERROR"
      : "READY";

  const tone: Tone = sending
    ? "warning"
    : state === "error"
      ? "error"
      : "online";
  return {
    status: status,
    tone: tone,
  };
}

function getCoreTone(core: CoreStatus) {
  const tone: Tone =
    core === "online" ? "online" : core === "checking" ? "warning" : "error";

  return tone;
}

function App() {
  const [coreStatus, setCoreStatus] = useState<CoreStatus>("checking");
  const [ultronState, setUltronState] = useState<UltronState>("idle");
  const [systemStatus, setSystemStatus] = useState<SystemStatusResult>({
    cpu_percent: 0,
    disk_percent: 0,
    memory_percent: 0,
    uptime_seconds: 0,
  });
  const [textInput, setTextInput] = useState<string>("");
  const [ultronResponse, setUltronResponse] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);

  const requestPresentation = getRequestPresentation(isSending, ultronState);
  const ultronTone = getUltronStateTone(ultronState);
  const coreTone = getCoreTone(coreStatus);

  const inputRef = useRef<HTMLInputElement>(null);

  async function sendMessage(message: string) {
    let messageAux = message.replace(/\s+/g, " ");
    messageAux = messageAux.trim();

    if (!isSending && messageAux !== "") {
      try {
        setIsSending(true);
        setUltronState("thinking");
        setUltronResponse("...");
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
    async function checkCore(): Promise<boolean> {
      try {
        const response = await fetch(`${env.coreUrl}/health`);

        if (!response.ok) throw new Error("Core unavailable");

        const data = await response.json();

        if (data.status === "ok") {
          setCoreStatus("online");
          return true;
        }

        setCoreStatus("offline");
        setUltronResponse("");
        return false;
      } catch {
        setCoreStatus("offline");
        setUltronResponse("");
        return false;
      }
    }

    async function getSystemStatus() {
      try {
        const response = await fetch(`${env.coreUrl}/system_status`);

        if (!response.ok) {
          throw new Error("Couldn't check System Status");
        }

        const data: SystemStatusResult = await response.json();

        const days = Math.floor(data.uptime_seconds / 86400);
        const hours = Math.floor((data.uptime_seconds % 86400) / 3600);
        const minutes = Math.floor((data.uptime_seconds % 3600) / 60);

        data.uptime_string = `${days}d  ${hours}h ${minutes}m`;
        setSystemStatus(data);
      } catch {
        setSystemStatus({
          cpu_percent: 0,
          disk_percent: 0,
          memory_percent: 0,
          uptime_seconds: 0,
        });
      }
    }

    async function updateCoreStatus() {
      const isOnline = await checkCore();

      if (isOnline) {
        await getSystemStatus();
      } else {
        setSystemStatus({
          cpu_percent: 0,
          disk_percent: 0,
          memory_percent: 0,
          uptime_seconds: 0,
        });
      }
    }

    updateCoreStatus();

    const intervalId = setInterval(updateCoreStatus, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (!isSending && coreStatus === "online") inputRef.current?.focus();
  }, [isSending, coreStatus]);

  return (
    <main className="app-shell">
      <header className="header title">
        <span className="header-title">ULTRON</span>
        <span className="header-subtitle">Command Center</span>
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
            <InfoCard title="" content="v0.0.1 • Local Core" />
          </div>
        </aside>
        <section className="main-panel panel">
          <div className={`ultron-face ${ultronTone}`}>
            <img width={"150px"} height={"150px"} alt="" src={ultronIcon} />
          </div>
          <div className="ultron-core-status">
            {coreStatus === "checking" && (
              <>
                <span>🟡</span>
                <span className={`title core ${coreTone}`}>❯ CHECKING</span>
              </>
            )}
            {coreStatus === "offline" && (
              <>
                <span>🔴</span>
                <span className={`title core ${coreTone}`}>❯ OFFLINE</span>
              </>
            )}

            {coreStatus === "online" && (
              <>
                <span>🟢</span>
                <span className={`title core ${coreTone}`}>❯ ONLINE</span>
              </>
            )}
          </div>

          <span className="main-panel-title title">ULTRON</span>
          <span className="title">AI Command Center</span>

          {coreStatus === "checking" && <p>Checking Core...</p>}
          {coreStatus === "online" && (
            <>
              <div className={`ultron-state ${ultronTone}`}>
                <span>{ultronState.toUpperCase()}</span>
              </div>
              <div className="chat-area">
                <div
                  className="response-area"
                  onClick={() => {
                    inputRef.current?.focus();
                  }}
                >
                  <p>
                    {ultronResponse == "" ? "Seja bem vindo." : ultronResponse}
                  </p>
                </div>
                <div className="input-area">
                  <input
                    ref={inputRef}
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
                  <button
                    type="button"
                    onClick={() => {
                      sendMessage(textInput);
                    }}
                    disabled={isSending || textInput.trim() === ""}
                  >
                    ⮚
                  </button>
                </div>
              </div>
            </>
          )}
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

          <InfoCard title="System Status" content="">
            <div className="progess-bar-container top">
              <div>
                <CircularProgressBar
                  label="CPU Usage"
                  value={systemStatus.cpu_percent}
                  size={100}
                  strokeColor="azure"
                  circleColor="cadetblue"
                />
              </div>

              <div>
                <CircularProgressBar
                  label="Disk Usage"
                  value={systemStatus.disk_percent}
                  size={100}
                  strokeColor="deepskyblue"
                  circleColor="darkslategray"
                />
              </div>
            </div>
            <div className="progess-bar-container">
              <div>
                <CircularProgressBar
                  label="Memory Usage"
                  value={systemStatus.memory_percent}
                  size={100}
                  strokeColor="darkseagreen"
                  circleColor="darkolivegreen"
                />
              </div>
            </div>
          </InfoCard>
          <div style={{ marginTop: "auto" }}>
            <InfoCard
              title="Tempo de Atividade"
              content={
                systemStatus.uptime_string
                  ? systemStatus.uptime_string
                  : "0d 0h 0m"
              }
            />
          </div>
        </aside>
      </div>
      <footer className="footer">
        <span>ULTRON Core</span>
        <span className={`core ${coreTone}`}>
          • {coreStatus.charAt(0).toUpperCase() + coreStatus.slice(1)}
        </span>
        <span>v0.0.1</span>
      </footer>
    </main>
  );
}

export default App;
