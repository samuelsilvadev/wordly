import { memo } from "react";
import styles from "./line.module.css";

type LineProps = {
  word: string;
};

function Line({ word }: LineProps) {
  const brokenWord = word.split("");

  return (
    <ul className={styles.line}>
      {brokenWord.map((letter, index) => {
        return (
          <li key={index} className={styles.tile}>
            {letter}
          </li>
        );
      })}
    </ul>
  );
}

export default memo(Line);
