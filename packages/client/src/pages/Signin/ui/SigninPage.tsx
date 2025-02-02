import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import styles from "../../../components/Button/Button.module.css";
import PageWrapper from "../../../components/PageWrapper/PageWrapper";
import InputField from "../../../components/InputField/InputField";

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

    return (
      <PageWrapper title="Вход">
        <InputField
          type="text"
          name="login"
          placeholder="Логин"
          error={false}
          message="Это поле обязательно для заполнения"
        />
        
        <InputField
          type="password"
          name="password"
          placeholder="Пароль"
          error={false}
          message="Это поле обязательно для заполнения"
        />

        <div className={styles.button_fieldset}>
          <Button
            label="Войти"
            type="submit"
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
