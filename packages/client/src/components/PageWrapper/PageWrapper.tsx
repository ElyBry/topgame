import styles from "./PageWrapper.module.css";
import Header from "../Header/Header";

interface PageWrapperProps {
  children: React.ReactNode;
  title?: string;
  layout?: "default" | "alternative";
  showNav: boolean;
  lightColor: boolean;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, title, layout = "default", showNav, lightColor }) => {
  return (
    <>
    <main className={`${styles.main} ${layout === "alternative" ? styles.alt_layout : ""}`}>
      <div className={styles.bg}></div>
      <Header showNav={showNav} lightColor={lightColor} />
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
