import styles from "./LoaderFull.module.css";
import { Loader } from '../Loader'

const LoaderFull = () => {
  return (
    <div className={styles.loader_wrapper}>
      <Loader />
    </div>
  )
};

export default LoaderFull;
