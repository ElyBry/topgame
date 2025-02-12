import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/Button/Button'
import styles from '../../../components/Button/Button.module.css'
import PageWrapper from '../../../components/PageWrapper/PageWrapper'
import InputField from '../../../components/InputField/InputField'
import { login } from '../../../api/auth/authApi'
import { getUserInfo } from '../../../api/auth/userInfoApi'
import { ROUTES } from '../../../utils/routes'
import UserContext from '../../../context/userContext'
import { validateField } from '../../../utils/validate'

type TFormState = {
  login: string
  password: string
}

type TFormErrors = {
  login: string
  password: string
}

// const testData = {
//   login: 'TestTestov',
//   password: '!Vtest123',
// }

export const SigninPage = () => {
  const [formState, setFormState] = useState<TFormState>({
    login: '',
    password: '',
  })
  const [formErrors, setFormErrors] = useState<TFormErrors>({
    login: '',
    password: '',
  })

  const isButtonDisabled = () =>
    Object.values(formErrors).some(value => !!value) ||
    !Object.values(formState).every(value => !!value)

  const context = useContext(UserContext)

  useEffect(() => {
    const currentTitle = document.title

    if (!currentTitle.includes('Авторизация')) {
      document.title = `Авторизация - ${currentTitle}`
    }
  }, [])

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(ROUTES.SIGN_UP)
  }

  const handleFormChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target
    setFormState(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleValidateField = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target
    if (!value) return

    const error = validateField(name, value)

    setFormErrors(prev => ({
      ...prev,
      [name]: error,
    }))
  }

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    if (!handleValidation()) return

    if (formState.login.length && formState.password.length) {
      const result = await login(formState)

      if (result) {
        const userInfoResult = await getUserInfo()

        if (userInfoResult.id) {
          context?.setUserInfo(userInfoResult)
          navigate(ROUTES.MAIN)
        }
      }
    }
  }

  const handleValidation = () => {
    const formFields = { ...formState }
    let formIsValid = true

    const errorLogin = validateField('login', formFields['login'])
    const errorPassword = validateField('password', formFields['password'])

    if (errorLogin || errorPassword) {
      formIsValid = false
    }

    setFormErrors(prev => ({
      ...prev,
      login: errorLogin,
      password: errorPassword,
    }))

    return formIsValid
  }

  return (
    <PageWrapper title="Вход" showNav={false} lightColor={true}>
      <form onSubmit={handleSubmit}>
        <InputField
          onChange={handleFormChange}
          onBlur={handleValidateField}
          type="text"
          name="login"
          placeholder="Логин"
          error={!!formErrors['login']}
          message={formErrors['login']}
        />
        <InputField
          onChange={handleFormChange}
          onBlur={handleValidateField}
          type="password"
          name="password"
          placeholder="Пароль"
          error={!!formErrors['password']}
          message={formErrors['password']}
        />
        <div className={styles.button_fieldset}>
          <Button label="Войти" type="submit" disabled={isButtonDisabled()} />
          <Button
            label="Нет аккаунта?"
            className={styles.button_link}
            type="button"
            onClick={handleNavigate}
          />
        </div>
      </form>
    </PageWrapper>
  )
}
