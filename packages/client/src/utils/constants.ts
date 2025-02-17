export const APP_NAME = "Chessify";
export const COLORS = {
  WHITE: 'white',
  BLACK: 'black',
  RANDOM: 'random',
} as const


export const SETTING_GAME_DEFAULT = {
  color: 'white', // Белый цвет фигур
  time: 0, // Время на партию для каждого из игроков неограниченно
  addTimeMove: 0 // После каждого хода не происходит добавления времени
}
export const SETTING_GAME_SELECT = {
  'color': [
    {
      'color': COLORS.WHITE,
      'name': 'Белые',
      'src': '/src/pages/StartGame/ui/i/white.svg'
    },
    {
      'color': COLORS.RANDOM,
      'name': 'Случайный выбор',
      'src': '/src/pages/StartGame/ui/i/random.svg'
    },
    {
      'color': COLORS.BLACK,
      'name': 'Чёрные',
      'src': '/src/pages/StartGame/ui/i/black.svg',
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