import { axiosRequest } from '../lib/axiosConfig'
import { ENDPOINTS } from '../lib/endpoints'

export type TUserInfoResponse = {
  id: number
  first_name: string
  second_name: string
  display_name: string
  phone: string
  login: string
  avatar: string
  email: string
}

export const getUserInfo = async () => {
  const result = await axiosRequest.get(ENDPOINTS.USER_INFO)

  if (result.status !== 200) {
    throw new Error(result.statusText)
  }

  return result.data as TUserInfoResponse
}
