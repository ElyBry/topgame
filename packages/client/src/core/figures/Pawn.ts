import {Board} from "../Board";
import {Figure} from "../Figure";

export class Pawn extends Figure {
  didDoubleMove = false;
  constructor(color: string, x: number, y: number, cellSize: number) {
    super(color, x, y, cellSize, `figuresImages/${color === 'black' ? 'B' : ''}Pawn.svg`);
  }
  isValidMove(x: number, y: number, board: Board): boolean {
    const direction = this.color === 'white' ? -1 : 1;
    const dx = x - this.x;
    const dy = y - this.y;

    // Первый ход - две клетки, иначе на 1 вперёд
    if (dx === 0 && dy === direction && (this.x !== x || this.y !== y)) {
      if (board.getFigure(x, y) === null && this.checkShah(x, y, board)) {
        return true;
      }
    } else if (dx === 0 && dy === 2 * direction && (this.y === 1 || this.y === 6) && (this.x !== x || this.y !== y)) {
      if (board.getFigure(x, y) === null && board.getFigure(x, y - direction) === null && this.checkShah(x, y, board)) {
        return true;
      }
    }

    // Возможность взятия на проходе
    if (Math.abs(dx) === 1 && dy === direction) {
      const enemyPawnY = y - direction;
      const enemyPawn = board.getFigure(x, enemyPawnY);
      if (enemyPawn instanceof Pawn && enemyPawn.color !== this.color && enemyPawn.didDoubleMove && this.checkShah(x, y, board)) {
        return true;
      }
    }

    // Пешка может бить по диагонали
    if (Math.abs(dx) === 1 && dy === direction) {
      if (board.getFigure(x, y) !== null && board.getFigure(x, y)!.color !== this.color && this.checkShah(x, y, board)) {
        return true;
      }
    }
    return false;
  }

  move(x: number, y: number, board: Board) {
    const dy = y - this.y;
    this.didDoubleMove = Math.abs(dy) === 2;
    super.move(x, y, board);
  }
  getName() {
    return "p";
  }
}