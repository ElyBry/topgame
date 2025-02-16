import styles from "./LandingTitle.module.css";

type LandingTitleProps = {
  title: string;
};

const LandingTitle: React.FC<LandingTitleProps> = ({ title }) => {
  return (
    <h2 className={styles.landing_title}>
      {title}
    </h2>
  );
};

export default LandingTitle;
