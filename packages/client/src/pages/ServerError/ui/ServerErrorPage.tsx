import stylesButton from '../../../components/Button/Button.module.css'
import Button from '../../../components/Button/Button'
import styles from './ServerErrorPage.module.css'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../utils/routes'

export const ServerErrorPage = () => {
  const navigate = useNavigate()

		const handleNavigateToMain = () => {
			navigate(ROUTES.MAIN)
		}

  return (
    <main className={styles.server_error}>
      <h1 className={styles.server_error_number}>500</h1>
      <p className={styles.server_error_text}>Мы уже фиксим</p>
			<Button
            label="На главную страницу"
            className={stylesButton.button_link}
            type="button"
            onClick={handleNavigateToMain}
          />
    </main>
  )
}
