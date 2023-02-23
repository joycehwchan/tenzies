import { useEffect, useState } from "react";
import "./App.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const generateNewDie = () => {
    return {
      value: Math.ceil(Math.random() * 6),
      selected: false,
      id: nanoid(),
    };
  };

  const allNewDice = () => {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  };

  const rollDice = () => {
    setCount((count) => count + 1);
    if (!win) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.selected ? die : generateNewDie();
        })
      );
    } else {
      setCount(0);
      setWin(false);
      setDice(allNewDice());
    }
  };

  const selectDice = (id) => {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, selected: !die.selected } : die;
      })
    );
  };

  const [dice, setDice] = useState(allNewDice());
  const [win, setWin] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const allSelected = dice.every((die) => die.selected);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allSelected && allSameValue) {
      setWin(true);
      // console.log("you won!");
    }
  }, [dice]);

  const diceElements = dice.map((die) => (
    <Die
      value={die.value}
      key={die.id}
      selected={die.selected}
      selectDice={() => selectDice(die.id)}
    />
  ));

  return (
    <main>
      {win && <Confetti />}
      <div className="top">
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same.
          <br />
          Click on each die to freeze it.
          <br />
          <br />
          <strong>No. of rolls: {count}</strong>
        </p>
      </div>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-btn" onClick={rollDice}>
        {win ? "New Game" : "Roll Dice"}
      </button>
    </main>
  );
}

export default App;
