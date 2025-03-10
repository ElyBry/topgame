import styles from './HowToPlay.module.css';
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChessPawn, faChessKing, faChessQueen, faChessRook, faChessKnight, faChessBishop } from "@fortawesome/free-regular-svg-icons";

const HowToPlay = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(ROUTES.START_GAME)
  };

  return (
    <div className={styles.how_to}>
      <p>Каждый игрок управляет 16 фигурами. Цель — поставить мат королю противника, то есть загнать его в безвыходное положение.</p>
      <h3>Фигуры:</h3>
      <ul>
        <li><FontAwesomeIcon icon={faChessKing} /> Король: ходит на одну клетку в любом направлении.</li>
        <li><FontAwesomeIcon icon={faChessQueen} /> Ферзь: двигается на любое количество клеток по&nbsp;вертикали, горизонтали и&nbsp;диагонали.</li>
        <li><FontAwesomeIcon icon={faChessRook} /> Ладья: по горизонтали и вертикали.</li>
        <li><FontAwesomeIcon icon={faChessBishop} /> Слон: по диагонали.</li>
        <li><FontAwesomeIcon icon={faChessKnight} /> Конь: ходит буквой &quot;.</li>
        <li><FontAwesomeIcon icon={faChessPawn} /> Пешка: двигается вперед на одну клетку, <br />при первом ходе — на две.</li>
      </ul>
      <h3>Геймплей:</h3>
      <p>Игроки по очереди делают ходы, начиная с белых. Когда король под угрозой — шах. Если его нельзя спасти — мат.</p>
      <p>Готовы проверить свои силы? Тогда вперед!</p>
      <div className={styles.how_to_button}>
        <Button label="Начать игру" type="button" onClick={handleNavigate} />
      </div>
    </div>
  )
}

export default HowToPlay
