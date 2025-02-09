import styles from "./PageForumWrapper.module.css";

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <div className={styles.forum_page}>
      <div className={styles.forum_header}></div>
      <div className={styles.forum_content}>
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;
