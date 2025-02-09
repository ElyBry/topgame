import styles from "./PageMainWrapper.module.css";
import Header from "../Header/Header";

interface PageMainWrapperProps {
  children: React.ReactNode;
  showNav: boolean;
}

const PageMainWrapper: React.FC<PageMainWrapperProps> = ({ children, showNav }) => {
  return (
    <>
    <main className={`${styles.main}`}>
      <Header showNav={showNav} />
      <div className={styles.wrap}>
        {children}
        <div className={styles.footer}>
          <div className={styles.footer_fixed}>
            © 2025 Ваша команда. Все права защищены.
          </div>
        </div>
      </div>
    </main>
    </>
  )
}

export default PageMainWrapper
