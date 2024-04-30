import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";

import "./App.css";
import Die from "./Die";

function App() {
  const [diceValues, setDiceValues] = useState(randomDice());
  const [tenzies, setTenzies] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const allHeld = diceValues.every((die) => die.isheld);
    const firstvalue = diceValues[0].value;
    const allValueSame = diceValues.every((die) => die.value === firstvalue);
    if (allHeld && allValueSame) {
      setTenzies(true);
      updateHighScore();
    } else {
      setTenzies(false);
    }
  }, [diceValues]);

  function updateHighScore() {
    if (highScore === 0 || currentScore < highScore) {
      setHighScore(currentScore);
    }
  }

  function randomDice() {
    const arrObj = [];
    for (let i = 0; i < 10; i++) {
      const randomNum = Math.floor(Math.random() * 6) + 1;
      arrObj.push({
        value: randomNum,
        isheld: false,
        id: nanoid(),
      });
    }
    return arrObj;
  }

  function rollDice() {
    if (!tenzies) {
      setDiceValues((prevDiceValues) =>
        prevDiceValues.map((die) => {
          return die.isheld
            ? { ...die }
            : { ...die, value: Math.floor(Math.random() * 6) + 1 };
        })
      );
      setCurrentScore((prevScore) => prevScore + 1);
    } else {
      setDiceValues(randomDice());
      setTenzies(false);
      setCurrentScore(0);
    }
    console.log(currentScore);
  }

  function holdDice(id) {
    setDiceValues((prevDiceValues) =>
      prevDiceValues.map((die) => {
        return die.id === id
          ? { ...die, isheld: !die.isheld }
          : { ...die, isheld: die.isheld };
      })
    );
  }

  const diceEl = diceValues.map((die, index) => {
    return (
      <Die
        key={index}
        value={die.value}
        isheld={die.isheld}
        holdDice={() => holdDice(die.id)}
      />
    );
  });
  return (
    <>
      <main>
        {tenzies && <ReactConfetti />}
        <h1>All time high score: {highScore}</h1>
        <div className="dice-container">{diceEl}</div>
        <button onClick={rollDice}>{tenzies ? "New Game" : "Roll Dice"}</button>
      </main>
    </>
  );
}

export default App;
