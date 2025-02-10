import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import Navigation from "../Navigation/Navigation";

interface HeaderProps {
  showNav?: boolean;
  lightColor?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showNav, lightColor }) => {
  return (
    <header className={styles.header}>
      <Link to="/">
        <span className={styles.logo}>
          Chessify
        </span>
      </Link>
      <h1 className={`${styles.game_name} ${lightColor ? styles.game_name_light : ""}`}>Chessify</h1>
      {showNav && <Navigation />}
    </header>
  );
};

export default Header;