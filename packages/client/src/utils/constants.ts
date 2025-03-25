export const APP_NAME = "Chessify";
export enum COLORS {
  WHITE= 'white',
  BLACK= 'black',
  RANDOM= 'random',
}

export interface ISettingsDefault {
  color: string
  time: number
  addTimeMove: number
}

export const SETTING_GAME_DEFAULT: ISettingsDefault = {
  color: COLORS.WHITE,
  time: 0,
  addTimeMove: 0
}
export const SETTING_GAME_SELECT = {
  'color': [
    {
      'color': COLORS.WHITE,
      'name': 'Белые',
      'src': '/StartGame/white.svg'
    },
    {
      'color': COLORS.RANDOM,
      'name': 'Случайный выбор',
      'src': '/StartGame/random.svg'
    },
    {
      'color': COLORS.BLACK,
      'name': 'Чёрные',
      'src': '/StartGame/black.svg',
    }
  ],
  'timePlay': [
    { 'name': '∞', 'time': 0 },
    { 'name': '10', 'time': 10 },
    { 'name': '20', 'time': 20 },
    { 'name': '30', 'time': 30 },
    { 'name': '40', 'time': 40 },
    { 'name': '50', 'time': 50 },
    { 'name': '60', 'time': 60 }
  ],
  'timePlayMove': [
    { 'name': '0', 'time': 0 },
    { 'name': '5', 'time': 5 },
    { 'name': '10', 'time': 10 },
    { 'name': '15', 'time': 15 },
    { 'name': '20', 'time': 20 },
    { 'name': '25', 'time': 25 },
    { 'name': '30', 'time': 30 }
  ]
}

export const OAUTH_REDIRECT_URI = 'http://localhost:3000/oauth';
