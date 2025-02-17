import {Rook} from "./figures/Rook";
import {Knight} from "./figures/Knight";
import {Figure} from "./Figure";
import {Bishop} from "./figures/Bishop";
import {Queen} from "./figures/Queen";
import {King} from "./figures/King";
import {Pawn} from "./figures/Pawn";
import {Sound} from "./Sound";
import {store} from "../store/config/store"

export class Board {
  private cells: (Figure | null)[][];
  private width: number;
  private height: number;
  private cellSize: number;
  private capturedFigures: Figure[] = [];
  private sounds: Sound;
  private storeSettings = store.getState().gameSlice.settings;
  private player_1_color = this.storeSettings.color;
  private player_2_color = this.storeSettings.opponentColor

  constructor(width: number, height: number, cellSize: number, sounds: Sound) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.cells = Array.from({ length: height }, () => Array.from({ length: width }, () => null));
    this.sounds = sounds;
  }

  init() {
    this.cells[0][0] = new Rook(this.player_2_color, 0, 0, this.cellSize);
    this.cells[0][1] = new Knight(this.player_2_color, 0, 1, this.cellSize);
    this.cells[0][2] = new Bishop(this.player_2_color, 0, 2, this.cellSize);
    this.cells[0][3] = new Queen(this.player_2_color, 0, 3, this.cellSize);
    this.cells[0][4] = new King(this.player_2_color, 0, 4, this.cellSize);
    this.cells[0][5] = new Bishop(this.player_2_color, 0, 5, this.cellSize);
    this.cells[0][6] = new Knight(this.player_2_color, 0, 6, this.cellSize);
    this.cells[0][7] = new Rook(this.player_2_color, 0, 7, this.cellSize);

    for (let i = 0; i < 8; i++) {
      this.cells[1][i] = new Pawn(this.player_2_color, 1, i, this.cellSize);
    }

    this.cells[7][0] = new Rook(this.player_1_color, 7, 0, this.cellSize);
    this.cells[7][1] = new Knight(this.player_1_color, 7, 1, this.cellSize);
    this.cells[7][2] = new Bishop(this.player_1_color, 7, 2, this.cellSize);
    this.cells[7][3] = new Queen(this.player_1_color, 7, 3, this.cellSize);
    this.cells[7][4] = new King(this.player_1_color, 7, 4, this.cellSize);
    this.cells[7][5] = new Bishop(this.player_1_color, 7, 5, this.cellSize);
    this.cells[7][6] = new Knight(this.player_1_color, 7, 6, this.cellSize);
    this.cells[7][7] = new Rook(this.player_1_color, 7, 7, this.cellSize);

    for (let i = 0; i < 8; i++) {
      this.cells[6][i] = new Pawn(this.player_1_color, 6, i, this.cellSize);
    }
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

  updateSize(width: number, height: number, cellSize: number) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
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
    const target = this.getFigure(x,y);
    if (target && target !== figure) {
      this.capturedFigures.push(target);
      this.sounds.playCaptureSound();
    }
    this.sounds.playMoveSound();
    this.cells[y][x] = figure;
  }

  clearFigure(x: number, y: number) {
    this.cells[y][x] = null;
  }

  getCapturedFigures() {
    return this.capturedFigures;
  }

  moveFigure(x: number, y: number, figure: Figure) {
    if (figure?.isValidMove(x,y, this)) {
      figure?.move(x, y, this);
    }
  }

  isValidMove(figure: Figure, x: number, y: number): boolean {
    return figure.isValidMove(x, y, this);
  }

  isUnderAttack(x: number, y: number, color: string) {
    const player_2_color = color === 'white' ? 'black' : 'white';

    const opponentFigures = this.getFiguresByColor(player_2_color);
    for (const figure of opponentFigures) {
      if (figure.isValidMove(x, y, this)) {
        if (figure instanceof Knight) {
          return true;
        }
        return this.isPathClear(figure.x, figure.y, x, y);
      }
    }

    return false;
  }

  getFigures(): Figure[] {
    return this.cells.flat().filter(figure => figure !== null) as Figure[];
  }

  getFiguresByColor(color: string): Figure[] {
    return this.cells.flat().filter((figure: Figure | null) =>
    {
      return figure?.color === color;
    }) as Figure[];
  }

  resetBoard() {
    this.cells = Array.from({ length: this.height }, () => Array.from({ length: this.width }, () => null));
    this.init();
  }

  promotePawn(pawn: Figure, x: number, y: number) {
    const selectedPiece = this.showPromotionDialog();

    if (selectedPiece) {
      let newPiece: Figure;
      switch (selectedPiece) {
        case 'queen':
          newPiece = new Queen(pawn.color, y, x, this.cellSize);
          break;
        case 'rook':
          newPiece = new Rook(pawn.color, y, x, this.cellSize);
          break;
        case 'bishop':
          newPiece = new Bishop(pawn.color, y, x, this.cellSize);
          break;
        case 'knight':
          newPiece = new Knight(pawn.color, y, x, this.cellSize);
          break;
        default:
          newPiece = new Queen(pawn.color, y, x, this.cellSize);
      }

      this.setFigure(x, y, newPiece);
    }
  }

  isPathClear(startX: number, startY: number, endX: number, endY: number): boolean {
    const dx = endX - startX;
    const dy = endY - startY;
    const steps = Math.max(Math.abs(dx), Math.abs(dy));

    const stepX = dx === 0 ? 0 : dx / Math.abs(dx);
    const stepY = dy === 0 ? 0 : dy / Math.abs(dy);

    for (let i = 1; i < steps; i++) {
      const checkX = startX + i * stepX;
      const checkY = startY + i * stepY;

      if (this.getFigure(checkX, checkY) !== null) {
        return false;
      }
    }

    return true;
  }

  private showPromotionDialog() {
    const selectedPiece = window.prompt("Выберите фигуру (queen, rook, bishop, knight):", "queen");
    return selectedPiece?.toLowerCase() || null;
  }

  getAvailableMoves(figure: Figure): {x : number, y:number}[] {
    const availableMoves: {x : number, y:number}[] = [];

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (figure.isValidMove(x, y, this) && this.getFigure(x, y)?.color !== figure.color) {
          availableMoves.push({x, y});
        }
      }
    }

    return availableMoves;
  }
}