import {useEffect} from "react";
import {SettingsClassic} from "../../../core/SettingsClassic";
import {GameEngine} from "../../../core/GameEngine";

export const TestCore = () => {
  // здесь находится проверка Canvas API
  useEffect(() => {
    const canvas = document.getElementById('chessCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    const settings = new SettingsClassic(ctx);
    settings.initialize();
    settings.setDebugMode(true);
    const whiteColor = '#F0D9B5';
    const blackColor = '#B58863';
    const cellSize = Math.min(canvas.width / 8, canvas.height / 8);
    const gameEngine = new GameEngine(settings, canvas, cellSize, whiteColor, blackColor);
    gameEngine.start();

  });

  return (
      <>
        <div>
          Canvas API
        </div>
        <canvas id={"chessCanvas"} style={{height: '100%', width: '100%', userSelect: "none"}} width={1900} height={1000}></canvas>
      </>
  );
}