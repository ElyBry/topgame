import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import userSlice from '../slice/userSlice'
import gameSlice from '../slice/gameSlice'

export const store = configureStore({
  reducer: {
    userSlice,
    gameSlice
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
