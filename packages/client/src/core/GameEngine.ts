import {EventManager} from "./EventManager";
import {Board} from "./Board";
import {Player} from "./Player";
import {Timer} from "./Timer";
import {CanvasManager} from "./CanvasManager";
import {Settings} from "./Settings";
import {Sound} from "./Sound";
import {Notation} from "./Notation";
import {Move} from "./Move";
import {Figure} from "./Figure";
import { setWinnerColor } from '../store/slice/gameSlice'
import {store} from "../store/config/store"

export class GameEngine {
  private board: Board;
  private players: Player[];
  private currentPlayerIndex: number;
  private canvasManager: CanvasManager;
  private eventManager: EventManager;
  private timers: Timer[];
  private notation: Notation;
  private isGameOver: boolean;
  private settings: Settings;
  private sounds: Sound;
  private storeSettings = store.getState().gameSlice.settings;
  private player_1_color = this.storeSettings.color;
  private player_2_color = this.storeSettings.opponentColor
  private player_1 = 'Player 1'
  private player_2 = 'Player 2'
  private updateTimeWhite: (time: number) => void;
  private updateTimeBlack: (time: number) => void;
  private currentTimeUpdate: (time: number) => void;
  private changePlayer: (color: string) => void;
  private updateNotation: (moves: Move[]) => void;
  private updateEatedFigures: (eatedFigures: Figure[]) => void;

  constructor(settings: Settings,
              canvas: HTMLCanvasElement,
              cellSize = 50,
              colorWhiteHex: string,
              colorBlackHex: string,
              sounds: Sound,
              whiteTimer: (time: number) => void,
              blackTimer: (time: number) => void,
              changePlayer: (color: string) => void,
              updateNotation: (moves: Move[]) => void,
              updateEatedFigures: (eatedFigures: Figure[]) => void) {
    this.sounds = sounds;
    this.board = new Board(settings.getWidth(), settings.getHeight(), cellSize, sounds);
    this.players = [new Player(this.player_1, this.player_1_color), new Player(this.player_2, this.player_2_color)];
    this.currentPlayerIndex = 0;
    this.canvasManager = new CanvasManager(settings.getContext(), settings.getWidth(), settings.getHeight(), cellSize, colorWhiteHex, colorBlackHex, sounds);
    this.eventManager = new EventManager(this, canvas, cellSize);
    const timerWhite = new Timer(settings.getMinutesPerParty());
    const timerBlack = new Timer(settings.getMinutesPerParty());
    this.timers = [timerWhite, timerBlack];
    this.isGameOver = false;
    this.settings = settings;
    this.updateTimeWhite = whiteTimer;
    this.updateTimeBlack = blackTimer;
    this.currentTimeUpdate = whiteTimer;
    this.changePlayer = changePlayer;
    this.notation = new Notation();
    this.updateNotation = updateNotation;
    this.updateEatedFigures = updateEatedFigures;
  }

  start() {
    this.board.init();
    this.timers[this.currentPlayerIndex].start();
    this.gameLoop();
  }

  gameLoop() {
    if (this.isGameOver) return;

    this.updateGameLogic();
    this.drawGame();
    this.currentTimeUpdate(this.timers[this.currentPlayerIndex].getTime());

    requestAnimationFrame(() => this.gameLoop());
  }

  updateGameLogic() {
    const currentPlayer = this.players[this.currentPlayerIndex];
    if (currentPlayer.isTurn) {
      const isMove = this.eventManager.nextMove();
      if (isMove) {
        currentPlayer.endTurn();
        this.updateNotation(this.notation.getHistory());
        this.updateEatedFigures(this.board.getCapturedFigures());
        this.switchPlayer();
        this.checkGameOver();
      }
    }
    if (this.timers[this.currentPlayerIndex].getTime() <= 0) {
      const loserColor = this.players[this.currentPlayerIndex].color;
      this.endGame(true, loserColor);
    }
  }
  endGame(lose: boolean, whoLose?: string) {
    if (lose && whoLose) {
      const winner = whoLose === this.player_1_color ? this.player_2_color : this.player_1_color
      store.dispatch(setWinnerColor(winner));
      this.getSounds().playLoseSound();
    }
    this.isGameOver = true;
  }
  switchPlayer() {
    this.timers[this.currentPlayerIndex].stop();
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    this.players[this.currentPlayerIndex].isTurn = true;
    this.currentTimeUpdate = this.currentPlayerIndex === 0 ? this.updateTimeWhite : this.updateTimeBlack;
    this.changePlayer(this.players[this.currentPlayerIndex].color);
    this.timers[this.currentPlayerIndex].start();
    if (this.settings.getMinutesPerParty() > 0) {
      // this.getSounds().playClockTickSound();
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
    this.canvasManager.drawFigures(this.board.getFigures(), this.eventManager.getSelectedFigure(), this.board);
  }

  checkGameOver() {}

  getNotation() {
    return this.notation;
  }
}
