import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import styles from "../../../components/Button/Button.module.css";
import PageWrapper from "../../../components/PageWrapper/PageWrapper";
import InputField from "../../../components/InputField/InputField";
import { useState } from 'react';
import { validateField } from "../../../utils/validate";

  export const SigninPage = () => {

    useEffect(() => {
      const currentTitle = document.title;

      if (!currentTitle.includes("Авторизация")) {
        document.title = `Авторизация - ${currentTitle}`;
      }
    }, []);

    const navigate = useNavigate();

    const handleNavigate = () => {
      navigate('/sign-up');
    };

		const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});

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

    const handleSubmit = () => {
			console.log(1, errors)
      if(handleValidation()){
        alert("Form submitted");
      }else{
        alert("Form has errors.")
      }
    }

    return (
      <PageWrapper title="Вход" onSubmit={handleSubmit}>
        <InputField
          type="text"
          name="login"
          placeholder="Логин"
          error={false}
          message={errors["login"]}
					onChange={e => handleChange('login', e.target.value)}
        />

        <InputField
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
						disabled={!fields.login || !fields.password}
          />

          <Button
            label="Нет аккаунта?"
            className={styles.button_link}
            type="button"
            onClick={handleNavigate}
          />
        </div>
      </PageWrapper>
    )
  }
