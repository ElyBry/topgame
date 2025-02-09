import styles from "./WrapperBgColor.module.css";

interface WrapperBgColorProps {
  children: React.ReactNode;
  title: string;
}

const WrapperBgColor: React.FC<WrapperBgColorProps> = ({ children, title }) => {
  return (
    <div className={styles.wrapper_color}>
      <h1 className={styles.wrapper_title}>{title}</h1>
      {children}
    </div>
  );
};

export default WrapperBgColor
