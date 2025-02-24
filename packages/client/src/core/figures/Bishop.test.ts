import { Board } from '../Board';
import { Bishop } from './Bishop';

jest.mock('../Sound', () => {
  return jest.fn().mockImplementation(() => {
    return {
      playMoveSound: jest.fn(),
    };
  });
});

describe('Bishop class', () => {
  let board: Board;

  beforeEach(() => {
    const Sound = require('../Sound');
    
    board = new Board(8, 8, 100, new Sound());
    board.init();
  });

  test('Bishop should move diagonally', () => {
    const bishop = new Bishop('white', 4, 4, 100);
    board.setFigure(4, 4, bishop);

    const isValidMove = bishop.isValidMove(6, 6, board);
    expect(isValidMove).toBe(true);
  });

  test('Bishop should not move horizontally', () => {
    const bishop = new Bishop('white', 4, 4, 100);
    board.setFigure(4, 4, bishop);

    const isValidMove = bishop.isValidMove(4, 6, board);
    expect(isValidMove).toBe(false);
  });
});
