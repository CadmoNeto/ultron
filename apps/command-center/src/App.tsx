import { useEffect, useState } from "react";
import ultronIcon from "./assets/ultron-icon.svg";

type CoreStatus = "checking" | "online" | "offline";

function App() {
  const [coreStatus, setCoreStatus] = useState<CoreStatus>("checking");
  const [textInput, setTextInput] = useState<string>("");
  const [ultronResponse, setUltronResponse] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);

  async function sendMessage(message: string) {
    let messageAux = message.replace(/\s+/g, " ");
    messageAux = messageAux.trim();

    if (!isSending && messageAux !== "") {
      try {
        setIsSending(true);
        const bodyRequest = JSON.stringify({ message: messageAux });

        const response = await fetch("http://127.0.0.1:8000/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: bodyRequest,
        });

        if (!response.ok) {
          const answer = `Infelizmente não consegui processar...`;
          setUltronResponse(answer);
          setTextInput("");

          return;
        }
        const data = await response.json();

        setUltronResponse(data["message"]);
        setTextInput("");
      } catch {
        setUltronResponse("Infelizmente não consegui processar...");
        setTextInput("");
        setCoreStatus("offline");
      } finally {
        setIsSending(false);
      }
    }
  }

  useEffect(() => {
    async function checkCore() {
      try {
        const response = await fetch("http://127.0.0.1:8000/health");

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
    const intervalId = setInterval(checkCore, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 3fr 1fr",
        gap: "12px",
        padding: "12px",
        boxSizing: "border-box",
        background:
          "radial-gradient(circle,rgba(87, 109, 122, 1) 0%, rgba(11, 50, 66, 1) 84%)",
      }}
    >
      <div
        style={{
          padding: "1%",
          color: "#FFF",
          border: "1px solid rgba(64, 142, 173, 1)",
          borderRadius: "20px",
          background:
            "radial-gradient(circle,rgba(64, 142, 173, 1) 0%, rgba(24, 71, 89, 1) 84%)",
        }}
      >
        texto
        <br />
        texto
        <br />
        texto
        <br />
        texto
        <br />
        texto
        <br />
        texto
        <br />
        texto
        <br />
      </div>
      <div
        style={{
          position: "relative",
          padding: "3% 1%",
          margin: "0 1%",
          border: "1px solid rgba(64, 142, 173, 1)",
          borderRadius: "20px",
          background:
            "radial-gradient(circle,rgba(64, 142, 173, 1) 0%, rgba(24, 71, 89, 1) 84%)",
        }}
      >
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
              <span style={{ color: "#FFD166" }}>❯ CHECKING</span>
            </>
          )}
          {coreStatus === "offline" && (
            <>
              <span>🔴</span>
              <span style={{ color: "#DD2E44" }}>❯ OFFLINE</span>
            </>
          )}

          {coreStatus === "online" && (
            <>
              <span>🟢</span>
              <span style={{ color: "#78B159" }}>❯ ONLINE</span>
            </>
          )}
        </div>

        <h1 style={{ color: "#FFF" }}>ULTRON</h1>

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
      </div>
      <div
        style={{
          padding: "1%",
          color: "#FFF",
          border: "1px solid rgba(64, 142, 173, 1)",
          borderRadius: "20px",
          background:
            "radial-gradient(circle,rgba(64, 142, 173, 1) 0%, rgba(24, 71, 89, 1) 84%)",
        }}
      >
        texto
        <br />
        texto
        <br />
        texto
        <br />
        texto
        <br />
        texto
        <br />
        texto
        <br />
        texto
        <br />
      </div>
    </main>
  );
}

export default App;
