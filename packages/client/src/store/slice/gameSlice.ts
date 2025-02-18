import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../config/store'
import { ISettingsDefault } from '../../utils/constants'
import { COLORS } from '../../utils/constants'

interface IGameSetting extends ISettingsDefault {
  opponentColor: string
}

type TSettingsSlice = {
  settings: IGameSetting
  winner: string
}

const initialState: TSettingsSlice = {
  settings: {
    color: COLORS.WHITE,
    opponentColor: COLORS.BLACK,
    time: 0,
    addTimeMove: 0,
  },
  winner: '',
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameSettings(state, action: PayloadAction<IGameSetting>) {
      state.settings = action.payload
    },
    setWinnerColor(state, action: PayloadAction<string>) {
      state.winner = action.payload
    },
    resetWinnerColor(state) {
      state.winner = ''
    },
  },
})

export const { setGameSettings, setWinnerColor, resetWinnerColor } = gameSlice.actions
export const selectGame = (state: RootState) => state.gameSlice
export default gameSlice.reducer
