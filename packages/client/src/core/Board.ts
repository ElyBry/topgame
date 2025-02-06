import {Rook} from "./figures/Rook";
import {Knight} from "./figures/Knight";
import {Figure} from "./Figure";
import {Bishop} from "./figures/Bishop";
import {Queen} from "./figures/Queen";
import {King} from "./figures/King";
import {Pawn} from "./figures/Pawn";

export class Board {
  private cells: (Figure | null)[][];
  private width: number;
  private height: number;
  private cellSize: number;

  constructor(width: number, height: number, cellSize: number) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.cells = Array.from({ length: height }, () => Array.from({ length: width }, () => null));
  }

  init() {
    // Инициализация начальной расстановки фигур
    this.cells[0][0] = new Rook('black', 0, 0, this.cellSize);
    this.cells[0][1] = new Knight('black', 0, 1, this.cellSize);
    this.cells[0][2] = new Bishop('black', 0, 2, this.cellSize);
    this.cells[0][3] = new Queen('black', 0, 3, this.cellSize);
    this.cells[0][4] = new King('black', 0, 4, this.cellSize);
    this.cells[0][5] = new Bishop('black', 0, 5, this.cellSize);
    this.cells[0][6] = new Knight('black', 0, 6, this.cellSize);
    this.cells[0][7] = new Rook('black', 0, 7, this.cellSize);

    for (let i = 0; i < 8; i++) {
      this.cells[1][i] = new Pawn('black', 1, i, this.cellSize);
    }

    // Белые фигуры
    this.cells[7][0] = new Rook('white', 7, 0, this.cellSize);
    this.cells[7][1] = new Knight('white', 7, 1, this.cellSize);
    this.cells[7][2] = new Bishop('white', 7, 2, this.cellSize);
    this.cells[7][3] = new Queen('white', 7, 3, this.cellSize);
    this.cells[7][4] = new King('white', 7, 4, this.cellSize);
    this.cells[7][5] = new Bishop('white', 7, 5, this.cellSize);
    this.cells[7][6] = new Knight('white', 7, 6, this.cellSize);
    this.cells[7][7] = new Rook('white', 7, 7, this.cellSize);

    for (let i = 0; i < 8; i++) {
      this.cells[6][i] = new Pawn('white', 6, i, this.cellSize);
    }
  }

  clone(): Board {
    const clonedCells = this.cells.map(row =>
      row.map(cell =>
        cell ? cell.clone() : null
      )
    );
    const clonedBoard = new Board(this.width, this.height, this.cellSize);
    clonedBoard.cells = clonedCells; // Копируем закопированные ячейки в новый экземпляр
    return clonedBoard;
  }

  isKingInCheck(color: string): boolean {
    const king = this.findKing(color);
    if (!king) {
      return false;
    }

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const figure = this.cells[y][x];
        if (figure && figure.color !== color && figure.isValidMove(king.x, king.y, this)) {
          return true;
        }
      }
    }

    return false;
  }

  findKing(color: string): Figure | null {
    const figures = this.getFigures();
    for (const figure of figures) {
      if (figure && figure instanceof King && figure.color === color) {
        return figure;
      }
    }
    return null;
  }

  getFigure(x: number, y: number): Figure | null {
    if (x > this.width || y > this.height) {
      return null;
    }

    return this.cells[y][x];
  }

  setFigure(x: number, y: number, figure: Figure | null) {
    this.cells[y][x] = figure;
  }

  moveFigure(x: number, y: number, figure: Figure) {
    if (figure?.isValidMove(x,y, this)) {
      figure?.move(x, y, this);
    }
  }

  isValidMove(figure: Figure, x: number, y: number): boolean {
    return figure.isValidMove(x, y, this);
  }

  getFigures(): Figure[] {
    return this.cells.flat().filter(figure => figure !== null) as Figure[];
  }

  resetBoard() {
    this.cells = Array.from({ length: this.height }, () => Array.from({ length: this.width }, () => null));
    this.init();
  }
}