import styles from './Team.module.css';

interface TeamProps {
  pic: string;
  h4: string;
  copy: string;
}

const Team: React.FC<TeamProps> = ({ pic, h4, copy }) => {
  return (
    <div className={styles.team}>
      <div className={styles.pic}>{pic}</div>
      <div className={styles.holder}>
        <h4 className={styles.h4}>{h4}</h4>
        <p>{copy}</p>
      </div>
    </div>
  )
}

export default Team
