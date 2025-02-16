import {Board} from "../Board";
import {Figure} from "../Figure";
import {Rook} from "./Rook";

export class King extends Figure {
  private hasMoved: boolean = false;
  
  constructor(color: string, x: number, y: number, cellSize: number) {
    super(color, x, y, cellSize, `figuresImages/${color === 'black' ? 'B' : ''}King.svg`);
  }
  
  isValidMove(x: number, y: number, board: Board): boolean {
    const dx = Math.abs(x - this.x);
    const dy = Math.abs(y - this.y);
    if (dx <= 1 && dy <= 1 && !(board.getFigure(x,y) instanceof Rook)) {
      return true; // Одна клетка вокруг себя
    } 
    
    if (!this.hasMoved && y === this.y) {
      const rook = board.getFigure(x, y);
      if (rook instanceof Rook && !rook.getHasMoved()) {
        const step = x < this.x ? -1 : 1;
        for (let i = this.x; i !== rook.x; i += step) {
          if (i == this.x || i == rook.x) {
            continue;
          }
          if (board.getFigure(i, y) || board.isUnderAttack(i, y, this.color)) {
            return false;
          }
        }
        return true;
      }
    }
    return false;
  }
  
  move(x: number, y: number, board: Board) {
    super.move(x, y, board);
    this.hasMoved = true;
  }

  getName() {
    return "K";
  }
}