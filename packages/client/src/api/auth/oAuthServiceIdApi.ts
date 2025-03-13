import { axiosRequest } from '../lib/axiosConfig'
import { ENDPOINTS } from '../lib/endpoints'
import { OAUTH_REDIRECT_URI } from '../../utils/constants'

export const getServiceId = async (): Promise<string | null> => {
  try {
    const response = await axiosRequest.get(`${ENDPOINTS.OAUTH_SERVICE_ID}?redirect_uri=${OAUTH_REDIRECT_URI}`)

    if (response.data && response.data.service_id) {
      return response.data.service_id
    } else {
      throw new Error('service_id не найден в ответе')
    }
  } catch (error) {
    console.error('Ошибка при получении service_id:', error)
    throw error
  }
}
