import Board from "components/board/Board";
import { API, GUESS_LIMIT_LETTERS, LINES_AMOUNT } from "consts";
import { useEffect, useState } from "react";

function pickRandomWord(words: string[]): string {
  return words[Math.floor(Math.random() * words.length)];
}

function Orchestrator() {
  const [solution, setSolution] = useState("");
  const [guess, setGuess] = useState("");
  const [currentGuessPosition, setCurrentGuessPosition] = useState(0);
  const [isGameFinished, setIsGameFinished] = useState(false);

  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((words) => {
        const word = pickRandomWord(words);

        setSolution(word);
      });
  }, []);

  useEffect(() => {
    const handleOnKeyDown = (event: KeyboardEvent) => {
      if (isGameFinished) {
        return;
      }

      if (guess === solution) {
        setIsGameFinished(true);
        return;
      }

      const isSingleLetter = event.key.length === 1;
      const hasTypedAllLetters = guess.length === GUESS_LIMIT_LETTERS;
      const shouldRemoveLastLetter = event.key === "Backspace";
      const shouldSaveGuess = event.key === "Enter";
      const isLastGuess = currentGuessPosition === LINES_AMOUNT - 1;

      if (shouldSaveGuess && hasTypedAllLetters) {
        if (!isLastGuess) {
          setCurrentGuessPosition((previousPosition) => previousPosition + 1);
          setGuess("");
        } else {
          setIsGameFinished(true);
        }

        return;
      }

      if (shouldRemoveLastLetter) {
        setGuess((previousLetters) => previousLetters.slice(0, -1));
        return;
      }

      if (isSingleLetter && !hasTypedAllLetters) {
        setGuess((previousLetters) => previousLetters + event.key);
      }
    };

    document.addEventListener("keydown", handleOnKeyDown);

    return () => {
      document.removeEventListener("keydown", handleOnKeyDown);
    };
  }, [guess, solution, currentGuessPosition, isGameFinished]);

  return (
    <Board
      isFinished={isGameFinished}
      solution={solution}
      currentLinePosition={currentGuessPosition}
      guess={guess}
    />
  );
}

export default Orchestrator;
