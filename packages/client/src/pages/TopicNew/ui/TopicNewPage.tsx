import styles from "./TopicNewPage.module.css";
import styleButton from "../../../components/Button/Button.module.css";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import InputField from "../../../components/InputField/InputField";
import TextareaField from "../../../components/TextareaField/TextareaField";
import PageWrapper from "../../../components/PageWrapper/PageWrapper";

export const TopicNewPage = () => {

  useEffect(() => {
    const currentTitle = document.title;
  
    if (!currentTitle.includes("Создание топика")) {
      document.title = `Создание топика - ${currentTitle}`
    }

    return () => {
      document.title = currentTitle;
    };
  }, [])

  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate('/forum');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const formProps = Object.fromEntries(formData);
    console.log(formProps);
  };

  return (
    <PageWrapper layout="alternative" showNav={true} lightColor={true}>
      <h1 className={styles.topic_create_title}>Создание нового топика</h1>
      <form action="submit" className={styles.topic_create_form} onSubmit={handleSubmit}>
        <InputField
          type="text"
          name="title"
          placeholder="Заголовок"
          error={false}
          message="Это поле обязательно для заполнения"
        />
        <TextareaField
          name="description"
          placeholder="Описание"
          error={false}
          message="Это поле обязательно для заполнения"
        />
        <div className={styles.topic_create_form_buttons}>
          <Button
            label="Отмена"
            type="button"
            className={styleButton.button_secondary}
            onClick={handleNavigateBack}
          />
          <Button
            label="Создать"
            className={styles.topic_create_form_button}
            type="submit"
          />
        </div>
      </form>
    </PageWrapper>
  );
};