import {useEffect, useRef, useState} from "react";
import {SettingsClassic} from "../../../core/SettingsClassic";
import {GameEngine} from "../../../core/GameEngine";
import {Sound} from "../../../core/Sound";
import {GameTimer} from "../../../components/GameTimer";
import {GameStoryMove} from "../../../components/GameStoryMove";
import {Move} from "../../../core/Move";
import {Figure} from "../../../core/Figure";
import {GameEatedFigures} from "../../../components/GameEatedFigures";
import { useLocation } from "react-router-dom";
import {COLORS} from '../../../utils/constants'

export const GamePage = () => {
  const location = useLocation();
  const settingsGame = location.state;
  const seconds = 300;
  const secondsPerParty = settingsGame.time * 60 || seconds
  const countSecondsPerMove = settingsGame.addTimeMove
  const [activeColor] = useState(settingsGame.color === COLORS.RANDOM ? [COLORS.WHITE, COLORS.BLACK][Math.floor(Math.random() * 2)] : settingsGame.color)
  const [titleMine] = useState(activeColor === COLORS.BLACK ? 'Таймер черных' : 'Таймер белых')
  const [titleOponent] = useState(activeColor === COLORS.BLACK ? 'Таймер белых' : 'Таймер черных')
  const [canvasSize, setCanvasSize] = useState({width: window.innerWidth - window.innerWidth * 0.05, height: window.innerHeight - window.innerHeight * 0.05});
  const gameEngineRef = useRef<GameEngine | null>(null);
  const [whiteTime, setWhiteTime] = useState(secondsPerParty);
  const [blackTime, setBlackTime] = useState(secondsPerParty);
  const [color, setColor] = useState(activeColor);
  const [notation, setNotation] = useState<Move[]>([]);
  const [eatedFigures, setEatedFigures] = useState<Figure[]>([]);


  useEffect(() => {
    const canvas = document.getElementById('chessCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    const settings = new SettingsClassic(ctx);
    settings.initialize();
    settings.setDebugMode(true);
    settings.setWithTime(true);
    settings.setMinutesPerParty(secondsPerParty);
    settings.setCountSecondsPerMove(countSecondsPerMove);
    const whiteColor = '#F0D9B5';
    const blackColor = '#B58863';
    const cellSize = Math.min(canvasSize.width / 8, canvasSize.height / 8);
    const sound = new Sound();
    if (!gameEngineRef.current) {
        gameEngineRef.current = new GameEngine(settings, canvas, cellSize, whiteColor, blackColor, sound,
          (time) => setWhiteTime(time),
          (time) => setBlackTime(time),
          (color) => setColor(color),
      (moves: Move[]) => setNotation(moves),
          (eatedFigures: Figure[]) => setEatedFigures(eatedFigures));
        gameEngineRef.current.start();
    }
  }, [canvasSize]);


  return (
    <div>
      <h1>{titleOponent}</h1>
      <GameTimer initialSeconds={blackTime} active={color === "black"}/>
      <GameEatedFigures eatenPieces={eatedFigures.filter((figure) => figure.color === 'white')} />
      <canvas id={"chessCanvas"} style={{userSelect: "none"}} width={canvasSize.width}
              height={canvasSize.height}></canvas>
      <GameEatedFigures eatenPieces={eatedFigures.filter((figure) => figure.color === 'black')} />
      <h1>{titleMine}</h1>
      <GameTimer initialSeconds={whiteTime} active={color === "white"}/>
      <h1>История</h1>
      <GameStoryMove moves={notation}/>
    </div>
  );
}