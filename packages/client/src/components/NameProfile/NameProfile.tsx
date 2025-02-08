import styles from "./NameProfile.module.css";

type NameProfileProps = {
  name: string;
};

const NameProfile: React.FC<NameProfileProps> = ({ name }) => {
  return (
    <h2 className={styles.name}>
      {name}
    </h2>
  );
};

export default NameProfile;
