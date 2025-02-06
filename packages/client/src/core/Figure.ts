import {Board} from "./Board";

export abstract class Figure {
  color: string;
  x: number;
  y: number;
  cellSize = 5;
  image: HTMLImageElement;

  constructor(color: string, y: number, x: number, cellSize: number, imageSrc: string) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.cellSize = cellSize;
    this.image = new Image();
    this.image.src = imageSrc;
  }

  abstract isValidMove(x: number, y: number, board: Board): boolean;

  move(x: number, y: number, board: Board) {
    if (this.isValidMove(x, y, board)) {
      board.setFigure(this.x, this.y, null);
      this.x = x;
      this.y = y;
      board.setFigure(x, y, this);
    }
  }

  drawHighlight(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 2;

    ctx.strokeRect(
      this.x * this.cellSize,
      this.y * this.cellSize,
      this.cellSize,
      this.cellSize
    );
  }
  getPossibleMoves(board: Board) {}
  draw(ctx: CanvasRenderingContext2D, isSelected: boolean = false) {
    ctx.drawImage(this.image, this.x * this.cellSize, this.y * this.cellSize, this.cellSize, this.cellSize);

    if (isSelected) {
      this.drawHighlight(ctx);
    }
  }

  clone() {}
}