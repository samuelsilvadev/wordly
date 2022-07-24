import Line from "components/line/Line";
import { LINES_AMOUNT, COLUMNS_AMOUNT } from "consts";
import { useLayoutEffect, useState } from "react";
import styles from "./board.module.css";

type BoardProps = {
  isFinished: boolean;
  solution: string;
  currentLinePosition: number;
  guess: string;
};

const hasFinishedTyping = (word: string) => !/-$/.test(word);

const EMPTY_LINE = Array(COLUMNS_AMOUNT).fill("-").join("");

function Board({
  currentLinePosition,
  guess,
  solution,
  isFinished,
}: BoardProps) {
  const [board, setBoard] = useState<string[]>(
    Array(LINES_AMOUNT).fill(EMPTY_LINE)
  );

  useLayoutEffect(() => {
    setBoard((previousBoard) => {
      const clonedBoard = previousBoard.slice(0);

      clonedBoard[currentLinePosition] = guess.padEnd(5, "-");

      return clonedBoard;
    });
  }, [guess, currentLinePosition]);

  return (
    <div className={styles.wrapper}>
      <ul className={styles.board}>
        {board.map((word, index) => {
          const hasPassedToNextLine = index === currentLinePosition - 1;

          return (
            <li key={index}>
              <Line
                word={word}
                reveal={
                  (hasPassedToNextLine || isFinished) && hasFinishedTyping(word)
                }
                solution={solution}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Board;
