import styles from "./PageWrapperNotBg.module.css";

const PageWrapperNotBg: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  );
};

export default PageWrapperNotBg;
