import styles from "./ForumPage.module.css";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import TopicListItem from "../../../components/TopicListItem/TopicListItem";
import Button from "../../../components/Button/Button";
import PageWrapper from "../../../components/PageWrapper/PageWrapper";
import topics from './mock.json'

export const ForumPage = () => {
  useEffect(() => {
    const currentTitle = document.title;

    if (!currentTitle.includes("Форум")) {
      document.title = `Форум - ${currentTitle}`;
    }
  }, []);


  const navigate = useNavigate();
  const handleNavigateNew = () => {
    navigate('/forum/new');
  };

  const handleNavigateView = (id: number) => {
    navigate(`/forum/${id}`);
  };

  const topicItems = topics.map(topic =>
    <li
      key={topic.id}
      onClick={() => handleNavigateView(topic.id)}
      role="presentation"
    >
      <TopicListItem {...topic} />
    </li>
  );

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
      <ul className={styles.forum_list}>{topicItems}</ul>
    </PageWrapper>
  )
}
