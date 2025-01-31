import styles from './PageWrapper.module.css';

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <>
      <div className={styles.bg}></div>

      <main className={styles.main}>
        <div className={styles.wrap}>
          <div className={styles.form}>
            {children}
          </div>
        </div>
      </main>
    </>
  );
};

export default PageWrapper;
