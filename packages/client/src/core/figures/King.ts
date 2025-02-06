import {Board} from "../Board";
import {Figure} from "../Figure";

export class King extends Figure {
  constructor(color: string, x: number, y: number, cellSize: number) {
    super(color, x, y, cellSize, `figuresImages/${color === 'black' ? 'B' : ''}King.png`);
  }
  isValidMove(x: number, y: number, board: Board): boolean {
    const dx = Math.abs(x - this.x);
    const dy = Math.abs(y - this.y);
    return (dx <= 1 && dy <= 1); // Одна клетка вокруг себя
  }
}