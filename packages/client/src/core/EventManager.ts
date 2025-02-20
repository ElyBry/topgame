import {GameEngine} from "./GameEngine";
import {Figure} from "./Figure";
import {Move} from "./Move";
import {King} from "./figures/King";
import {Rook} from "./figures/Rook";
import {Pawn} from "./figures/Pawn";

export class EventManager {
  private gameEngine: GameEngine;
  private canvas: HTMLCanvasElement;
  private selectedFigure: Figure | null = null;
  private cellSize: number;
  private lastMove: Move | null = null;
  private moveIs = false;

  constructor(gameEngine: GameEngine, canvas: HTMLCanvasElement, cellSize: number) {
    this.gameEngine = gameEngine;
    this.canvas = canvas;
    this.setupEventListeners();
    this.cellSize = cellSize;
  }

  setupEventListeners() {
    this.canvas.addEventListener('click', (event) => this.handleClick(event));
  }

  handleClick(event: MouseEvent) {
    const rect = (event.target as HTMLCanvasElement).getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / this.cellSize);
    const y = Math.floor((event.clientY - rect.top) / this.cellSize);

    const board = this.gameEngine.getBoard();
    const figure = board.getFigure(x, y);

    if (this.selectedFigure) {
      const move = new Move(this.selectedFigure, this.selectedFigure.x, this.selectedFigure.y, x, y);
      const currentPlayer = this.gameEngine.getCurrentPlayer();
      // Если цвет фигур совпадает, то убираем селект на фигуре(есть вид шахмат с возможностью убивать свои фигуры)
      if (this.selectedFigure.color === board.getFigure(x,y)?.color && !(this.selectedFigure instanceof King && board.getFigure(x, y) instanceof Rook)) {
        this.selectedFigure = null;
        this.gameEngine.getSounds().playCancelMoveSound();
        return;
      }
      if (currentPlayer.makeMove(this.selectedFigure.x, this.selectedFigure.y, x, y, board)) {
        if (this.selectedFigure instanceof King && board.getFigure(x, y) instanceof Rook && this.selectedFigure.color === board.getFigure(x,y)?.color) {
          // Рокировка
          const rook = board.getFigure(x, y) as Rook;
          const isLongCastling = x < this.selectedFigure.x;
          const isShortCastling = x > this.selectedFigure.x;
          const startX = this.selectedFigure.x;
          let kingNewX: number;
          let rookNewX: number;

          if (isLongCastling) {
            kingNewX = startX - 2;
            rookNewX = startX - 1;
          } else if (isShortCastling) {
            kingNewX = startX + 2;
            rookNewX = startX + 1;
          } else {
            console.log("Некорректное направление рокировки.");
            return;
          }

          this.gameEngine.getCanvasManager().animateTwoFiguresMovement(board, this.selectedFigure, this.selectedFigure.x, this.selectedFigure.y, kingNewX, y, rook, rook.x, rook.y, rookNewX, y, 300);
        } else if (this.selectedFigure instanceof Pawn && (y === 0 || y === 7)) {
          this.gameEngine.getCanvasManager().animateFigureMovement(board, this.selectedFigure, this.selectedFigure.x, this.selectedFigure.y, x, y, 300, (figure) => {
            figure.move(x, y, board);
            board.promotePawn(figure, x, y);
          });
        } else if (this.selectedFigure instanceof Pawn) {
          const direction = this.selectedFigure.color === 'white' ? -1 : 1;
          const enemyPawnY = y - direction;
          const enemyPawn = board.getFigure(x, enemyPawnY);

          if (Math.abs(x - this.selectedFigure.x) === 1 && y - this.selectedFigure.y === direction && enemyPawn instanceof Pawn
            && enemyPawn.color !== this.selectedFigure.color && enemyPawn.didDoubleMove) {
            if (this.lastMove?.figure === enemyPawn) {
              this.gameEngine.getCanvasManager().animateFigureMovement(
                board,
                this.selectedFigure, this.selectedFigure.x, this.selectedFigure.y, x, y,
                300,
                (figure) => {
                  board.setFigure(x, enemyPawnY, null);
                  figure.move(x, y, board);
                }
              );
            } else {
              this.selectedFigure = null;
              return;
            }
          } else {
            this.gameEngine.getCanvasManager().animateFigureMovement(
              board,
              this.selectedFigure, this.selectedFigure.x, this.selectedFigure.y, x, y,
              300
            );
          }
        } else {
          this.gameEngine.getCanvasManager().animateFigureMovement(board, this.selectedFigure, this.selectedFigure.x, this.selectedFigure.y, x, y, 300);
        }
        this.lastMove = move;
        this.gameEngine.getNotation().addMove(move);
        this.moveIs = true;
        this.gameEngine.updateGameLogic();
      }

      this.selectedFigure = null;
    } else if (figure && figure.color === this.gameEngine.getCurrentPlayer().color) {
      this.selectedFigure = figure;
      const availableMoves = this.gameEngine.getBoard().getAvailableMoves(figure).availableMoves;
      this.gameEngine.getCanvasManager().drawPossibleMoves(availableMoves);
    } else if (figure !== null && figure !== undefined && figure?.color !== this.gameEngine.getCurrentPlayer().color) {
      // Здесь должно быть отображение уведомления для игрока, что сейчас не его ход и это не его фигура
      console.log(`Сейчас не ваш ход`);
      this.gameEngine.getSounds().playCancelMoveSound();
    }
    // console.log(`Selected figure ${this.selectedFigure?.constructor.name}`);
  }

  getSelectedFigure() {
    return this.selectedFigure;
  }
  nextMove() {
    const currentMove = this.moveIs;
    this.moveIs = false;
    return currentMove;
  }
  getLastMove(): Move | null {
    return this.lastMove;
  }
  clearMove():void {
    this.lastMove = null;
  }

  updateSize(cellSize: number) {
    this.cellSize = cellSize;
  }
}