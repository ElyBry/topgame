import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getUserInfo, TUserInfoResponse } from '../../api/auth/userInfoApi'
import { RootState } from '../config/store'

const STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const

type TUserSlice = {
  user: TUserInfoResponse | null
  status: typeof STATUS[keyof typeof STATUS]
}

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await getUserInfo()
  return response as TUserInfoResponse
})

const initialState: TUserSlice = {
  user: null,
  status: STATUS.LOADING,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<TUserInfoResponse>) {
      state.user = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUser.pending, (state, _) => {
      state.status = STATUS.LOADING
      state.user = null
    })

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = STATUS.SUCCESS
      state.user = action.payload
    })

    builder.addCase(fetchUser.rejected, (state, _) => {
      state.status = STATUS.ERROR
      state.user = null
    })
  },
})

export const { setUser } = userSlice.actions
export const selectUser = (state: RootState) => state.userSlice
export default userSlice.reducer
