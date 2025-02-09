import styles from "./SubTitle.module.css";

interface SubTitleProps {
  text: string;
}

const SubTitle: React.FC<SubTitleProps> = ({ text }) => {
  return (
    <h2 className={styles.subtitle}>{text}</h2>
  );
};

export default SubTitle;
