import {useEffect, useRef, useState} from "react";
import {SettingsClassic} from "../../../core/SettingsClassic";
import {GameEngine} from "../../../core/GameEngine";
import {Sound} from "../../../core/Sound";

export const TestCore = () => {
    const [canvasSize, setCanvasSize] = useState({width: window.innerWidth - window.innerWidth * 0.05, height: window.innerHeight - window.innerHeight * 0.05});
    const gameEngineRef = useRef<GameEngine | null>(null);

  useEffect(() => {
    const canvas = document.getElementById('chessCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    const settings = new SettingsClassic(ctx);
    settings.initialize();
    settings.setDebugMode(true);
    const whiteColor = '#F0D9B5';
    const blackColor = '#B58863';
    const cellSize = Math.min(canvasSize.width / 8, canvasSize.height / 8);
    const sound = new Sound();
    if (!gameEngineRef.current) {
        gameEngineRef.current = new GameEngine(settings, canvas, cellSize, whiteColor, blackColor, sound);
        gameEngineRef.current.start();
    }
  }, [canvasSize]);

  return (
      <>
        <canvas id={"chessCanvas"} style={{ userSelect: "none"}} width={canvasSize.width} height={canvasSize.height}></canvas>
      </>
  );
}