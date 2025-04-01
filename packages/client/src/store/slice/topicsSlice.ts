import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../config/store'
import {
  addComment,
  addTopic,
  getTopic,
  getTopicsList,
  ITopicResponse,
  TTopicListResponse,
} from '../../api/topicApi'

export interface IAddCommentPayload {
  id: number
  data: { text: string; author: string }
}

export interface ICreateNewTopicPayload {
  name: string
  text: string
  author: string
}

export interface ITopicsListInterface {
  data: TTopicListResponse
  loading: boolean
}

export interface ITopicInterface {
  data: ITopicResponse | null
  loading: boolean
}

export type TTopicsSlice = {
  topicsList: ITopicsListInterface
  topicObject: ITopicInterface
}

export const fetchTopicsList = createAsyncThunk('topics/get', async () => {
  try {
    const res = await getTopicsList()
    return res
  } catch (error) {
    console.error('Ошибка загрузки списка топиков:', error)
  }
})

export const fetchTopic = createAsyncThunk('topics/:id', async (id: number) => {
  try {
    const res = await getTopic(id)
    return res
  } catch (error) {
    console.error('Ошибка загрузки топика:', error)
  }
})

export const addCommentToTopic = createAsyncThunk(
  'topics/:id/comment',
  async (payload: IAddCommentPayload) => {
    const { id, data } = payload
    try {
      const res = await addComment(id, data)
      return res
    } catch (error) {
      console.error('Ошибка добавления коммента:', error)
    }
  }
)

export const createNewTopic = createAsyncThunk(
  'topics/post',
  async (payload: ICreateNewTopicPayload) => {
    try {
      const res = await addTopic(payload)
      return res
    } catch (error) {
      console.error('Ошибка создания топика:', error)
    }
  }
)

const initialState: TTopicsSlice = {
  topicsList: {
    data: [],
    loading: false,
  },
  topicObject: {
    data: null,
    loading: false,
  },
}

const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTopicsList.pending, state => {
      state.topicsList.loading = true
    })
    builder.addCase(fetchTopicsList.fulfilled, (state, action) => {
      if (action.payload) {
        state.topicsList.data = action.payload
      }
      state.topicsList.loading = false
    })
    builder.addCase(fetchTopicsList.rejected, state => {
      state.topicsList.loading = false
    })
    builder.addCase(fetchTopic.pending, state => {
      state.topicObject.loading = true
    })
    builder.addCase(fetchTopic.fulfilled, (state, action) => {
      if (action.payload) {
        state.topicObject.data = action.payload
      }
      state.topicObject.loading = false
    })
    builder.addCase(fetchTopic.rejected, state => {
      state.topicObject.loading = false
    })
  },
})

export const selectTopicsSlice = (state: RootState) => state.topicsSlice
export default topicsSlice.reducer
