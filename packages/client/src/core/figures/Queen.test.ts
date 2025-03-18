import { Queen } from './Queen';
import { Board } from '../Board';
import { Sound } from '../Sound';

jest.mock('../Board');

describe('Queen', () => {
  let board: Board;
  let whiteQueen: Queen;

  beforeEach(() => {
    board = new Board(8, 8, 50, {} as Sound);
    board.cells = Array.from({ length: 8 }, () => Array(8).fill(null));
    whiteQueen = new Queen('white', 3, 3, 50);

    jest.spyOn(board, 'isPathClear').mockReturnValue(true);

    jest.spyOn(whiteQueen, 'checkShah').mockReturnValue(true);
  });

  it('should allow queen to move horizontally', () => {
    const result = whiteQueen.isValidMove(3, 6, board);
    expect(result).toBe(true);
  });

  it('should allow queen to move vertically', () => {
    const result = whiteQueen.isValidMove(6, 3, board);
    expect(result).toBe(true);
  });

  it('should allow queen to move diagonally', () => {
    const result = whiteQueen.isValidMove(5, 5, board);
    expect(result).toBe(true);
  });

  it('should not allow queen to move if path is blocked', () => {
    jest.spyOn(board, 'isPathClear').mockReturnValue(false);
    const result = whiteQueen.isValidMove(6, 3, board);
    expect(result).toBe(false);
  });

  it('should not allow queen to move if it would result in shah', () => {
    jest.spyOn(whiteQueen, 'checkShah').mockReturnValue(false);
    const result = whiteQueen.isValidMove(6, 3, board);
    expect(result).toBe(false);
  });

  it('should return correct piece name', () => {
    const result = whiteQueen.getName();
    expect(result).toBe('Q');
  });
});
