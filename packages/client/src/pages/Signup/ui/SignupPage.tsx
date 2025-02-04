import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import styles from "../../../components/Button/Button.module.css";
import PageWrapper from "../../../components/PageWrapper/PageWrapper";
import InputField from "../../../components/InputField/InputField";

  export const SignupPage = () => {

    useEffect(() => {
      const currentTitle = document.title;
      
      if (!currentTitle.includes("Регистрация")) {
        document.title = `Регистрация - ${currentTitle}`;
      }
    }, []);
  
    const navigate = useNavigate();

    const handleNavigate = () => {
      navigate("/sign-in");
    };

    return (
      <PageWrapper title="Регистрация">
        <InputField
          type="text"
          name="first_name"
          placeholder="Имя"
          error={false}
          message="Это поле обязательно для заполнения"
        />
        
        <InputField
          type="text"
          name="second_name"
          placeholder="Фамилия"
          error={false}
          message="Это поле обязательно для заполнения"
        />
        
        <InputField
          type="text"
          name="login"
          placeholder="Логин"
          error={false}
          message="Это поле обязательно для заполнения"
        />
        
        <InputField
          type="text"
          name="email"
          placeholder="Почта"
          error={false}
          message="Это поле обязательно для заполнения"
        />
        
        <InputField
          type="tel"
          name="phone"
          placeholder="Телефон"
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
        
        <InputField
          type="password"
          name="confirm_password"
          placeholder="Пароль (ещё раз)"
          error={false}
          message="Это поле обязательно для заполнения"
        />

        <div className={styles.button_fieldset}>
          <Button
            label="Зарегистрироваться"
            type="submit"
          />

          <Button
            label="Войти"
            className={styles.button_link}
            type="button"
            onClick={handleNavigate}
          />
        </div>
      </PageWrapper>
    )
  }
