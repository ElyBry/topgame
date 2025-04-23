import { axiosRequest } from '../lib/axiosConfig'
import { ENDPOINTS } from '../lib/endpoints'

export interface IReaction {
  id: number
  topicId: number
  userId: number
  type: string
  createdAt: Date
  updatedAt: Date
}
export type TReactionsResponse = IReaction[]
export type ICreateReactionResponse = IReaction
export interface ICreateReactionPayload {
	userId: number, topicId: number, type: string
}
export type IDeleteReactionResponse = IReaction

export const getReactions = async (topicId: number) => {
	const result = await axiosRequest.get(`${ENDPOINTS.TOPICS_LIST}/${topicId}${ENDPOINTS.REACTIONS}`)

	if (result.status !== 200) {
		throw new Error(result.statusText)
	}

	return result.data as TReactionsResponse
}

export const addReaction = async (topicId:number, payload: ICreateReactionPayload) => {
	const result = await axiosRequest.post(`${ENDPOINTS.TOPICS_LIST}/${topicId}${ENDPOINTS.REACTIONS}`, payload)

	if (result.status !== 200) {
		throw new Error(result.statusText)
	}

	return result.data as ICreateReactionResponse
}

export const deleteReaction = async (topicId: number, id: number) => {
	const result = await axiosRequest.delete(`${ENDPOINTS.TOPICS_LIST}/${topicId}${ENDPOINTS.REACTIONS}/${id}`)

	if (result.status !== 200) {
		throw new Error(result.statusText)
	}

	return result.data as IDeleteReactionResponse
}