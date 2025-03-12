import { axiosRequest } from '../lib/axiosConfig'
import { ENDPOINTS } from '../lib/endpoints'

type TOAuthArgs = {
  code: string
  redirect_uri: string
}

export const oauth = async ({ code, redirect_uri }: TOAuthArgs) => {
  try {
    const response = await axiosRequest.post(ENDPOINTS.OAUTH_SIGN_IN, {
      code,
      redirect_uri,
    });
    
    return response.data;
  } catch (error) {
    console.error("Ошибка авторизации через Яндекс:", error);
    throw error;
  }
};
