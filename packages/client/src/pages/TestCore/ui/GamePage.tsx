import {useEffect, useRef, useState} from "react";
import {SettingsClassic} from "../../../core/SettingsClassic";
import {GameEngine} from "../../../core/GameEngine";
import {Sound} from "../../../core/Sound";
import {GameTimer} from "../../../components/GameTimer";
import {GameStoryMove} from "../../../components/GameStoryMove";
import {Move} from "../../../core/Move";
import {Figure} from "../../../core/Figure";
import {GameEatedFigures} from "../../../components/GameEatedFigures";

export const TestCore = () => {
  const seconds = 300;
  const [canvasSize] = useState({width: window.innerWidth - window.innerWidth * 0.05, height: window.innerHeight - window.innerHeight * 0.05});
  const gameEngineRef = useRef<GameEngine | null>(null);
  const [whiteTime, setWhiteTime] = useState(seconds);
  const [blackTime, setBlackTime] = useState(seconds);
  const [color, setColor] = useState("white");
  const [notation, setNotation] = useState<Move[]>([]);
  const [eatedFigures, setEatedFigures] = useState<Figure[]>([]);

  useEffect(() => {
    const canvas = document.getElementById('chessCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    const settings = new SettingsClassic(ctx);
    settings.initialize();
    settings.setDebugMode(true);
    settings.setWithTime(true);
    settings.setMinutesPerParty(seconds);
    settings.setCountSecondsPerMove(0);
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
      <h1>Таймер чёрных</h1>
      <GameTimer initialSeconds={blackTime} active={color === "black"}/>
      <GameEatedFigures eatenPieces={eatedFigures.filter((figure) => figure.color === 'white')} />
      <canvas id={"chessCanvas"} style={{userSelect: "none"}} width={canvasSize.width}
              height={canvasSize.height}></canvas>
      <GameEatedFigures eatenPieces={eatedFigures.filter((figure) => figure.color === 'black')} />
      <h1>Таймер белых</h1>
      <GameTimer initialSeconds={whiteTime} active={color === "white"}/>
      <h1>История</h1>
      <GameStoryMove moves={notation}/>
    </div>
  );
}