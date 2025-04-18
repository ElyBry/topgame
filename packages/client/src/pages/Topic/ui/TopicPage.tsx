import styles from './TopicPage.module.css'
import { useEffect, SyntheticEvent, useState } from 'react'
import TextareaField from '../../../components/TextareaField/TextareaField'
import PageWrapper from '../../../components/PageWrapper/PageWrapper'
import CommentListItem from '../../../components/CommentListItem/CommentListItem'
import { useParams } from 'react-router-dom'
import Button from '../../../components/Button/Button'
import { formatDate, getTime } from '../../../utils/lib/formatDate'
import { useSelector } from 'react-redux'
import { selectUser, useAppDispatch } from '../../../store/hooks'
import {
  addCommentToTopic,
  fetchTopic,
  selectTopicsSlice,
} from '../../../store/slice/topicsSlice'
import {
	createNewReaction,
  fetchReactions,
  selectReactionsSlice,
} from '../../../store/slice/reactionsSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons'

export const TopicPage = () => {
  useEffect(() => {
    const currentTitle = document.title

    if (!currentTitle.includes('Страница с темой форума')) {
      document.title = `Страница с темой форума - ${currentTitle}`
    }

    return () => {
      document.title = currentTitle
    }
  }, [])

  const dispatch = useAppDispatch()

  const { id } = useParams()
  const userState = useSelector(selectUser)
  const { topicObject } = useSelector(selectTopicsSlice)

  const [commentText, setCommentText] = useState<string>('')

  useEffect(() => {
    dispatch(fetchTopic(Number(id)))
  }, [dispatch])

  const comments =
    topicObject.data && topicObject.data.commentsTopic
      ? topicObject.data.commentsTopic.map(comment => (
          <li key={comment.id} role="presentation">
            <CommentListItem {...comment} />
          </li>
        ))
      : []

  const topic = topicObject.data && topicObject.data.topic

  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value)
  }

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()

    const data = {
      author: userState.user?.login || 'Неизвестный автор',
      text: commentText,
    }

    await dispatch(addCommentToTopic({ id: Number(id), data }))
    await dispatch(fetchTopic(Number(id)))
    setCommentText('')
  }

  const { reactions } = useSelector(selectReactionsSlice)

  useEffect(() => {
    if (id) {
      dispatch(fetchReactions(Number(id)))
    }
  }, [dispatch])

  const likes = reactions.data.filter(item => item.type === 'like')
  const dislikes = reactions.data.filter(item => item.type === 'dislike')

  const isCurrentUserLikes = () =>
    likes.some(like => like.userId === userState.user?.id)
  const isCurrentUserDisLikes = () =>
    dislikes.some(like => like.userId === userState.user?.id)

	const handleAddLike = async () => {
		const userId = userState.user?.id;
		if (!userId) return;

		const payload = {
			topicId: Number(id),
			data: {
				userId,
				topicId: Number(id),
				type: 'like'
			}
		}
		await dispatch(createNewReaction(payload))
		 if (id) {
      await dispatch(fetchReactions(Number(id)))
    }
	}

	const handleAddDisLike = async () => {
		const userId = userState.user?.id;
		if (!userId) return;

		const payload = {
			topicId: Number(id),
			data: {
				userId,
				topicId: Number(id),
				type: 'dislike'
			}
		}
		await dispatch(createNewReaction(payload))
		 if (id) {
      await dispatch(fetchReactions(Number(id)))
    }
	}

  return (
    <PageWrapper layout="alternative" showNav={true} lightColor={true}>
      <h1
        className={
          styles.topic_view_title
        }>{`Страница с темой форума № ${id}`}</h1>
      <div className={styles.topic_view_block}>
        <div className={styles.topic_view_block_top}>
          <h3 className={styles.topic_view_block_title}>{topic?.name}</h3>
          <p className={styles.topic_view_block_date}>
            Создан: {topic?.createdAt ? formatDate(topic.createdAt) : ''}{' '}
            {topic?.createdAt ? getTime(topic.createdAt) : ''}
          </p>
        </div>
        <div className={styles.topic_view_block_content}>
          <div className={styles.topic_view_block_content_inner}>
            <p className={styles.topic_view_block_text}>{topic?.text}</p>
          </div>
          <div className={styles.topic_view_block_reactions}>
            <div
              className={[
                styles.topic_view_block_reactions_item,
                isCurrentUserLikes()
                  ? styles.topic_view_block_reactions_item_active
                  : '',
              ].join(' ')}>
              <FontAwesomeIcon icon={faThumbsUp} onClick={handleAddLike}/>

              {likes.length > 0 && (
                <span className={styles.topic_view_block_reactions_item_count}>
                  {likes.length}
                </span>
              )}
            </div>
            <div
              className={[
                styles.topic_view_block_reactions_item,
                isCurrentUserDisLikes()
                  ? styles.topic_view_block_reactions_item_active
                  : '',
              ].join(' ')}>
              <FontAwesomeIcon icon={faThumbsDown} onClick={handleAddDisLike}/>

              {dislikes.length > 0 && (
                <span className={styles.topic_view_block_reactions_item_count}>
                  {dislikes.length}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className={styles.topic_view_block_comments}>
          <div className={styles.topic_view_block_comments_count}>
            Всего ответов: {comments.length}
          </div>
          <ul className={styles.topic_view_block_comments_list}>{comments}</ul>
        </div>
      </div>
      <form
        action=""
        className={[
          styles.topic_view_block,
          styles.topic_view_block_reply,
        ].join(' ')}
        onSubmit={handleSubmit}>
        <div className={styles.topic_view_block_content}>
          <p className={styles.topic_view_block_reply_label}>Ваш ответ</p>
          <TextareaField
            name="text"
            placeholder="Добавьте комментарий"
            error={false}
            modelValue={commentText}
            onChange={handleChangeComment}
          />
          <Button
            label="Отправить"
            className={styles.topic_view_block_button}
            type="submit"
          />
        </div>
      </form>
    </PageWrapper>
  )
}
