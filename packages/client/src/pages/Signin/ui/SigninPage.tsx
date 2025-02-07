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
import { validateField } from "../../../utils/validate";

type TFormState = {
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

	const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});

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

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

		if (!handleValidation()) return;

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
      const formFields = {...fields};
      const formErrors = {};
      let formIsValid = true;

			const errorLogin = validateField("login", formFields["login"])
			const errorPassword = validateField("password", formFields["password"])

      if(errorLogin){
        formIsValid = false;
        formErrors["login"] = errorLogin;
      }

      if(errorPassword){
        formIsValid = false;
        formErrors["password"] = errorPassword;
      }


      // setErrors(formErrors)
			setFields({
        login: formErrors.login,
        password: formErrors.password,
      })

      return formIsValid;
    }

    const handleChange = (field, value) => {
      setFields({
        ...fields,
        [field]: value
      })
    }

  return (
    <PageWrapper title="Вход">
      <form onSubmit={handleSubmit}>
        <InputField
          onChange={handleFormChange}
          type="text"
          name="login"
          placeholder="Логин"
          error={false}
          message={errors["login"]}
					onChange={e => handleChange('login', e.target.value)}
        />
        <InputField
          onChange={handleFormChange}
          type="password"
          name="password"
          placeholder="Пароль"
          error={false}
          message={errors["password"]}
					onChange={e => handleChange('password', e.target.value)}
        />
        <div className={styles.button_fieldset}>
          <Button
            label="Войти"
            type="submit"
            disabled={!formState.login.length || !formState.password.length}
          />
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
