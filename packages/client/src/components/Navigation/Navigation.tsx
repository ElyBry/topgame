import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/slice/userSlice";
import { logout as apiLogout } from '../../api/auth/authApi'
import styles from "./Navigation.module.css";
import { ROUTES } from "../../utils/routes";
import Button from '../Button/Button'
import styles2 from '../Button/Button.module.css'

const Navigation = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === ROUTES.MAIN) {
      return location.pathname === path ? styles.active : "";
    }
    return location.pathname.startsWith(path) ? styles.active : "";
  };

  const handleLogout = async () => {
    await apiLogout()
    localStorage.removeItem('accessToken')
    dispatch(logout())
    navigate(ROUTES.SIGN_IN)
  }
  
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
          <Button
            label="Выйти"
            type="button"
            className={styles2.button_logout}
            onClick={handleLogout}
          />
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
