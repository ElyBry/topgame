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

    if (dx <= 1 && dy <= 1 && (!(board.getFigure(x,y) instanceof Rook) ||
      (board.getFigure(x,y) instanceof Rook && board.getFigure(x,y)?.color !== this.color)))
    {
      const opponentFigures = board.getOpponentFigures(this.color);
      board.isKingInCheck(this.color);

      for (const opponentFigure of opponentFigures) {
        const opponentFigureX = opponentFigure.x;
        const opponentFigureY = opponentFigure.y;
        const isPawnAttack = this.isPawnZone(opponentFigure, x, y); // Если пешка соперника и король на её пути по диагонали из возможных ходов короля

        // Запрет потенциального хода королю, если в новой клетке ему угрожает фигура
        if (
          (!(opponentFigure instanceof Pawn) && (opponentFigure.isValidMove(x, y, board))) || // Если не пешка соперника, а король на пути возможных ходов остальных фигур соперника
          isPawnAttack
        ) {
          if (board.figureShah instanceof Figure) { // Если шах
            const figureShahX = board.figureShah.x;
            const figureShahY = board.figureShah.y;
            const dxFigureShah = Math.abs(x - figureShahX);
            const dyFigureShah = Math.abs(y - figureShahY);
            const isPawnProtected = this.isPawnZone(opponentFigure, figureShahX, figureShahY); // Если пешка соперника прикрывает другую фигуру соперника, которая делает шах

            const isAttackMore2Diag = (figureShahX + figureShahY !== x + y || (dxFigureShah >= 1 && dyFigureShah >= 1)); // Если король отдалён на 2 и более клетки от фигуры, которая поставила шах по диагонали
            const isAttackMore2HorizonAndVertical = (dxFigureShah > 1 && y === figureShahY) || (dyFigureShah > 1 && (x === figureShahX)); // Если король отдалён на 2 и более клетки от фигуры, которая поставила шах по горизонтали и вертикали
            const isAttackProtected = (figureShahX !== opponentFigureX || figureShahY !== opponentFigureY) &&
              (opponentFigure.isValidMove(figureShahX, figureShahY, board) || isPawnProtected); // Если фигура, которая поставила шах "прикрыта"

            if (isAttackMore2Diag || isAttackMore2HorizonAndVertical || isAttackProtected) {
              return false;
            }
          } else {
            return false;
          }
        } else {
          if (board.figureShah instanceof Figure) {
            const figureShahX = board.figureShah.x;
            const figureShahY = board.figureShah.y;
            const dxFigureShah = Math.abs(x - figureShahX);
            const dyFigureShah = Math.abs(y - figureShahY);

            const d1 = (figureShahX > this.x && figureShahY > this.y && x < this.x && y < this.y);
            const d2 = (figureShahX < this.x && figureShahY > this.y && x > this.x && y < this.y);
            const d3 = (figureShahX < this.x && figureShahY < this.y && x > this.x && y > this.y);
            const d4 = (figureShahX > this.x && figureShahY < this.y && x < this.x && y > this.y);

            // Запрет хода королю при шахе позади себя по оси атакующей фигуры
            if (((d1 || d2 || d3 || d4) && figureShahX - figureShahY === x - y) || // Проверка на единую диагональ. У атакующей фигуры разность осей должна быть равна разности осей у короля
              ((figureShahX === x) && dyFigureShah > 1 || ((figureShahY === y) && dxFigureShah > 1))) { // Если атакующая фигура ставит шах по горизонтали или вертикали
              return false;
            }
          }
        }
      }

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