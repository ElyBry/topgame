import { formatDate, getTime } from '../../utils/lib/formatDate'
import styles from './TopicListItem.module.css'

interface TopicListItemProps {
  name: string
  text: string
  author: string
  createdAt: string
}

const TopicListItem: React.FC<TopicListItemProps> = ({
  name,
  text,
  author,
  createdAt,
}) => {
  return (
    <div className={styles.topic_block}>
      <div className={styles.topic_block_content}>
        <p className={styles.topic_block_author}>{author}</p>
        <p className={styles.topic_block_label}>{name}</p>
        <p className={styles.topic_block_text}>{text}</p>
        <div className={styles.topic_block_bottom}>
          <span className={styles.topic_block_date}>
            {formatDate(createdAt)} {getTime(createdAt)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TopicListItem
