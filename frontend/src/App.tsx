import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [msg, setMsg] = useState("");
  const [feed, setFeed] = useState<string[]>([]);

  useEffect(() => {
    refresh();
    setInterval(() => {
      refresh();
    }, 5000);
  }, []);

  async function refresh() {
    return await fetch("/chatty/read/read01").then((res) => res.json()).then((
      res: string[][],
    ) => setFeed(["", ...res.slice(1).flat()]));
  }
  async function submit() {
    setMsg("");
    await fetch("/chatty/write/write01", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ msg }),
    });
    await refresh();
  }

  return (
    <>
      <div>
        <pre>
          {feed.join('\n * ')}
        </pre>
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") submit();
          }}
        />
      </div>
    </>
  );
}

export default App;
