import {Board} from "../Board";
import {Figure} from "../Figure";

export class Knight extends Figure {
  constructor(color: string, x: number, y: number, cellSize: number) {
    super(color, x, y, cellSize, `figuresImages/${color === 'black' ? 'B' : ''}Knight.svg`);
  }
  isValidMove(x: number, y: number, board: Board): boolean {
    const dx = Math.abs(x - this.x);
    const dy = Math.abs(y - this.y);

    if ((dx === 2 && dy === 1) || (dx === 1 && dy === 2)) { // Буква Г
      if (this.checkShah(x, y, board)) {
        return true;
      }
    }

    return false;
  }
  getName() {
    return "N";
  }
}