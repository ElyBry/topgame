import React from "react";
import {Figure} from "../../core/Figure";
import styled from 'styled-components'

interface GameEatedFiguresProps {
  eatenPieces: Figure[];
}

const GameEatedFigures: React.FC<GameEatedFiguresProps> = ({ eatenPieces }) => {
  return (
    <ContainerStyle>
      <h2>Сьеденные фигуры</h2>
      <FiguresStyle>
        {eatenPieces.map((piece, index) => (
          // <div key={index} className={`${styles.piece} ${styles[piece.color]}`}>
          <div key={index}>
            <img src={piece.image.src}  alt={"Фигура"}/>
          </div>
        ))}
      </FiguresStyle>
    </ContainerStyle>
  );
};

const ContainerStyle = styled.div`
    font-family: Arial, sans-serif;
    margin: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
`;

const FiguresStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
`;

export default GameEatedFigures;