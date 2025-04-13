import styles from './Team.module.css';

interface TeamProps {
  pic?: string;
  h4: string;
  copy: string;
}

const Team: React.FC<TeamProps> = ({ pic, h4, copy }) => {
  const initials = h4
    .split(' ')
    .map(word => word[0]?.toUpperCase())
    .join('')
    .slice(0, 2);

  return (
    <div className={styles.team}>
      <div className={styles.pic}>
        {pic ? (
          <img className={styles.img} src={`/devs/${pic}`} alt={h4} />
        ) : (
          <div className={styles.initials}>{initials}</div>
        )}
      </div>
      <div className={styles.holder}>
        <h4 className={styles.h4}>{h4}</h4>
        <p>{copy}</p>
      </div>
    </div>
  );
};

export default Team;
