import Button from "../Button/Button";
import { ROUTES } from "../../utils/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChessPawn, faChessKing, faChessQueen, faChessRook, faChessKnight, faChessBishop } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'

const HowToPlay = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(ROUTES.START_GAME)
  };

  return (
    <HowToStyle>
      <p>Каждый игрок управляет 16 фигурами. Цель — поставить мат королю противника, то есть загнать его в безвыходное положение.</p>
      <h3>Фигуры:</h3>
      <ul>
        <li><FontAwesomeIcon icon={faChessKing} /> Король: ходит на одну клетку в любом направлении.</li>
        <li><FontAwesomeIcon icon={faChessQueen} /> Ферзь: двигается на любое количество клеток по&nbsp;вертикали, горизонтали и&nbsp;диагонали.</li>
        <li><FontAwesomeIcon icon={faChessRook} /> Ладья: по горизонтали и вертикали.</li>
        <li><FontAwesomeIcon icon={faChessBishop} /> Слон: по диагонали.</li>
        <li><FontAwesomeIcon icon={faChessKnight} /> Конь: ходит буквой "Г".</li>
        <li><FontAwesomeIcon icon={faChessPawn} /> Пешка: двигается вперед на одну клетку, <br />при первом ходе — на две.</li>
      </ul>
      <h3>Геймплей:</h3>
      <p>Игроки по очереди делают ходы, начиная с белых. Когда король под угрозой — шах. Если его нельзя спасти — мат.</p>
      <p>Готовы проверить свои силы? Тогда вперед!</p>
      <HowToButtonStyle>
        <Button label="Начать игру" type="button" onClick={handleNavigate} />
      </HowToButtonStyle>
    </HowToStyle>
  )
}

const HowToStyle = styled.div`
    font-size: 1.4rem;
    line-height: 130%;

    & h3 {
        font-size: 1.8rem;
        font-weight: 600;
        line-height: 120%;
        margin: 0 0 7px;
        padding: 13px 0 0;
    }

    & p {
        margin: 0 0 5px;
    }

    & ul {
        padding: 0 0 1px;
    }

    & li {
        margin: 0 0 10px;
        display: flex;
        align-items: flex-start;
        gap: 0 5px;
    }

    & svg {
        font-size: 2rem;
        height: 1em;
    }
`;

const HowToButtonStyle = styled.div`
    margin: 0 auto;
    padding: 20px 0 0;
    max-width: 200px;
`;

export default HowToPlay
