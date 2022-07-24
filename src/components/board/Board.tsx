import Line from "components/line/Line";
import { LINES_AMOUNT, COLUMNS_AMOUNT } from "consts";
import { useLayoutEffect, useState } from "react";
import styles from "./board.module.css";

type BoardProps = {
  currentLinePosition: number;
  guess: string;
};

function Board({ currentLinePosition, guess }: BoardProps) {
  const line = Array(COLUMNS_AMOUNT).fill("-").join("");
  const [board, setBoard] = useState<string[]>(Array(LINES_AMOUNT).fill(line));

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
        {board.map((line, index) => {
          return (
            <li key={index}>
              <Line word={line} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Board;
