import { axiosRequest } from '../lib/axiosConfig'
import { ENDPOINTS } from '../lib/endpoints'

export const updatePassword = async (oldPassword: string, newPassword: string) => {
  const requestData = {
    oldPassword,
    newPassword,
  };

  const result = await axiosRequest.put(ENDPOINTS.USER_PASSWORD, requestData);

  if (result.status !== 200) {
    throw new Error(result.statusText);
  }

  return result.data;
};
