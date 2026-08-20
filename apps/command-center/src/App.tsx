import { useEffect, useState } from "react";

type CoreStatus = "checking" | "online" | "offline";

function App() {
  const [coreStatus, setCoreStatus] = useState<CoreStatus>("checking");

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
  }, []);

  return (
    <main>
      <h1>ULTRON</h1>

      {coreStatus === "checking" && <p>Checking Core...</p>}
      {coreStatus === "online" && <p>🟢 CORE ONLINE</p>}
      {coreStatus === "offline" && <p>🔴 CORE OFFLINE</p>}
    </main>
  );
}

export default App;
