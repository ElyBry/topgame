import React from "react";
import styles from "./GameEatedFigures.module.css";
import {Figure} from "../../core/Figure";

interface GameEatedFiguresProps {
  eatenPieces: Figure[];
}

const GameEatedFigures: React.FC<GameEatedFiguresProps> = ({ eatenPieces }) => {
  return (
    <>
      <h2 className={styles.title}>Съеденные фигуры</h2>
      <div className={styles.figures}>
        {eatenPieces.map((piece, index) => (
          <div key={index} className={`${styles.piece} ${styles[piece.color]}`}>
            <img src={piece.image.src}  alt={"Фигура"}/>
          </div>
        ))}
      </div>
    </>
  );
};

export default GameEatedFigures;