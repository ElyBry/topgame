import styles from "./TopicPage.module.css";
import { useEffect, SyntheticEvent } from 'react';
import TextareaField from "../../../components/TextareaField/TextareaField";
import PageWrapper from "../../../components/PageWrapper/PageWrapper";
import CommentListItem from "../../../components/CommentListItem/CommentListItem";
import { useParams } from 'react-router-dom'
import Button from "../../../components/Button/Button";
import topic from './mock.json'

export const TopicPage = () => {
  useEffect(() => {
    const currentTitle = document.title;

    if (!currentTitle.includes("Страница с темой форума")) {
      document.title = `Страница с темой форума - ${currentTitle}`;
    }
  }, []);

  const { id } = useParams()

    const comments = topic.comments.map(comment =>
      <li
        key={comment.id}
        role="presentation"
      >
        <CommentListItem {...comment} />
      </li>
    );

    const handleSubmit = (event: SyntheticEvent) => {
      event.preventDefault();

      const formData = new FormData(event.target as HTMLFormElement);
      const formProps = Object.fromEntries(formData);
      console.log(formProps);
    };

  return (
    <PageWrapper layout="alternative" showNav={true} lightColor={true}>
      <h1 className={styles.topic_view_title}>{`Страница с темой форума № ${id}`}</h1>
      <div className={styles.topic_view_block}>
        <div className={styles.topic_view_block_top}>
          <h3 className={styles.topic_view_block_title}>{topic.title}</h3>
          <p className={styles.topic_view_block_date}>Создан: {topic.date}</p>
        </div>
        <div className={styles.topic_view_block_content}>
          <p className={styles.topic_view_block_text}>{topic.text}</p>
        </div>
        <div className={styles.topic_view_block_comments}>
          <div className={styles.topic_view_block_comments_count}>
            Всего ответов: {topic.comments.length}
          </div>
          <ul className={styles.topic_view_block_comments_list}>{comments}</ul>
        </div>
      </div>
      <form action="" className={[styles.topic_view_block, styles.topic_view_block_reply].join(' ')} onSubmit={handleSubmit}>
        <div className={styles.topic_view_block_content}>
          <p className={styles.topic_view_block_reply_label}>Ваш ответ</p>
          <TextareaField
            name="new_comment"
            placeholder="Добавьте комментарий"
            error={false}
          />
          <Button
              label="Отправить"
              className={styles.topic_view_block_button}
              type="submit"
            />
        </div>
      </form>
    </PageWrapper>
  );
};