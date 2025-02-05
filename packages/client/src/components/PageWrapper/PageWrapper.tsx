import styles from "./PageWrapper.module.css";
import Header from "../Header/Header";

interface PageWrapperProps {
  children: React.ReactNode;
  title: string;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, title }) => {
  return (
    <>
      <div className={styles.bg}></div>

      <main className={styles.main}>
        <Header/>
        <div className={styles.wrap}>
          <div className={styles.form}>
            <h2 className={styles.title}>{title}</h2>
            <form>
              {children}
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default PageWrapper;
