import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useStore as useStoreBase } from 'react-redux'
import userSlice from '../slice/userSlice'
import gameSlice from '../slice/gameSlice'
import topicsSlice from '../slice/topicsSlice'
import ssrReducer from '../slice/ssrSlice'
import reactionsSlice from '../slice/reactionsSlice'

declare global {
  interface Window {
    APP_INITIAL_STATE: RootState
  }
}

export const reducer = combineReducers({
  userSlice,
  gameSlice,
  ssr: ssrReducer,
  topicsSlice,
	reactionsSlice
})

export const store = configureStore({
  reducer,
  preloadedState:
    typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE,
})

export type RootState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useStore: () => typeof store = useStoreBase
