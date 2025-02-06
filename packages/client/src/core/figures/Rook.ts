import {Board} from "../Board";
import {Figure} from "../Figure";

export class Rook extends Figure {
  constructor(color: string, x: number, y: number, cellSize: number) {
    super(color, x, y, cellSize, `figuresImages/${color === 'black' ? 'B' : ''}Rook.png`);
  }
  isValidMove(x: number, y: number, board: Board): boolean {
    return (this.x === x || this.y === y); // Вертикаль и горизонталь
  }
}