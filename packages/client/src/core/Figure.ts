import {Board} from "./Board";

export abstract class Figure {
  color: string;
  x: number;
  y: number;
  cellSize = 5;
  image: HTMLImageElement;
  inAnim = false;

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
    board.clearFigure(this.x, this.y);
    this.x = x;
    this.y = y;
    board.setFigure(x, y, this);
    board.checkShahAndCheckmate(this.color);
  }

  checkShah(x: number, y: number, board: Board): boolean {
    const color = this.color;
    let shahAndKing : { figureShah: Figure, figureKing: Figure } | boolean;
    const oldFigure = board.cells[y][x] || null;

    board.clearFigure(this.x, this.y);
    board.cells[y][x] = this;
    shahAndKing = board.isKingInCheck(color);
    board.cells[y][x] = oldFigure;
    board.cells[this.y][this.x] = this;

    if (typeof shahAndKing !== 'boolean') {
      const figureShahX = shahAndKing.figureShah.x;
      const figureShahY = shahAndKing.figureShah.y;
      const figureKingX = shahAndKing.figureKing.x;
      const figureKingY = shahAndKing.figureKing.y;

      // По горизонтали
      const isHorizon = (figureShahX === figureKingX && this.x === x && x === figureShahX); // На одной линии по горизонтали
      const isKingBetweenAttackHorizon = (this.y > figureShahY && y < this.y); // Если фигура защищающая короля находится между нападающей фигурой и королём
      const isKingNotBetweenAttackHorizon = (this.y < figureShahY && y > this.y) && y === figureShahY; // Если фигура защищающая короля находится не между нападающей фигурой и королём

      // То же самое по вертикали
      const isVertical = (figureShahY === figureKingY && this.y === y && y === figureShahY);
      const isKingBetweenAttackVertical = (this.x > figureShahX && x < this.x);
      const isKingNotBetweenAttackVertical = (this.x < figureShahX && x > this.x) && x === figureShahX;
      const diag =
        ((figureKingX < figureShahX && x > figureKingX && x <= figureShahX) ||
        (figureKingX > figureShahX && x < figureKingX && x >= figureShahX)) &&
        ((figureKingY < figureShahY && y > figureKingY && y <= figureShahY) ||
        (figureKingY > figureShahY && y < figureKingY && y >= figureShahY));

      if ((Math.abs(this.x - this.y) === Math.abs(x - y) && (Math.abs(this.x - x) === Math.abs(this.y - y)) && diag) || // По диагонали
          (isHorizon && (isKingBetweenAttackHorizon || isKingNotBetweenAttackHorizon)) ||
          (isVertical && (isKingBetweenAttackVertical || isKingNotBetweenAttackVertical))) {
        return true;
      }

      return false;
    }

    return true;
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
  draw(ctx: CanvasRenderingContext2D, isSelected = false, posX?: number, posY?: number) {
    const x = posX !== undefined ? posX : this.x * this.cellSize;
    const y = posY !== undefined ? posY : this.y * this.cellSize;

    ctx.drawImage(this.image, x, y, this.cellSize, this.cellSize);

    if (isSelected) {
      this.drawHighlight(ctx);
    }
  }
  getName() {}
  clone() {}
}