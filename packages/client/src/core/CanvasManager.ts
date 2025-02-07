import {Board} from "./Board";
import {Figure} from "./Figure";
import {Pawn} from "./figures/Pawn";

export class CanvasManager {
  private ctx: CanvasRenderingContext2D;
  private cellSize: number;
  private width: number;
  private height: number;
  private white: string;
  private black: string;

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number, cellSize: number, colorWhiteHex: string, colorBlackHex: string) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.white = colorWhiteHex;
    this.black = colorBlackHex;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  animateFigureMovement(board: Board, figure: Figure, startX: number, startY: number, endX: number, endY: number, duration: number) {
    const startTime = performance.now();
    const fromX = startX * this.cellSize;
    const fromY = startY * this.cellSize;
    const toX = endX * this.cellSize;
    const toY = endY * this.cellSize;

    const animate = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      const currentX = fromX + progress * (toX - fromX);
      const currentY = fromY + progress * (toY - fromY);

      this.clear();
      this.drawBoard(board);
      this.drawFigures(board.getFigures(), null);

      figure.draw(this.ctx, true, currentX, currentY);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        figure.inAnim = false;
        figure.move(endX, endY, board);
      }
    };

    figure.inAnim = true;
    requestAnimationFrame(() => animate(duration));
  }

  drawBoard(board: Board) {
    const cellSize = this.cellSize;

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if ((row + col) % 2 === 0) {
          this.ctx.fillStyle = this.white;
        } else {
          this.ctx.fillStyle = this.black;
        }

        this.ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  }

  updateSize(width: number, height: number, cellSize: number) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
  }

  drawFigures(figures: Figure[], selectedFigure: Figure | null) {
    figures.forEach(figure => {
      const isSelected = selectedFigure === figure;
      if (figure.inAnim) {
        return;
      }
      figure.draw(this.ctx, isSelected);
    });
  }

  drawPossibleMoves(possibleMoves: {x: number, y: number}[]) {
    for (const move of possibleMoves) {
      this.ctx.fillRect(
        move.x * this.cellSize,
        move.y * this.cellSize,
        this.cellSize,
        this.cellSize
      )
    }
  }
}