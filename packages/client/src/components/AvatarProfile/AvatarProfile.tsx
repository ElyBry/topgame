import styles from "./AvatarProfile.module.css";

type AvatarProfileProps = {
  avatar?: string;
  change: string;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
};

const AvatarProfile: React.FC<AvatarProfileProps> = ({ avatar, change, onClick }) => {
  return (
    <div className={styles.avatar_wrap}>
      <div className={styles.avatar}>
        {avatar && (
          <div className={styles.avatar_img_wrap}>
            <img className={styles.avatar_img} src={avatar} alt="Avatar" />
          </div>
        )}
      </div>
      <span
        className={styles.avatar_change}
        onClick={onClick}
      >
        {change}
      </span>
    </div>
  );
};

export default AvatarProfile;
