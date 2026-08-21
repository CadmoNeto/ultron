import { useEffect, useState } from "react";
import ultronIcon from "./assets/ultron-icon.svg";

type CoreStatus = "checking" | "online" | "offline";

function App() {
  const [coreStatus, setCoreStatus] = useState<CoreStatus>("checking");
  const [textInput, setTextInput] = useState<string>("");
  const [ultronResponse, setUltronResponse] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);

  async function sendMessage(message: string) {
    let messageAux = message.trim();
    messageAux = messageAux.replace(/\s+/g, " ");

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

  useEffect(() => {
    async function checkCore() {
      try {
        const response = await fetch("http://127.0.0.1:8000/health");

        if (!response.ok) {
          throw new Error("Core unvaliable");
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
    <main>
      <img
        width={"150px"}
        height={"150px"}
        alt=""
        src={ultronIcon}
        style={{ filter: "brightness(0) invert(1)" }}
      />
      <h1>ULTRON</h1>

      {coreStatus === "checking" && <p>Checking Core...</p>}
      {coreStatus === "online" && (
        <>
          <p>🟢 CORE ONLINE</p>
          <div>
            <input
              placeholder="Escreva aqui..."
              name="textInput"
              value={textInput}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  sendMessage(textInput);
                }
              }}
              onChange={(event) => {
                setTextInput(event.target.value);
              }}
            />
            &nbsp;
            <button
              type="button"
              onClick={() => {
                sendMessage(textInput);
              }}
              disabled={isSending || textInput.trim() == ""}
            >
              Enviar
            </button>
          </div>
        </>
      )}
      {coreStatus === "offline" && <p>🔴 CORE OFFLINE</p>}
      <p>{ultronResponse}</p>
    </main>
  );
}

export default App;
