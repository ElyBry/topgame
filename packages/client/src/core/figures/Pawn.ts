import {Board} from "../Board";
import {Figure} from "../Figure";

export class Pawn extends Figure {
  constructor(color: string, x: number, y: number, cellSize: number) {
    super(color, x, y, cellSize, `figuresImages/${color === 'black' ? 'B' : ''}Pawn.png`);
  }
  isValidMove(x: number, y: number, board: Board): boolean {
    const direction = this.color === 'white' ? -1 : 1;
    const dx = x - this.x;
    const dy = y - this.y;

    // Первый ход - две клетки, иначе на 1 вперёд
    if (dx === 0 && dy === direction) {
      return board.getFigure(x, y) === null;
    } else if (dx === 0 && dy === 2 * direction && (this.y === 1 || this.y === 6)) {
      return board.getFigure(x, y) === null && board.getFigure(x, y - direction) === null;
    }

    // Пешка может бить по диагонали
    if (Math.abs(dx) === 1 && dy === direction) {
      return board.getFigure(x, y) !== null && board.getFigure(x, y)!.color !== this.color; // Проверяем на чужой цвет
    }

    return false;
  }
  getPossibleMoves(board: Board): {x: number, y: number}[] {
    const moves = [];
    const forward = this.color === 'white' ? -1 : 1;
    if (board.getFigure(this.x, this.y + forward) === null) {
      moves.push({ x: this.x, y: this.y + forward });
    }
    return moves;
  }
}