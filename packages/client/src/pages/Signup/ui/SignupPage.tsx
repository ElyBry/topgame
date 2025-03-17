import { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import Button from '../../../components/Button/Button'
import PageWrapper from '../../../components/PageWrapper/PageWrapper'
import InputField from '../../../components/InputField/InputField'
import { validateField } from '../../../utils/validate'
import { checkPasswordRepeat } from '../../../utils/rules'
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

type TFormState = {
  login: string
  password: string
  first_name: string
  second_name: string
  phone: string
  email: string
  password_repeat: string
}

type TFormErrors = {
  login: string
  password: string
  first_name: string
  second_name: string
  phone: string
  email: string
  password_repeat: string
}

export const SignupPage = () => {
  const [formState, setFormState] = useState<TFormState>({
    login: '',
    password: '',
    first_name: '',
    second_name: '',
    phone: '',
    email: '',
    password_repeat: '',
  })
  const [formErrors, setFormErrors] = useState<TFormErrors>({
    login: '',
    password: '',
    first_name: '',
    second_name: '',
    phone: '',
    email: '',
    password_repeat: '',
  })
  const isButtonDisabled = () =>
    Object.values(formErrors).some(value => !!value) ||
    !Object.values(formState).every(value => !!value)

  useEffect(() => {
    const currentTitle = document.title

    if (!currentTitle.includes('Регистрация')) {
      document.title = `Регистрация - ${currentTitle}`
    }
  }, [])

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/sign-in')
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
  }

  const handleValidation = () => {
    const formFields = { ...formState }
    let formIsValid = true

    const errorFirstName = validateField('first_name', formFields['first_name'])
    const errorSecondName = validateField(
      'second_name',
      formFields['second_name']
    )
    const errorPhone = validateField('phone', formFields['phone'])
    const errorEmail = validateField('email', formFields['email'])
    const errorLogin = validateField('login', formFields['login'])
    const errorPassword = validateField('password', formFields['password'])
    const errorPasswordRepeat = checkPasswordRepeat(
      formFields['password'],
      formFields['password_repeat']
    )

    if (
      errorLogin ||
      errorPassword ||
      errorFirstName ||
      errorSecondName ||
      errorPhone ||
      errorEmail ||
      errorPasswordRepeat
    ) {
      formIsValid = false
    }

    setFormErrors(prev => ({
      ...prev,
      login: errorLogin,
      password: errorPassword,
      first_name: errorFirstName,
      second_name: errorSecondName,
      phone: errorPhone,
      email: errorEmail,
      password_repeat: errorPasswordRepeat,
    }))

    return formIsValid
  }

  return (
    <PageWrapper title="Регистрация" showNav={false} lightColor={true}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Авторизация - Chessify</title>
      </Helmet>

      <form onSubmit={handleSubmit}>
        <InputField
          onChange={handleFormChange}
          onBlur={handleValidateField}
          type="text"
          name="first_name"
          placeholder="Имя"
          error={!!formErrors['first_name']}
          message={formErrors['first_name']}
        />

        <InputField
          onChange={handleFormChange}
          onBlur={handleValidateField}
          type="text"
          name="second_name"
          placeholder="Фамилия"
          error={!!formErrors['second_name']}
          message={formErrors['second_name']}
        />

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
          type="text"
          name="email"
          placeholder="Почта"
          error={!!formErrors['email']}
          message={formErrors['email']}
        />

        <InputField
          onChange={handleFormChange}
          onBlur={handleValidateField}
          type="tel"
          name="phone"
          placeholder="Телефон"
          error={!!formErrors['phone']}
          message={formErrors['phone']}
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

        <InputField
          onChange={handleFormChange}
          onBlur={handleValidateField}
          type="password"
          name="password_repeat"
          placeholder="Пароль (ещё раз)"
          error={!!formErrors['password_repeat']}
          message={formErrors['password_repeat']}
        />

        <FieldsetStyle>
          <Button
            label="Зарегистрироваться"
            type="submit"
            disabled={isButtonDisabled()}
          />

          <Button
            label="Войти"
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
