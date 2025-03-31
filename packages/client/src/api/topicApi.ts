import { axiosRequest } from './lib/axiosBaseConfig'
import { ENDPOINTS } from './lib/endpoints'

export interface ITopic {
	id: number
	name: string
	text: string
	author: string
	createdAt: string
	updatedAt: string
}
export interface IComment {
	id: number
	topicId: string
	text: string
	parentCommentId: number | null,
	author: string
	createdAt: string
	updatedAt: string
}
export interface ITopicResponse  {
	topic: ITopic,
	commentsTopic: IComment[] | []
}
export type ICreateTopicResponse = ITopic
export type ICreateCommentResponse = IComment

export type TTopicListResponse = ITopic[] | []

export const getTopicsList = async () => {
	const result = await axiosRequest.get(ENDPOINTS.TOPICS_LIST)

	if (result.status !== 200) {
		throw new Error(result.statusText)
	}

	return result.data as TTopicListResponse
}

export const getTopic = async (id: number) => {
	const result = await axiosRequest.get(`${ENDPOINTS.TOPICS_LIST}/${id}`)

	if (result.status !== 200) {
		throw new Error(result.statusText)
	}

	return result.data as ITopicResponse
}

export const addTopic = async (payload: {name: string, text: string, author: string}) => {
	const result = await axiosRequest.post(ENDPOINTS.TOPICS_LIST, payload)

	if (result.status !== 200) {
		throw new Error(result.statusText)
	}

	return result.data as ICreateTopicResponse
}

export const addComment = async (id: number, payload: {text: string, author: string}) => {
	const result = await axiosRequest.post(`${ENDPOINTS.TOPICS_LIST}/${id}/comment`, payload)

	if (result.status !== 200) {
		throw new Error(result.statusText)
	}

	return result.data as ICreateCommentResponse
}