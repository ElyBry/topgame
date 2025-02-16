import {Board} from "../Board";
import {Figure} from "../Figure";

export class Rook extends Figure {
  private hasMoved = false;

  constructor(color: string, x: number, y: number, cellSize: number) {
    super(color, x, y, cellSize, `figuresImages/${color === 'black' ? 'B' : ''}Rook.svg`);
  }
  isValidMove(x: number, y: number, board: Board): boolean {
    return (this.x === x || this.y === y) ? board.isPathClear(this.x, this.y, x,y) : false; // Вертикаль и горизонталь
  }

  move(x: number, y: number, board: Board) {
    super.move(x, y, board);
    this.hasMoved = true;
  }

  getHasMoved() {
    return this.hasMoved;
  }
  getName() {
    return "R";
  }
}