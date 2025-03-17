import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Button from '../../../components/Button/Button'
import PageWrapper from '../../../components/PageWrapper/PageWrapper'
import InputField from '../../../components/InputField/InputField'
import { login } from '../../../api/auth/authApi'
import { getUserInfo } from '../../../api/auth/userInfoApi'
import { ROUTES } from '../../../utils/routes'
import { validateField } from '../../../utils/validate'
import { useAppDispatch } from '../../../store/hooks'
import { setUser } from '../../../store/slice/userSlice'
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

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

  const dispatch = useAppDispatch()

  const isButtonDisabled = () =>
    Object.values(formErrors).some(value => !!value) ||
    !Object.values(formState).every(value => !!value)

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
          dispatch(setUser(userInfoResult))
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
      <Helmet>
        <meta charSet="utf-8" />
        <title>Войти - Chessify</title>
      </Helmet>

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
        <FieldsetStyle>
          <Button label="Войти" type="submit" disabled={isButtonDisabled()} />
          <Button
            label="Нет аккаунта?"
            classNames={{ button_link: true }}
            type="button"
            onClick={handleNavigate}
          />
        </FieldsetStyle>
      </form>
    </PageWrapper>
  )
}

const FieldsetStyle = styled.div`
    padding: 47px 0 0;
    text-align: center;
    min-height: 112px;
`;


export const initPages = async () => {
  console.log('111');
}