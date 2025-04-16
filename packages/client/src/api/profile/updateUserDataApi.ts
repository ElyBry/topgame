import { axiosRequest } from '../lib/axiosConfig'
import { ENDPOINTS } from '../lib/endpoints'
import { validateFormFields } from '../../utils/rules'

export const updateUserData = async (
  firstName?: string,
  secondName?: string,
  login?: string,
  email?: string,
  phone?: string
) => {

  const requestData = {
    "first_name": firstName,
    "second_name": secondName,
    login,
    email,
    phone
  };
  const validateFields = validateFormFields(requestData);
  if (!validateFields.isValid) {
    alert(validateFields.errorMessage)
  }
  const result = await axiosRequest.put(ENDPOINTS.USER_PROFILE, requestData);

  if (result.status !== 200) {
    throw new Error(result.statusText);
  }

  return result.data;
};
