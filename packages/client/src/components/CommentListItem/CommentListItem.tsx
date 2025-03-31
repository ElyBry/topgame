import { formatDate, getTime } from '../../utils/lib/formatDate'
import styles from './CommentListItem.module.css'

interface CommentListItemProps {
  text: string
  author: string
  createdAt: string
}

const CommentListItem: React.FC<CommentListItemProps> = ({
  author,
  text,
  createdAt,
}) => {
  return (
    <div className={styles.comment_block}>
      <div className={styles.comment_block_content}>
        <div className={styles.comment_block_content_top}>
          <p className={styles.comment_block_author}>{author}</p>
          <p className={styles.comment_block_date}>
            {formatDate(createdAt)} {getTime(createdAt)}
          </p>
        </div>
        <p className={styles.comment_block_text}>{text}</p>
      </div>
    </div>
  )
}

export default CommentListItem
