import {EventManager} from "./EventManager";
import {Board} from "./Board";
import {Player} from "./Player";
import {Timer} from "./Timer";
import {CanvasManager} from "./CanvasManager";
import {Settings} from "./Settings";
import {Sound} from "./Sound";

export class GameEngine {
  private board: Board;
  private players: Player[];
  private currentPlayerIndex: number;
  private canvasManager: CanvasManager;
  private eventManager: EventManager;
  private timer: Timer;
  private isGameOver: boolean;
  private settings: Settings;
  private sounds: Sound;

  constructor(settings: Settings, canvas: HTMLCanvasElement, cellSize = 50, colorWhiteHex: string, colorBlackHex: string, sounds: Sound) {
    this.board = new Board(settings.getWidth(), settings.getHeight(), cellSize);
    this.players = [new Player('Player 1', 'white'), new Player('Player 2', 'black')];
    this.currentPlayerIndex = 0;
    this.canvasManager = new CanvasManager(settings.getContext(), settings.getWidth(), settings.getHeight(), cellSize, colorWhiteHex, colorBlackHex);
    this.eventManager = new EventManager(this, canvas, cellSize);
    this.timer = new Timer(settings.getMinutesPerParty(), settings.getCountSecondsPerMove());
    this.isGameOver = false;
    this.settings = settings;
    this.sounds = sounds;
  }

  start() {
    this.board.init();
    this.timer.start();
    this.gameLoop();
  }

  gameLoop() {
    if (this.isGameOver) return;

    this.updateGameLogic();
    this.drawGame();

    requestAnimationFrame(() => this.gameLoop());
  }

  updateGameLogic() {
    const currentPlayer = this.players[this.currentPlayerIndex];
    if (currentPlayer.isTurn) {
      const move = this.eventManager.getMove();
      if (move) {
        currentPlayer.endTurn();
        this.eventManager.clearMove();
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        this.players[this.currentPlayerIndex].isTurn = true;
        this.checkGameOver();
      }
    }
  }
  getBoard(): Board {
    return this.board;
  }
  getCurrentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }
  getSettings() {
    return this.settings;
  }
  getSounds() {
    return this.sounds;
  }
  updateCanvasSize(width: number, height: number, cellSize: number) {
    this.canvasManager.updateSize(width, height, cellSize);
    this.getBoard().updateSize(width, height, cellSize);
    this.eventManager.updateSize(cellSize);
  }
  getCanvasManager() {
    return this.canvasManager;
  }

  drawGame() {
    this.canvasManager.clear();
    this.canvasManager.drawBoard(this.board);
    this.canvasManager.drawFigures(this.board.getFigures(), this.eventManager.getSelectedFigure());
  }

  checkGameOver() {}
}
