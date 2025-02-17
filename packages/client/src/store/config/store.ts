import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import userSlice from '../slice/userSlice'

export const store = configureStore({
  reducer: {
    userSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
