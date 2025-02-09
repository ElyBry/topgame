import styles from "./CurrentDataProfile.module.css";

type CurrentDataProfileProps = {
  label: string;
  data: string;
};

const CurrentDataProfile: React.FC<CurrentDataProfileProps> = ({ label, data }) => {
  return (
    <div className={styles.current}>
      <span className={styles.current_label}>{label} </span>
      <span className={styles.current_data}>{data}</span>
    </div>
  );
};

export default CurrentDataProfile;
