import styles from './Signin.module.css';
import Button from '../../../components/Button/Button';
import PageWrapper from '../../../components/PageWrapper/PageWrapper';

  export const SigninPage = () => {
    return (
      <PageWrapper>
        <h2 className="box-form__head">Вход</h2>
        <div className={styles.container}>
          <div>Заглушка страницы Логин</div>
          <Button label="Click medd" />
        </div>
      </PageWrapper>
    )
  }

// export const SigninPage: React.FC = () => {
//   const [login, setLogin] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setLogin(e.target.value);
//   };

//   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPassword(e.target.value);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Логика отправки данных
//     console.log('Логин:', login, 'Пароль:', password);
//   };

//   return (
//     <PageWrapper>
//       <h2 className="box-form__head">Вход</h2>
//       <form className="box-form__auth-form" onSubmit={handleSubmit}>
//         <div className="box-form__fieldset">
//           <label className="box-form__input-wrapper">
//             <input
//               className="box-form__input"
//               type="text"
//               name="login"
//               value={login}
//               onChange={handleLoginChange}
//               placeholder=""
//             />
//             <span className="box-form__input-label">Логин</span>
//           </label>
//         </div>
//         <div className="box-form__fieldset">
//           <label className="box-form__input-wrapper">
//             <input
//               className="box-form__input"
//               type="password"
//               name="password"
//               value={password}
//               onChange={handlePasswordChange}
//               placeholder=""
//             />
//             <span className="box-form__input-label">Пароль</span>
//           </label>
//         </div>
//         <div className="box-form__button-fieldset">
//           <button className="box-form__button box-form__button-primary" type="submit">
//             Войти
//           </button>
//           <button
//             className="box-form__button box-form__button-link"
//             type="button"
//             onClick={() => alert('Нет аккаунта? Регистрация.')}>
//             Нет аккаунта?
//           </button>
//         </div>
//       </form>
//     </PageWrapper>
//   );
// };

//export default SigninPage;
