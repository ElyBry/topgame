import stylesButton from '../../../components/Button/Button.module.css'
import Button from '../../../components/Button/Button'
import styles from './NotFoundPage.module.css'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../utils/routes'

export const NotFoundPage = () => {
  const navigate = useNavigate()

  const handleNavigateToMain = () => {
    navigate(ROUTES.MAIN)
  }

  return (
    <main className={styles.not_found}>
      <h1 className={styles.not_found_number}>400</h1>
      <p className={styles.not_found_text}>Не туда попали</p>
      <Button
        label="На главную страницу"
        className={stylesButton.button_link}
        type="button"
        onClick={handleNavigateToMain}
      />
    </main>
  )
}
