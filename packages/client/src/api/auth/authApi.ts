import { axiosRequest } from '../lib/axiosConfig'
import { ENDPOINTS } from '../lib/endpoints'

type TLoginArgs = {
  login: string
  password: string
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
