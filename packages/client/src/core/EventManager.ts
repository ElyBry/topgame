import {GameEngine} from "./GameEngine";
import {Figure} from "./Figure";
import {Move} from "./Move";

export class EventManager {
  private gameEngine: GameEngine;
  private canvas: HTMLCanvasElement;
  private selectedFigure: Figure | null = null;
  private cellSize: number;
  private lastMove: Move | null = null;

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

    console.log(x, y)

    const board = this.gameEngine.getBoard();
    const figure = board.getFigure(x, y);

    if (this.selectedFigure) {
      const move = new Move(this.selectedFigure, this.selectedFigure.x, this.selectedFigure.y, x, y);
      const currentPlayer = this.gameEngine.getCurrentPlayer();
      // Если цвет фигур совпадает, то убираем селект на фигуре(есть вид шахмат с возможностью убивать свои фигуры)
      if (this.selectedFigure.color === board.getFigure(x,y)?.color) {
        this.selectedFigure = null;
        return;
      }
      if (currentPlayer.makeMove(this.selectedFigure.x, this.selectedFigure.y, x, y, board)) {
        this.gameEngine.getCanvasManager().animateFigureMovement(board, this.selectedFigure, this.selectedFigure.x, this.selectedFigure.y, x, y, 300);
        this.lastMove = move;
        this.gameEngine.updateGameLogic();
      }

      this.selectedFigure = null;
    } else if (figure && figure.color === this.gameEngine.getCurrentPlayer().color) {
      this.selectedFigure = figure;
    } else if (figure !== null && figure !== undefined && figure?.color !== this.gameEngine.getCurrentPlayer().color) {
      // Здесь должно быть отображение уведомления для игрока, что сейчас не его ход и это не его фигура
      console.log(`Сейчас не ваш ход`);
    }
    // console.log(`Selected figure ${this.selectedFigure?.constructor.name}`);
  }

  getSelectedFigure() {
    return this.selectedFigure;
  }
  getMove(): Move | null {
    return this.lastMove;
  }
  clearMove():void {
    this.lastMove = null;
  }

  updateSize(cellSize: number) {
    this.cellSize = cellSize;
  }
}