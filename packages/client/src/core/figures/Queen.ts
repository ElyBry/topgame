import {Board} from "../Board";
import {Figure} from "../Figure";

export class Queen extends Figure {
  constructor(color: string, x: number, y: number, cellSize: number) {
    super(color, x, y, cellSize, `figuresImages/${color === 'black' ? 'B' : ''}Queen.svg`);
  }
  isValidMove(x: number, y: number, board: Board): boolean {
    const dx = Math.abs(x - this.x);
    const dy = Math.abs(y - this.y);
    if (dx === dy || this.x === x || this.y === y) {
      return board.isPathClear(this.x, this.y, x, y);
    } // Диагональ, вертикаль и горизонталь
    return false;
  }
  getName() {
    return "Q";
  }
}