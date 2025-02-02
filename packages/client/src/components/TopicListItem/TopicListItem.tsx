import styles from "./TopicListItem.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-regular-svg-icons'

interface TopicListItemProps {
  author: string;
  avatar: string;
  title: string;
  text: string;
  commentsCount: number;
	date: string;
}

const TopicListItem: React.FC<TopicListItemProps> = ({ author, avatar, title, text, commentsCount, date }) => {

  return (
		<div className={styles.topic_block}>
			<div className={styles.topic_block_avatar}>
				{avatar && <img src={avatar} alt="avatar-image" />}
			</div>
			<div className={styles.topic_block_content}>
				<p className={styles.topic_block_author}>{author}</p>
				<p className={styles.topic_block_label}>{title}</p>
				<p className={styles.topic_block_text}>{text}</p>
				<div className={styles.topic_block_bottom}>
					<span className={styles.topic_block_count}>
						<FontAwesomeIcon icon={faComment} />
						{commentsCount}
					</span>
					<span className={styles.topic_block_date}>{date}</span>
				</div>
			</div>
		</div>
	);
};

export default TopicListItem;
