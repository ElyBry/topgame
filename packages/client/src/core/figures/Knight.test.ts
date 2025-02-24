import { Board } from '../Board';
import { Knight } from './Knight';

jest.mock('../Sound', () => {
  return jest.fn().mockImplementation(() => {
    return {
      playMoveSound: jest.fn(),
    };
  });
});

describe('Knight class', () => {
  let board: Board;

  beforeEach(() => {
    const Sound = require('../Sound');
    
    board = new Board(8, 8, 100, new Sound());
    board.init();
  });

  test('Knight should move in an "L" shape (valid move)', () => {
    const knight = new Knight('white', 4, 4, 100);
    board.setFigure(4, 4, knight);

    const isValidMove = knight.isValidMove(6, 5, board);
    expect(isValidMove).toBe(true);
  });

  test('Knight should not move in a straight line (invalid move)', () => {
    const knight = new Knight('white', 4, 4, 100);
    board.setFigure(4, 4, knight);

    const isValidMove = knight.isValidMove(4, 6, board);
    expect(isValidMove).toBe(false);
  });

  test('Knight should not move to a square that would put the king in check', () => {
    const knight = new Knight('white', 4, 4, 100);
    const king = new Knight('black', 5, 5, 100);
    board.setFigure(4, 4, knight);
    board.setFigure(5, 5, king);

    const isValidMove = knight.isValidMove(6, 5, board);
    expect(isValidMove).toBe(false);
  });

  test('Knight should return the correct name', () => {
    const knight = new Knight('white', 4, 4, 100);
    expect(knight.getName()).toBe("N");
  });
});
