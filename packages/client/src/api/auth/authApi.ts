import { axiosRequest } from '../lib/axiosConfig'
import { ENDPOINTS } from '../lib/endpoints'

type TLoginArgs = {
  login: string
  password: string
}

type TSignupArgs = {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export const signup = async (userData: TSignupArgs) => {
  try {
    const response = await axiosRequest.post(ENDPOINTS.SIGN_UP, userData)
    return response
  } catch (error: any) {
    throw error.response?.data || { reason: 'Unknown error' }
  }
}

export const login = async ({ login, password }: TLoginArgs) => {
  const response = await axiosRequest.post(ENDPOINTS.SIGN_IN, {
    login,
    password,
  });

  const { token } = response.data;

  if (token) {
    localStorage.setItem('accessToken', token);
  };

  return response;
};

export const logout = async () => {
  const response = await axiosRequest.post(ENDPOINTS.LOGOUT);
  return response;
};
