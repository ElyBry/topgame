import { axiosRequestLocal } from '../lib/axiosConfig'
import { ENDPOINTS } from '../lib/endpoints'

export const newError = async (data: { errorInfo: string | undefined; error: string }) => {
  return await axiosRequestLocal.post(ENDPOINTS.ERROR, {
    data
  })
}
