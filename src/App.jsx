import { useState, useEffect } from "react";

function App() {
  const [booshFact, setBooshFact] = useState("");
  const [reason, setReason] = useState("");
  const [reasons, setReasons] = useState([
    "Plastic bag exposure",
    "Does not use first name",
    "Hand Farts",
    "Claims to be back, isn't back",
    "Assumes People Talking About Him",
  ]);

  function onSubmit() {
    setReasons([...reasons, reason]);
  }

  function onDelete(index) {
    let reasonsCopy = reasons.slice();
    reasonsCopy.splice(index, 1);
    console.log(reasonsCopy);

    setReasons(reasonsCopy);
  }

  useEffect(() => {
    (async () => {
      await getNorrisFacts();
    })();
  }, [reasons]);

  async function getNorrisFacts() {
    const response = await fetch("https://api.chucknorris.io/jokes/random");
    const fact = await response.json();
    const chuckFact = fact.value;
    const factNameReplace = chuckFact
      .replaceAll("Chuck Norris", "Boosh")
      .replaceAll("CHUCK NORRIS", "BOOSH")
      .replaceAll("Chuck", "Boosh")
      .replaceAll("Chunk Norris", "Boosh")
      .replaceAll("Chunk", "Boosh");
    console.log(factNameReplace);

    setBooshFact(factNameReplace);
  }

  return (
    <div>
      <h1>Reasons Boosh Sucks</h1>
      <ul>
        {reasons.map((reason, index) => {
          return (
            <>
              <li key={index}>{reason}</li>
              <button onClick={() => onDelete(index)}>Delete</button>
            </>
          );
        })}
      </ul>
      <div>
        <input
          value={reason}
          placeholder="Submit your reasons"
          onChange={(event) => setReason(event.target.value)}
        ></input>
        <button onClick={onSubmit}>Submit</button>
      </div>
      <div>
        <p>{booshFact}</p>
      </div>
    </div>
  );
}

export default App;
