import styles from "./PageWrapper.module.css";

interface PageWrapperProps {
  children: React.ReactNode;
  title: string;
	onSubmit: (e: Event) => void;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, title, onSubmit }) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit && onSubmit(e)
	}

  return (
    <>
      <div className={styles.bg}></div>

      <main className={styles.main}>
        <header className={styles.header}>
          <span className={styles.logo}>
            Chessify
          </span>
          <h1 className={styles.game_name}>Chessify</h1>
        </header>
        <div className={styles.wrap}>
          <div className={styles.form}>
            <h2 className={styles.title}>{title}</h2>
            <form action="submit" onSubmit= {handleSubmit}>
              {children}
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default PageWrapper;
