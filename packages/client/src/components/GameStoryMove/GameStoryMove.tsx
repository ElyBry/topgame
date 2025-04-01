import React from "react";
import styles from "./GameStoryMove.module.css";
import {Move} from "../../core/Move";

interface GameStoryMoveProps {
  moves: Move[];
}

const GameStoryMove: React.FC<GameStoryMoveProps> = ({ moves }) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <tbody>
        {moves && moves.length > 0 ? (
          moves.map((move, index) => (
            <tr key={index + 1}>
              <td>{move.figure.getName() + move.getMoveNotation()}</td>
            </tr>
          ))
        ) : (
          <tr className={styles.none}>
            <td>Нет выполненных ходов</td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  );
};

export default GameStoryMove;