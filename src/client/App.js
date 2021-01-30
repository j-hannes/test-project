import { useEffect, useState } from "react";
import { usePath } from "./usePath";

const gameStyle = {
  display: "inline-block",
  margin: "50px",
  paddingLeft: "20px",
  paddingRight: "20px",
  border: "1px solid #ccc",
};

const errorStyle = {
  color: "red",
};

const boardStyle = {
  display: "inline-block",
  borderTop: "1px solid #ccc",
  borderLeft: "1px solid #ccc",
  margin: "20px",
};

const cellStyle = {
  width: "30px",
  height: "30px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderBottom: "1px solid #ccc",
  borderRight: "1px solid #ccc",
};

const showMap = false;

function App() {
  const [status, setStatus] = useState("");
  const [board, setBoard] = useState([[]]);
  const [error, setError] = useState("");
  const [path, setPath] = usePath([]);

  useEffect(() => {
    setError("");
    fetch(`http://localhost:3001?path=${path.join(",")}`)
      .then((response) => response.json())
      .then(({ result }) => {
        const { board, status } = result;
        setStatus(status);
        setBoard(board);
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
      <br />
      Path:{" "}
      <input
        value={path}
        onChange={(e) => setPath(e.target.value.split(","))}
      />
      <p>Status: {status}</p>
      {error && <p style={errorStyle}>{error}</p>}
      <hr />
      <div style={boardStyle}>
        {board.map((row, i) => (
          <div key={i}>
            {row.map((cell, j) => (
              <span key={j} style={cellStyle}>
                {showMap
                  ? cell
                  : (["-", "O", "D"].includes(cell) && <>&nbsp;</>) || cell}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default App;
