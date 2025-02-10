import styles from "./Header.module.css";

interface HeaderProps {
  headerNav?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ headerNav }) => {
  return (
    <header className={styles.header}>
          <span className={styles.logo}>
            Chessify
          </span>
      <h1 className={styles.game_name}>Chessify</h1>
      {headerNav}
    </header>
)

};

export default Header;
