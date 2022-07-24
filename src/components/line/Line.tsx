import { memo, useEffect, useState } from "react";
import styles from "./line.module.css";

type LineProps = {
  solution: string;
  reveal: boolean;
  word: string;
};

function Line({ word, reveal, solution }: LineProps) {
  const [isRevealed, setIsRevealed] = useState(reveal);
  const brokenWord = word.split("");

  useEffect(() => {
    if (!isRevealed && reveal) {
      setIsRevealed(true);
    }
  }, [isRevealed, reveal]);

  return (
    <ul className={styles.line}>
      {brokenWord.map((letter, index) => {
        let classNames = styles.tile;

        if (isRevealed) {
          if (solution[index] === letter) {
            classNames += " " + styles.inTheRightPosition;
          } else if (solution.includes(letter)) {
            classNames += " " + styles.inTheWrongPosition;
          }
        }

        return (
          <li key={index} className={classNames}>
            {letter}
          </li>
        );
      })}
    </ul>
  );
}

export default memo(Line);
