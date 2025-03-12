import styles from "./LoaderFull.module.css";

const LoaderFull = () => {
  return (
    <div className={styles.loader_wrapper}>
      <div className={styles.loader}></div>
    </div>
  )
};

export default LoaderFull;
