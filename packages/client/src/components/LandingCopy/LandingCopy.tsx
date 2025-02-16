import styles from './LandingCopy.module.css';

const LandingCopy = () => {

  return (
    <div className={styles.landing_copy}>
      <h2>Добро пожаловать в <span className={styles.landing_name}>Chessify</span>!</h2>
      <p>Готовы проверить свои стратегические навыки? В Chessify вы сможете бросить вызов своему разуму и погрузиться в&nbsp;мир шахмат. Сразитесь с&nbsp;друзьями, применяя логику и&nbsp;стратегию, чтобы поставить мат своему противнику.</p>
      <p><b>Присоединяйтесь к игре и покажите, кто здесь настоящий мастер шахмат!</b></p>
    </div>
  )
}

export default LandingCopy
