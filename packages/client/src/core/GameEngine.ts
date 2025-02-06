import {EventManager} from "./EventManager";
import {Board} from "./Board";
import {Player} from "./Player";
import {Timer} from "./Timer";
import {CanvasManager} from "./CanvasManager";
import {Settings} from "./Settings";

export class GameEngine {
  private board: Board;
  private players: Player[];
  private currentPlayerIndex: number;
  private canvasManager: CanvasManager;
  private eventManager: EventManager;
  private timer: Timer;
  private isGameOver: boolean;
  private settings: Settings;

  constructor(settings: Settings, canvas: HTMLCanvasElement, cellSize = 50, colorWhiteHex: string, colorBlackHex: string) {
    this.board = new Board(settings.getWidth(), settings.getHeight(), cellSize);
    this.players = [new Player('Player 1', 'white'), new Player('Player 2', 'black')];
    this.currentPlayerIndex = 0;
    this.canvasManager = new CanvasManager(settings.getContext(), settings.getWidth(), settings.getHeight(), cellSize, colorWhiteHex, colorBlackHex);
    this.eventManager = new EventManager(this, canvas, cellSize);
    this.timer = new Timer(settings.getMinutesPerParty(), settings.getCountSecondsPerMove());
    this.isGameOver = false;
    this.settings = settings;
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
  hasLegalMoves(player: Player): boolean {
    const board = this.getBoard();
    const figures = board.getFigures();

    for (const figure of figures) {
      if (figure.color === player.color) {
        for (let y = 0; y < this.settings.getHeight(); y++) {
          for (let x = 0; x < this.settings.getWidth(); x++) {
            if (figure.isValidMove(x, y, board)) {
              const tempBoard = board.clone();
              tempBoard.moveFigure(x, y, figure);
              if (!tempBoard.isKingInCheck(player.color)) {
                return true;
              }
            }
          }
        }
      }
    }

    return false;
  }

  drawGame() {
    this.canvasManager.clear();
    this.canvasManager.drawBoard(this.board);
    this.canvasManager.drawFigures(this.board.getFigures(), this.eventManager.getSelectedFigure(), this.board);
  }

  checkGameOver() {
    const currentPlayer = this.players[this.currentPlayerIndex];
    const board = this.getBoard();

    // if (board.isKingInCheck(currentPlayer.color)) {
    //   if (!this.hasLegalMoves(currentPlayer)) {
    //     console.log(`Мат! Игрок ${currentPlayer.name} проиграл.`);
    //     this.isGameOver = true;
    //     return;
    //   }
    // } else {
    //   if (!this.hasLegalMoves(currentPlayer)) {
    //     console.log("Пат! Ничья.");
    //     this.isGameOver = true;
    //     return;
    //   }
    // }

    // Проверка на недостаток материала
    // if (this.isInsufficientMaterial()) {
    //   console.log("Недостаточно материала для мата. Ничья.");
    //   this.isGameOver = true;
    //   return;
    // }
  }
}
