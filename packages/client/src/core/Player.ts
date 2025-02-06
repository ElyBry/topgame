import {Board} from "./Board";

export class Player {
  name: string;
  color: string;
  isTurn: boolean;

  constructor(name: string, color: string) {
    this.name = name;
    this.color = color;
    this.isTurn = color === 'white'; // Белые ходят первые
  }

  makeMove(startX: number, startY: number, endX: number, endY: number, board: Board): boolean {
    const figure = board.getFigure(startX, startY);
    if (figure && figure.color === this.color && figure.isValidMove(endX, endY, board)) {
      figure.move(endX, endY, board);
      return true;
    }
    return false;
  }

  endTurn(): void {
    this.isTurn = false;
  }
}