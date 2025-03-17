import React from "react";
import {Move} from "../../core/Move";
import styled from 'styled-components'

interface GameStoryMoveProps {
  moves: Move[];
}

const GameStoryMove: React.FC<GameStoryMoveProps> = ({ moves }) => {
  return (
    <ContainerStyle>
      <h2>История ходов</h2>
      <TableStyle>
        <tbody>
        {moves && moves.length > 0 ? (
          moves.map((move, index) => (
            <tr key={index + 1}>
              <td>{move.figure.getName() + move.getMoveNotation()}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td>Нет доступных ходов</td>
          </tr>
        )}
        </tbody>
      </TableStyle>
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
    max-width: 300px;
`;


const TableStyle = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
    
    & th, & td {
        padding: 8px;
        text-align: center;
        border: 1px solid #ddd;
    }

    & th {
        background-color: #2c3e50;
        color: white;
    }

    & tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    & tr:hover {
        background-color: #ddd;
    }
`;

export default GameStoryMove;