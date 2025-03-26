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
import styles from "./chessBoard.module.css";

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
    width: window.innerWidth - window.innerWidth * 0.20,
    height: window.innerHeight - window.innerHeight * 0.20,
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
    <div className={styles.container}>
      <div className={styles.gameArea}>
        <div className={styles.playerArea}>
          <div className={styles.playerInfo}>
            <h3 className={styles.playerTitle}>{titlePlayer2}</h3>
            {time !== 0 && (
              <GameTimer initialSeconds={blackTime} active={color === 'black'} />
            )}
          </div>
          <GameEatedFigures
            eatenPieces={eatedFigures.filter(figure => figure.color === 'white')}
          />
        </div>

        <div className={styles.boardContainer}>
          <canvas
            id="chessCanvas"
            className={styles.chessCanvas}
            width={canvasSize.height}
            height={canvasSize.height}
          />
        </div>

        <div className={styles.playerArea}>
          <div className={styles.playerInfo}>
            <h3 className={styles.playerTitle}>{titlePlayer1}</h3>
            {time !== 0 && (
              <GameTimer initialSeconds={whiteTime} active={color === 'white'} />
            )}
          </div>
          <GameEatedFigures
            eatenPieces={eatedFigures.filter(figure => figure.color === 'black')}
          />
        </div>
      </div>

      <div className={styles.historyContainer}>
        <GameStoryMove moves={notation} />
      </div>
    </div>
  )
}

export default ChessBoard
