import styles from "./PageWrapper.module.css";
import Header from "../Header/Header";

interface PageWrapperProps {
  children: React.ReactNode;
  title?: string;
  layout?: "default" | "alternative";
  headerNav?: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, title, layout = "default", headerNav }) => {
  return (
    <>
    <main className={`${styles.main} ${layout === "alternative" ? styles.alt_layout : ""}`}>
      <div className={styles.bg}></div>
      <header className={styles.header}>
        <span className={styles.logo}>
          Chessify
        </span>
        <h1 className={styles.game_name}>Chessify</h1>
        {headerNav}
      </header>
      <div className={styles.wrap}>
        <div className={styles.form}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {children}
        </div>
      </div>
    </main>
    </>
  )
}

export default PageWrapper
