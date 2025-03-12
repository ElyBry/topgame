import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/Button/Button'
import styles from '../../../components/Button/Button.module.css'
import styles2 from './SigninPage.module.css'
import PageWrapper from '../../../components/PageWrapper/PageWrapper'
import InputField from '../../../components/InputField/InputField'
import { login } from '../../../api/auth/authApi'
import { getUserInfo } from '../../../api/auth/userInfoApi'
import { ROUTES } from '../../../utils/routes'
import { validateField } from '../../../utils/validate'
import { useAppDispatch } from '../../../store/hooks'
import { setUser } from '../../../store/slice/userSlice'
import LoaderFull from '../../../components/LoaderFull/LoaderFull'
import { getServiceId } from '../../../api/auth/oAuthServiceIdApi'
import { oauth } from '../../../api/auth/oauthApi'
import { OAUTH_REDIRECT_URI } from '../../../utils/constants'

type TFormState = {
  login: string
  password: string
}

type TFormErrors = {
  login: string
  password: string
}

export const SigninPage = () => {
  const [formState, setFormState] = useState<TFormState>({
    login: '',
    password: '',
  })
  const [formErrors, setFormErrors] = useState<TFormErrors>({
    login: '',
    password: '',
  })
  const [clientId, setClientId] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [initializing, setInitializing] = useState<boolean>(true)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const currentTitle = document.title

    if (!currentTitle.includes('Авторизация')) {
      document.title = `Авторизация - ${currentTitle}`
    }

    const fetchClientId = async () => {
      if (!initializing && !loading) {
        try {
          const id = await getServiceId()
          setClientId(id)
        } catch (error) {
          console.error('Ошибка при получении client_id', error)
        }
      }
    }

    fetchClientId()
  }, [initializing, loading])

  // OAuth
  const handleYandexAuth = () => {
    if (!clientId) {
      console.error('client_id не найден')
      return
    }

    setLoading(true)
    const redirectUri = OAUTH_REDIRECT_URI

    const authUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`
    window.location.href = authUrl
  }

  useEffect(() => {
    const handleOAuthCode = async () => {
      const queryParams = new URLSearchParams(window.location.search)
      const code = queryParams.get('code')
      
      if (code) {
        setLoading(true)
        try {
          const redirectUri = OAUTH_REDIRECT_URI
          const response = await oauth({ code, redirect_uri: redirectUri })
          
          localStorage.setItem('authData', JSON.stringify(response.data))
          
          const userInfoResult = await getUserInfo()
          if (userInfoResult.id) {
            dispatch(setUser(userInfoResult))
            
            window.history.replaceState({}, '', window.location.pathname)
            navigate(ROUTES.MAIN)
          }
        } catch (error) {
          console.error('Ошибка при OAuth авторизации:', error)
        } finally {
          setLoading(false)
        }
      }
      
      setInitializing(false)
    }
    
    handleOAuthCode()
  }, [dispatch, navigate])
  

  const isButtonDisabled = () =>
    Object.values(formErrors).some(value => !!value) ||
    !Object.values(formState).every(value => !!value)

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
      setLoading(true)
      try {
        const result = await login(formState)

        if (result) {
          const userInfoResult = await getUserInfo()

          if (userInfoResult.id) {
            dispatch(setUser(userInfoResult))
            navigate(ROUTES.MAIN)
          }
        }
      } catch (error) {
        console.error('Ошибка авторизации:', error)
      } finally {
        setLoading(false)
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

  if (initializing || loading) {
    return (
      <PageWrapper title="Вход" showNav={false} lightColor={true}>
        <LoaderFull />
      </PageWrapper>
    )
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
          <div className={styles2.oauth_hr}>или</div>
          <Button
            label="Войти через Яндекс"
            type="button"
            className={styles.button_oauth}
            onClick={handleYandexAuth}
            disabled={loading || !clientId}
          />
        </div>
      </form>
    </PageWrapper>
  )
}
