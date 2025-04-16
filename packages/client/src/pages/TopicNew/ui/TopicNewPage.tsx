import styles from './TopicNewPage.module.css'
import styleButton from '../../../components/Button/Button.module.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/Button/Button'
import InputField from '../../../components/InputField/InputField'
import TextareaField from '../../../components/TextareaField/TextareaField'
import PageWrapper from '../../../components/PageWrapper/PageWrapper'
import { useSelector } from 'react-redux'
import { selectUser, useAppDispatch } from '../../../store/hooks'
import { createNewTopic } from '../../../store/slice/topicsSlice'
import { ROUTES } from '../../../utils/routes'
import { validateFormFields } from '../../../utils/rules'

export const TopicNewPage = () => {
  useEffect(() => {
    const currentTitle = document.title

    if (!currentTitle.includes('Создание топика')) {
      document.title = `Создание топика - ${currentTitle}`
    }

    return () => {
      document.title = currentTitle
    }
  }, [])

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleNavigateBack = () => {
    navigate(ROUTES.FORUM)
  }

  const userState = useSelector(selectUser)
  const [topicName, setTopicName] = useState<string>('')
  const [topicText, setTopicText] = useState<string>('')

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopicName(e.target.value)
  }

  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTopicText(e.target.value)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const data = {
      author: userState.user?.login || 'Неизвестный автор',
      text: topicText,
      name: topicName,
    }

    const validationForm = validateFormFields(data);
    if (!validationForm.isValid) {
      alert(validationForm.errorMessage)
      return;
    }

    await dispatch(createNewTopic(data))
    navigate(ROUTES.FORUM)
  }

  return (
    <PageWrapper layout="alternative" showNav={true} lightColor={true}>
      <h1 className={styles.topic_create_title}>Создание нового топика</h1>
      <form
        action="submit"
        className={styles.topic_create_form}
        onSubmit={handleSubmit}>
        <InputField
          type="text"
          name="name"
          placeholder="Заголовок"
          error={false}
          message="Это поле обязательно для заполнения"
          modelValue={topicName}
          onChange={handleChangeName}
        />
        <TextareaField
          name="text"
          placeholder="Описание"
          error={false}
          message="Это поле обязательно для заполнения"
          modelValue={topicText}
          onChange={handleChangeText}
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
  )
}
