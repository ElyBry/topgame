import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../config/store'
import {
	getReactions,
	addReaction,
	deleteReaction
} from '../../api/reactionsApi/reactionsApi'
import type{TReactionsResponse, ICreateReactionPayload, IReaction} from '../../api/reactionsApi/reactionsApi'

export interface ICreateNewReaction {
	topicId: number,
	data: ICreateReactionPayload
}
export interface IReactionsInterface {
	data: TReactionsResponse
	loading: boolean
}

export type TReactionsSlice = {
	reactions: IReactionsInterface,
	newReaction: IReaction | null
}

export const fetchReactions = createAsyncThunk('topics/:id/reactions/get', async (topicId: number) => {
	try {
		const res = await getReactions(topicId)
		return res
	} catch (error) {
		console.error('Ошибка загрузки реакций:', error)
	}
})

export const createNewReaction = createAsyncThunk(
	'topics/:topicId/reactions/:id',
	async (payload: ICreateNewReaction) => {
		const {topicId, data } = payload
		console.log(1, payload)
		try {
			const res = await addReaction(topicId, data)
			return res
		} catch (error) {
			console.error('Ошибка добавления реакции:', error)
		}
	}
)

export const deleteReactionFromTopic = createAsyncThunk(
	'topics/:topicId/reactions/:id',
	async (payload: {topicId: number, id: number}) => {
		const {topicId, id} = payload
		try {
			const res = await deleteReaction(topicId, id)
			return res
		} catch (error) {
			console.error('Ошибка добавления реакции:', error)
		}
	}
)

const initialState: TReactionsSlice = {
	reactions: {
		data: [],
		loading: false,
	},
	newReaction: null
}

const reactionsSlice = createSlice({
	name: 'reactions',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchReactions.pending, state => {
			state.reactions.loading = true
		})
		builder.addCase(fetchReactions.fulfilled, (state, action) => {
			if (action.payload) {
				state.reactions.data = action.payload
			}
			state.reactions.loading = false
		})
		builder.addCase(fetchReactions.rejected, state => {
			state.reactions.loading = false
		})
		builder.addCase(createNewReaction.fulfilled, (state, action) => {
			if (action.payload) {
				state.newReaction = action.payload
			}
		})
	},
})

export const selectReactionsSlice = (state: RootState) => state.reactionsSlice
export default reactionsSlice.reducer
