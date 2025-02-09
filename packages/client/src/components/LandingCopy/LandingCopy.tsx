import styles from './LandingCopy.module.css';
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routes"

const LandingCopy = () => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(ROUTES.START_GAME)
  }

  return (
    <div className={styles.landing_copy}>
      <h2><span className={styles.landing_name}>Chessify</span> — игра для тех, кто любит стратегию!</h2>
      <p>Два игрока по очереди перемещают фигуры на доске 8×8, чтобы поставить мат королю соперника. Используй логику и тактику, чтобы выиграть!</p>
      <p>У каждого игрока 16 фигур с уникальными движениями: король, ферзь, ладьи, слоны, кони и пешки. Проиграет тот, чьего короля загоняют в угол.</p>
      <p>Готов проверить свои силы? Тогда вперед!</p>
      <div className={styles.landing_button}>
        <Button label="Начать игру" type="button" onClick={handleNavigate} />
      </div>
    </div>
  )
}

export default LandingCopy
