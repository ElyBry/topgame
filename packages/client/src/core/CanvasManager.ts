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

  drawFigures(figures: Figure[], selectedFigure: Figure | null, board: Board) {
    figures.forEach(figure => {
      const isSelected = selectedFigure === figure;
      figure.draw(this.ctx, isSelected);
      if (selectedFigure !== null) {
        if (selectedFigure.constructor.name === 'Pawn'){
          const pawn = selectedFigure
          this.drawPossibleMoves(selectedFigure.getPossibleMoves(board));
        }
      }
    });
  }

  drawPossibleMoves(possibleMoves) {
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