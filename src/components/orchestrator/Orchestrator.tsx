import Board from "components/board/Board";
import { useEffect, useState } from "react";

const API = "http://localhost:3001/words";

function pickRandomWord(words: string[]): string {
  return words[Math.floor(Math.random() * words.length)];
}

function Orchestrator() {
  const [solution, setSolution] = useState("");

  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((words) => {
        const word = pickRandomWord(words);

        setSolution(word);
      });
  }, []);

  return <Board />;
}

export default Orchestrator;
