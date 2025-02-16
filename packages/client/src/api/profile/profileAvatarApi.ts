import { axiosRequest } from '../lib/axiosConfig'
import { ENDPOINTS } from '../lib/endpoints'

export const updateAvatar = async (avatarFile: File) => {
  const formData = new FormData();
  formData.append('avatar', avatarFile);

  const result = await axiosRequest.put(ENDPOINTS.USER_AVATAR, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  if (result.status !== 200) {
    throw new Error(result.statusText);
  }

  return result.data;
};
