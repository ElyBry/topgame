import { Rook } from './Rook';
import { Board } from '../Board';
import { Sound } from "../Sound";

jest.mock('../Board');

describe('Rook', () => {
  let board: Board;
  let whiteRook: Rook;

  beforeEach(() => {
    // Создаем доску
    board = new Board(8, 8, 50, {} as Sound);

    // Инициализация клеток доски
    board.cells = Array.from({ length: 8 }, () => Array(8).fill(null));

    // Создаем ладью
    whiteRook = new Rook('white', 3, 3, 50);

    // Мокаем isPathClear, чтобы всегда возвращал true
    jest.spyOn(board, 'isPathClear').mockReturnValue(true);

    // Мокаем checkShah на экземпляре whiteRook (так же, как в примере с Queen)
    jest.spyOn(whiteRook, 'checkShah').mockReturnValue(true);  // Заглушка для checkShah
  });

  it('should allow valid horizontal movement', () => {
    expect(whiteRook.isValidMove(3, 6, board)).toBe(true); // Горизонтально вправо
    expect(whiteRook.isValidMove(3, 0, board)).toBe(true); // Горизонтально влево
  });

  it('should allow valid vertical movement', () => {
    expect(whiteRook.isValidMove(7, 3, board)).toBe(true); // Вверх
    expect(whiteRook.isValidMove(0, 3, board)).toBe(true); // Вниз
  });

  it('should not allow diagonal movement', () => {
    expect(whiteRook.isValidMove(5, 5, board)).toBe(false); // Нельзя двигаться по диагонали
  });

  it('should not allow movement to same position', () => {
    expect(whiteRook.isValidMove(3, 3, board)).toBe(false); // Нельзя оставаться на месте
  });

  it('should update hasMoved flag', () => {
    expect(whiteRook.getHasMoved()).toBe(false); // До движения

    whiteRook.move(3, 5, board); // Совершаем движение

    expect(whiteRook.getHasMoved()).toBe(true); // Флаг обновился
  });

  it('should return correct piece name', () => {
    expect(whiteRook.getName()).toBe('R'); // Проверяем имя
  });
});
