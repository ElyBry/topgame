import styles from "./PageWrapperNotBg.module.css";

interface PageWrapperNotBgProps {
  children: React.ReactNode;
}

const PageWrapperNotBg: React.FC<PageWrapperNotBgProps> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  );
};

export default PageWrapperNotBg;
