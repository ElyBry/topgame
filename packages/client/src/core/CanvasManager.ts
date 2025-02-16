import {Board} from "./Board";
import {Figure} from "./Figure";
import {Sound} from "./Sound";

export class CanvasManager {
  private ctx: CanvasRenderingContext2D;
  private cellSize: number;
  private width: number;
  private height: number;
  private white: string;
  private black: string;
  private sounds: Sound;

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number, cellSize: number, colorWhiteHex: string, colorBlackHex: string, sounds: Sound) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.white = colorWhiteHex;
    this.black = colorBlackHex;
    this.sounds = sounds;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  animateFigureMovement(board: Board, figure: Figure, startX: number, startY: number, endX: number, endY: number,
                        duration: number, callBack?: (figure: Figure, board: Board) => void
  ) {
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
        if (callBack) callBack(figure, board);
        else figure.move(endX, endY, board);
      }
    };

    figure.inAnim = true;
    requestAnimationFrame(() => animate(duration));
  }

  animateTwoFiguresMovement(
    board: Board,
    figure1: Figure,
    startX1: number,
    startY1: number,
    endX1: number,
    endY1: number,
    figure2: Figure,
    startX2: number,
    startY2: number,
    endX2: number,
    endY2: number,
    duration: number,
    callBack?: (board: Board) => void
  ) {
    const startTime = performance.now();
    const fromX1 = startX1 * this.cellSize;
    const fromY1 = startY1 * this.cellSize;
    const toX1 = endX1 * this.cellSize;
    const toY1 = endY1 * this.cellSize;

    const fromX2 = startX2 * this.cellSize;
    const fromY2 = startY2 * this.cellSize;
    const toX2 = endX2 * this.cellSize;
    const toY2 = endY2 * this.cellSize;

    const animate = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      const currentX1 = fromX1 + progress * (toX1 - fromX1);
      const currentY1 = fromY1 + progress * (toY1 - fromY1);

      const currentX2 = fromX2 + progress * (toX2 - fromX2);
      const currentY2 = fromY2 + progress * (toY2 - fromY2);

      this.clear();
      this.drawBoard(board);
      this.drawFigures(board.getFigures(), null);

      figure1.draw(this.ctx, true, currentX1, currentY1);
      figure2.draw(this.ctx, true, currentX2, currentY2);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        figure1.inAnim = false;
        figure2.inAnim = false;
        if (callBack) callBack(board);
        figure1.move(endX1, endY1, board);
        figure2.move(endX2, endY2, board);
      }
    };

    figure1.inAnim = true;
    figure2.inAnim = true;
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

  drawFigures(figures: Figure[], selectedFigure: Figure | null, board?: Board) {
    figures.forEach(figure => {
      const isSelected = selectedFigure === figure;
      if (figure.inAnim) {
        return;
      }
      figure.draw(this.ctx, isSelected);
    });
    if (selectedFigure && !selectedFigure.inAnim && board) {
      const availableMoves = board.getAvailableMoves(selectedFigure);
      this.drawPossibleMoves(availableMoves);
    }
  }

  drawPossibleMoves(possibleMoves: {x: number, y: number}[], colorHex = "rgba(0, 255, 0, 0.3)") {
    this.ctx.save();
    this.ctx.fillStyle = colorHex;
    for (const move of possibleMoves) {
      this.ctx.fillRect(
        move.x * this.cellSize,
        move.y * this.cellSize,
        this.cellSize,
        this.cellSize
      )
    }
    this.ctx.restore();
  }
}