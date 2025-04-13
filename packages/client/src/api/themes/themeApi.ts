import { axiosRequestLocal } from '../lib/axiosConfig'
import { ENDPOINTS } from '../lib/endpoints'
import axios, { AxiosError } from 'axios'

export const DEFAULT_THEME = "light";
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export const UNKNOWN_THEME = "unknown";

export class ThemeService {
  static async getUserTheme(userId: number): Promise<string> {
    try {
      const response = await axiosRequestLocal.get(`${ENDPOINTS.THEME}/${userId}`);
      return response.data.theme?.theme || DEFAULT_THEME;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 404) {
          return UNKNOWN_THEME;
        }
      }
      //console.error("Error fetching theme:", error);
      return DEFAULT_THEME;
    }
  }

  static async updateUserTheme(userId: number, newTheme: string): Promise<any> {
    try {
      const response = await axiosRequestLocal.post(`${ENDPOINTS.THEME}/${userId}`, {
        theme: newTheme
      });
      console.log("Theme updated:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating theme:", error);
      throw error;
    }
  }
}

export const fetchUserTheme = async (userId: number): Promise<string> => {
  return ThemeService.getUserTheme(userId);
};

export const saveUserTheme = async (userId: number, theme: string): Promise<any> => {
  return ThemeService.updateUserTheme(userId, theme);
};
