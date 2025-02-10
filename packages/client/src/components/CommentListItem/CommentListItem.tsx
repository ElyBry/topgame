import styles from "./CommentListItem.module.css";

interface CommentListItemProps {
  author: string;
  avatar?: string | null;
  text: string;
  date: string;
}

const CommentListItem: React.FC<CommentListItemProps> = ({ author, avatar, text, date }) => {
  return (
    <div className={styles.comment_block}>
      <div className={styles.comment_block_avatar}>
        {avatar && <img src={avatar} alt="avatar-image" />}
      </div>
      <div className={styles.comment_block_content}>
      <div className={styles.comment_block_content_top}>
        <p className={styles.comment_block_author}>{author}</p>
        <p className={styles.comment_block_date}>{date}</p>
      </div>
      <p className={styles.comment_block_text}>{text}</p>
      </div>
    </div>
  );
};

export default CommentListItem;
