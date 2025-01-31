import { useParams } from 'react-router-dom'

export const TopicPage = () => {
  const { messageId } = useParams()

  return <div>{`Страница с темой форума № ${messageId}`}</div>
}
