import {Figure} from "./Figure";
import {Board} from "./Board";

export class Move {
  figure: Figure;
  startX: number;
  startY: number;
  endX: number;
  endY: number;

  constructor(figure: Figure, startX: number, startY: number, endX: number, endY: number) {
    this.figure = figure;
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
  }

  isLegalMove(board: Board): boolean {
    return this.figure.isValidMove(this.endX, this.endY, board);
  }

  execute(board: Board) {
    this.figure.move(this.endX, this.endY, board);
  }

  undo(board: Board) {
    this.figure.move(this.startX, this.startY, board);
  }

  getMoveNotation(): string {
    return `${String.fromCharCode(97 + this.startX)}${8 - this.startY}-${String.fromCharCode(97 + this.endX)}${8 - this.endY}`;
  }
}