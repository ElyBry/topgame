import { TUserInfoResponse } from '../api/auth/userInfoApi'
import { ThemeService, DEFAULT_THEME, UNKNOWN_THEME } from '../api/themes/themeApi'

const STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const
  
type TUserSlice = {
  user: TUserInfoResponse | null
  status: typeof STATUS[keyof typeof STATUS]
}

export const switchTheme = (newTheme: string, userState: TUserSlice) => {
  console.log(userState);

  if (userIsLoggedIn(userState) && userState.user) {
    ThemeService.updateUserTheme(userState.user.id, newTheme)
      .catch((error: unknown) => console.error("Error updating theme:", error));
  }
  
  localStorage.setItem("theme", newTheme);
  document.body.setAttribute("data-theme", newTheme);
};
  
export const loadUserTheme = async (userState: TUserSlice) => {
  const defaultTheme = localStorage.getItem("theme") || DEFAULT_THEME;

  if (userIsLoggedIn(userState) && userState.user) {
    try {
      const userTheme = await ThemeService.getUserTheme(userState.user.id);
      
      if (userTheme === UNKNOWN_THEME) {
        switchTheme(defaultTheme, userState);
        return defaultTheme;
      }

      return userTheme;

    } catch (error: unknown) {
      console.error("Ошибка при загрузке темы пользователя:", error);
      return DEFAULT_THEME;
    }
  }

  return defaultTheme;
};
  
const userIsLoggedIn = (userState: TUserSlice): boolean => {
  return userState.user !== null;
};
