import styles from "./board.module.css";

const COLUMNS_AMOUNT = 5;
const LINES_AMOUNT = 6;

function Board() {
  const line = Array(COLUMNS_AMOUNT).fill("");
  const board: string[][] = Array(LINES_AMOUNT).fill(line);

  console.log(board);

  return (
    <div className={styles.wrapper}>
      <ul className={styles.board}>
        {board.map((line) => {
          return (
            <li>
              <ul className={styles.line}>
                {line.map((content, index) => {
                  return <li className={styles.tile}>{index}</li>;
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Board;
