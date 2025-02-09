import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <Link to="/" className={styles.header}>
      <span className={styles.logo}>
        Chessify
      </span>
      <h1 className={styles.game_name}>Chessify</h1>
    </Link>
  );
};

export default Header;
