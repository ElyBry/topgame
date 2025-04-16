import { useEffect, useState } from "react";
import { getUserInfo } from "../../../api/auth/userInfoApi";
import { updateAvatar } from "../../../api/profile/profileAvatarApi";
import { updatePassword } from "../../../api/profile/updatePasswordApi";
import Button from "../../../components/Button/Button";
import styles from "../../../components/Button/Button.module.css";
import stylesPage from "./ProfilePage.module.css";
import PageWrapper from "../../../components/PageWrapper/PageWrapper";
import InputField from "../../../components/InputField/InputField";
import AvatarProfile from "../../../components/AvatarProfile/AvatarProfile";
import NameProfile from "../../../components/NameProfile/NameProfile";
import CurrentDataProfile from "../../../components/CurrentDataProfile/CurrentDataProfile";
import Modal from "../../../components/Modal/Modal";
import AttachFile from "../../../components/AttachFile/AttachFile";
import Loader from "../../../components/Loader/Loader";
import {APIError} from "../../../api/types";
import { updateUserData } from '../../../api/profile/updateUserDataApi'
import { validateFormFields } from '../../../utils/rules'

export const ProfilePage = () => {

  useEffect(() => {
    const currentTitle = document.title

    if (!currentTitle.includes('Профиль')) {
      document.title = `Профиль - ${currentTitle}`
    }

    return () => {
      document.title = currentTitle;
    };
  }, []);

  const [activeSection, setActiveSection] = useState<"current" | "edit" | "password">("current");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  const [authMethod, setAuthMethod] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [userData, setUserData] = useState({
    first_name: "",
    second_name: "",
    login: "",
    email: "",
    phone: "",
    avatar: "",
  });
  const [newUserData, setNewUserData] = useState({
    first_name: "",
    second_name: "",
    login: "",
    email: "",
    phone: "",
    avatar: "",
  });

  const avatarApiUrl = "https://ya-praktikum.tech/api/v2/resources";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userInfo = await getUserInfo();
        setUserData({
          first_name: userInfo.first_name,
          second_name: userInfo.second_name,
          login: userInfo.login,
          email: userInfo.email,
          phone: userInfo.phone,
          avatar: `${avatarApiUrl}${userInfo.avatar}`,
        });
        setNewUserData({
          first_name: userInfo.first_name,
          second_name: userInfo.second_name,
          login: userInfo.login,
          email: userInfo.email,
          phone: userInfo.phone,
          avatar: `${avatarApiUrl}${userInfo.avatar}`,
        });
        const authType = localStorage.getItem('authType');
        setAuthMethod(authType || 'local');
      } catch (error) {
        console.error("Ошибка загрузки профиля:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleProfileUpdate = async () => {
    setIsLoading(true);
    try {
      await updateUserData(
        newUserData.first_name,
        newUserData.second_name,
        newUserData.login,
        newUserData.email,
        newUserData.phone
      );
      setUserData(newUserData);
    } catch (error) {
      console.error("Ошибка обновления аватара:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleAvatarChangeClick = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewAvatar(null);
  };

  const handleAvatarChange = (file: File | null) => setNewAvatar(file);

  const handleAvatarUpdate = async () => {
    if (!newAvatar) return;

    setIsLoading(true);
    try {
      await updateAvatar(newAvatar);
      const updatedUserInfo = await getUserInfo();
      setUserData((prev) => ({
        ...prev,
        avatar: `${avatarApiUrl}${updatedUserInfo.avatar}?t=${Date.now()}`,
      }));
      setIsModalOpen(false);
    } catch (error) {
      console.error("Ошибка обновления аватара:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const cancelChange = () => {
    setNewUserData(userData);
  }

  const handlePasswordChange = async () => {
    setIsPasswordLoading(true);
    setPasswordError({ oldPassword: "", newPassword: "", confirmPassword: "" });

    try {
      await updatePassword(passwords.oldPassword, passwords.newPassword);
      setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
      setActiveSection("current");
    } catch (error: unknown) {
      console.error("Ошибка смены пароля:", error);

      if ((error as APIError).response?.data?.reason) {
        setPasswordError((prev) => ({
          ...prev,
          oldPassword: (error as APIError).response.data.reason,
        }));
      } else {
        setPasswordError((prev) => ({
          ...prev,
          oldPassword: "Ошибка сервера. Попробуйте снова.",
        }));
      }
    } finally {
      setIsPasswordLoading(false);
    }
  };

  return (
    <>
      <PageWrapper layout="alternative" showNav={true} lightColor={true}>
        <div className={stylesPage.profile_fixed}>
          <AvatarProfile avatar={userData.avatar} change="Поменять аватар" onClick={handleAvatarChangeClick} />
          <NameProfile name={userData.login} />

          {activeSection === "current" && (
            <>
              <CurrentDataProfile label="Имя" data={userData.first_name} />
              <CurrentDataProfile label="Фамилия" data={userData.second_name} />
              <CurrentDataProfile label="Логин" data={userData.login} />
              <CurrentDataProfile label="Почта" data={userData.email} />
              <CurrentDataProfile label="Телефон" data={userData.phone} />

              <div className={styles.button_fieldset}>
                <Button label="Изменить данные" className={styles.button_link} type="button" onClick={() => setActiveSection("edit")} />
                <br />
                <br />
                {(authMethod === 'local') && <Button label="Изменить пароль" className={styles.button_link} type="button" onClick={() => setActiveSection("password")} />}
              </div>
            </>
          )}

          {activeSection === "edit" && (
            <>
              <InputField
                type="text"
                name="first_name"
                placeholder="Введите новое имя"
                modelValue={newUserData.first_name}
                onChange={(e) => setNewUserData({ ...newUserData, first_name: e.target.value })}
              />
              <InputField
                type="text"
                name="second_name"
                placeholder="Введите новую фамилию"
                modelValue={newUserData.second_name}
                onChange={(e) => setNewUserData({ ...newUserData, second_name: e.target.value })}
              />
              <InputField
                type="text"
                name="login"
                placeholder="Введите новый логин"
                modelValue={newUserData.login}
                onChange={(e) => setNewUserData({ ...newUserData, login: e.target.value })}
              />
              <InputField
                type="text"
                name="email"
                placeholder="Введите новую почту"
                modelValue={newUserData.email}
                onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
              />
              <InputField
                type="tel"
                name="phone"
                placeholder="Введите новый телефон"
                modelValue={newUserData.phone}
                onChange={(e) => setNewUserData({ ...newUserData, phone: e.target.value })}
              />
              <div className={styles.button_fieldset}>
                {
                  isLoading ? <Loader /> : (
                    <>
                      <Button label="Сохранить изменения" type="submit" onClick={() => handleProfileUpdate()} />
                      <Button label="Вернуться" className={styles.button_link} type="button" onClick={() => {
                        cancelChange()
                        setActiveSection('current')
                      }} />
                    </>
                  )
                }
              </div>
            </>
          )}

          {activeSection === 'password' && (
            <>
              <InputField
                type="password"
                name="oldPassword"
                placeholder="Старый пароль"
                value={passwords.oldPassword}
                onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                error={!!passwordError.oldPassword}
                message={passwordError.oldPassword}
              />
              <InputField
                type="password"
                name="newPassword"
                placeholder="Новый пароль"
                value={passwords.newPassword}
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                error={!!passwordError.newPassword}
                message={passwordError.newPassword}
              />
              <InputField
                type="password"
                name="confirmPassword"
                placeholder="Подтвердите новый пароль"
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                error={!!passwordError.confirmPassword}
                message={passwordError.confirmPassword}
              />

              <div className={styles.button_fieldset}>
                {isPasswordLoading ? (
                  <Loader />
                ) : (
                  <>
                    <Button label="Сохранить новый пароль" type="button" onClick={handlePasswordChange} />
                    <Button label="Вернуться" className={styles.button_link} type="button" onClick={() => setActiveSection("current")} />
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </PageWrapper>

      {isModalOpen && (
        <Modal title="Загрузите файл">
          <form>
            <AttachFile onChange={handleAvatarChange} />

            <div className={styles.button_fieldset}>
              {isLoading ? <Loader /> : (
                <>
                  <Button label="Обновить" type="button" onClick={handleAvatarUpdate} />
                  <Button label="Закрыть" className={styles.button_link} type="button" onClick={handleCloseModal} />
                </>
              )}
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};
