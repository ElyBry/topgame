import { useEffect, useRef, useState } from 'react'
import { SettingsClassic } from '../../core/SettingsClassic'
import { GameEngine } from '../../core/GameEngine'
import { Sound } from '../../core/Sound'
import { GameTimer } from '../GameTimer'
import { GameStoryMove } from '../GameStoryMove'
import { Move } from '../../core/Move'
import { Figure } from '../../core/Figure'
import { GameEatedFigures } from '../GameEatedFigures'
import { COLORS } from '../../utils/constants'
import { useAppSelector } from '../../store/hooks'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'
import { leaderboardNewLeaderRequest } from '../../api/leaderboard/leaderboardApi'
import { useSelector } from 'react-redux'
import { selectUser } from '../../store/slice/userSlice'

const ChessBoard = () => {
  const { settings, winner } = useAppSelector(state => state.gameSlice)
  const { color: activeColor, time, addTimeMove } = settings
  const secondsPerParty = time * 60
  const [titlePlayer1] = useState(
    activeColor === COLORS.BLACK ? 'Чёрные' : 'Белые'
  )
  const [titlePlayer2] = useState(
    activeColor === COLORS.BLACK ? 'Белые' : 'Чёрные'
  )
  const [canvasSize, setCanvasSize] = useState({
    width: window.innerWidth - window.innerWidth * 0.05,
    height: window.innerHeight - window.innerHeight * 0.05,
  })
  const gameEngineRef = useRef<GameEngine | null>(null)
  const [whiteTime, setWhiteTime] = useState(secondsPerParty)
  const [blackTime, setBlackTime] = useState(secondsPerParty)
  const [color, setColor] = useState(activeColor)
  const [notation, setNotation] = useState<Move[]>([])
  const [eatedFigures, setEatedFigures] = useState<Figure[]>([])

  const userState = useSelector(selectUser)

  const navigate = useNavigate()

  useEffect(() => {
    const canvas = document.getElementById('chessCanvas') as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    const settings = new SettingsClassic(ctx)
    settings.initialize()
    settings.setDebugMode(true)
    settings.setWithTime(time !== 0)
    settings.setMinutesPerParty(secondsPerParty)
    settings.setCountSecondsPerMove(addTimeMove)
    const whiteColor = '#F0D9B5'
    const blackColor = '#B58863'
    const cellSize = Math.min(canvasSize.width / 8, canvasSize.height / 8)
    const sound = new Sound()
    if (!gameEngineRef.current) {
      gameEngineRef.current = new GameEngine(
        settings,
        canvas,
        cellSize,
        whiteColor,
        blackColor,
        sound,
        time => setWhiteTime(time),
        time => setBlackTime(time),
        color => setColor(color),
        (moves: Move[]) => setNotation(moves),
        (eatedFigures: Figure[]) => setEatedFigures(eatedFigures)
      )
      gameEngineRef.current.start()
    }

    if (winner) {
      leaderboardNewLeaderRequest({data: { username: userState.user!.login, countMoves: notation.filter((move) => move.figure.color === activeColor).length * -1}, ratingFieldName: "countMoves"})
      navigate(ROUTES.END_GAME)
    }
  }, [canvasSize, winner, navigate])

  return (
    <div>
      <h1>{titlePlayer2}</h1>
      {
        time !== 0 && (
          <GameTimer initialSeconds={blackTime} active={color === 'black'} />
        )
      }
      <GameEatedFigures
        eatenPieces={eatedFigures.filter(figure => figure.color === 'white')}
      />
      <canvas
        id={'chessCanvas'}
        style={{ userSelect: 'none' }}
        width={canvasSize.width}
        height={canvasSize.height}></canvas>
      <h1>{titlePlayer1}</h1>
      {
        time !== 0 && (
          <GameTimer initialSeconds={whiteTime} active={color === 'white'} />
        )
      }
      <GameEatedFigures
        eatenPieces={eatedFigures.filter(figure => figure.color === 'black')}
      />

      <h1>История</h1>
      <GameStoryMove moves={notation} />
    </div>
  )
}

export default ChessBoard
