import {Board} from "../Board";
import {Figure} from "../Figure";

export class Bishop extends Figure {
  constructor(color: string, x: number, y: number, cellSize: number) {
    super(color, x, y, cellSize, `figuresImages/${color === 'black' ? 'B' : ''}Bishop.svg`);
  }
  isValidMove(x: number, y: number, board: Board): boolean {
    const dx = Math.abs(x - this.x);
    const dy = Math.abs(y - this.y);
    return dx === dy; // диагональ
  }
}