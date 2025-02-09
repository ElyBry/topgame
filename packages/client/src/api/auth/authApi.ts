import { axiosRequest } from '../lib/axiosConfig'
import { ENDPOINTS } from '../lib/endpoints'

type TLoginArgs = {
  login: string
  password: string
}

export const login = async ({ login, password }: TLoginArgs) => {
  return await axiosRequest.post(ENDPOINTS.SIGN_IN, {
    login,
    password,
  })
}
