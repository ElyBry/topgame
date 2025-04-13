import { axiosRequest } from '../lib/axiosConfig';
import { ENDPOINTS } from '../lib/endpoints';

type TUserProfileArgs = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
};

export const updateUserProfile = async (userData: TUserProfileArgs) => {
  try {
    const response = await axiosRequest.put(ENDPOINTS.UPDATE_DATA, userData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response;
  } catch (error: any) {
    throw error.response?.data || { reason: 'Unknown error' };
  }
};
