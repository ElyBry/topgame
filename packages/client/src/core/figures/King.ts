import {Board} from "../Board";
import {Figure} from "../Figure";
import {Rook} from "./Rook";
import { Pawn } from './Pawn'

export class King extends Figure {
  private hasMoved: boolean = false;

  constructor(color: string, x: number, y: number, cellSize: number) {
    super(color, x, y, cellSize, `figuresImages/${color === 'black' ? 'B' : ''}King.svg`);
  }

  isPawnZone(pawn: Figure, x: number, y: number) {
    const direction = this.color === 'white' ? -1 : 1;

    return pawn instanceof Pawn && pawn.y - direction === y && (pawn.x + 1 === x || pawn.x - 1 === x)
  }

  isValidMove(x: number, y: number, board: Board): boolean {
    const dx = Math.abs(x - this.x);
    const dy = Math.abs(y - this.y);

    if (dx <= 1 && dy <= 1) {
      const originalX = this.x;
      const originalY = this.y;
      this.x = x;
      this.y = y;

      const isUnderAttack = board.isUnderAttack(x, y, this.color);

      this.x = originalX;
      this.y = originalY;

      return !isUnderAttack;
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