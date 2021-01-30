import { useEffect, useState } from "react";
import { usePath } from "./usePath";

const gameStyle = {
  display: "inline-block",
  margin: "50px",
  padding: "20px",
  border: "1px solid #ccc",
};

const errorStyle = {
  color: "red",
};

function App() {
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [path, setPath] = usePath([]);

  useEffect(() => {
    setError("");
    fetch(`http://localhost:3001?path=${path.join(",")}`)
      .then((response) => response.json())
      .then(({ result }) => {
        setStatus(result);
      })
      .catch((error) => {
        console.error(error);
        setError(`${error}`);
      });
  }, [path]);

  return (
    <section style={gameStyle}>
      <h1>Help Frodo to destroy the ring</h1>
      <aside>
        Instructions:
        <ul>
          <li>
            Press Up, Down, Left, Right to navigate Frodo over an imaginary map
          </li>
          <li>
            You can also enter the path in the input instead, use (n,s,e,w)
            separated by commas
          </li>
          <li>Reload the page to restart the game</li>
        </ul>
      </aside>
      <hr />
      Path:{" "}
      <input
        value={path}
        onChange={(e) => setPath(e.target.value.split(","))}
      />
      <p>Status: {status}</p>
      {error && <p style={errorStyle}>{error}</p>}
    </section>
  );
}

export default App;
