import { Link, useLocation } from "react-router-dom";
import styles from "./Navigation.module.css";
import { ROUTES } from "../../utils/routes";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => (location.pathname === path ? styles.active : "");

  return (
    <nav className={styles.nav}>
      <ul className={styles.nav_list}>
        <li>
          <Link to={ROUTES.MAIN} className={`${styles.nav_link} ${isActive(ROUTES.MAIN)}`}>
            Главная
          </Link>
        </li>
        <li>
          <Link to={ROUTES.PROFILE} className={`${styles.nav_link} ${isActive(ROUTES.PROFILE)}`}>
            Профиль
          </Link>
        </li>
        <li>
          <Link to={ROUTES.FORUM} className={`${styles.nav_link} ${isActive(ROUTES.FORUM)}`}>
            Форум
          </Link>
        </li>
        <li>
          <Link to={ROUTES.LEADERBOARD} className={`${styles.nav_link} ${isActive(ROUTES.LEADERBOARD)}`}>
            Лидерборд
          </Link>
        </li>
        <li>
          <Link to="#" className={`${styles.nav_link} ${styles.logout}`}>
            Выйти
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
