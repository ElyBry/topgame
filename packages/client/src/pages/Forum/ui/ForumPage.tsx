import styles from './ForumPage.module.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TopicListItem from '../../../components/TopicListItem/TopicListItem'
import Button from '../../../components/Button/Button'
import PageWrapper from '../../../components/PageWrapper/PageWrapper'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../../store/hooks'
import {
  selectTopicsSlice,
  fetchTopicsList,
} from '../../../store/slice/topicsSlice'

export const ForumPage = () => {
  useEffect(() => {
    const currentTitle = document.title

    if (!currentTitle.includes('Форум')) {
      document.title = `Форум - ${currentTitle}`
    }

    return () => {
      document.title = currentTitle
    }
  }, [])

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleNavigateNew = () => {
    navigate('/forum/new')
  }

  const handleNavigateView = (id: number) => {
    navigate(`/forum/${id}`)
  }

  const { topicsList } = useSelector(selectTopicsSlice)

  useEffect(() => {
    dispatch(fetchTopicsList())
  }, [dispatch])

  const topicItems = topicsList.data.length
    ? topicsList.data.map(topic => (
        <li
          key={topic.id}
          onClick={() => handleNavigateView(topic.id)}
          role="presentation">
          <TopicListItem {...topic} />
        </li>
      ))
    : []

  return (
    <PageWrapper layout="alternative" showNav={true} lightColor={true}>
      <div className={styles.forum_top}>
        <h1 className={styles.forum_title}>Форум</h1>
        <Button
          label="Создать топик"
          type="button"
          className={styles.forum_button}
          onClick={handleNavigateNew}
        />
      </div>
      {topicItems.length ? (
        <ul className={styles.forum_list}>{topicItems}</ul>
      ) : (
        <p className={styles.forum_empty}>Топики не найдены</p>
      )}
    </PageWrapper>
  )
}
