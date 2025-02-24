import { Board } from "../Board";
import { King } from "./King";

describe('King class', () => {
  let board: Board;
  let king: King;

  beforeEach(() => {
    board = {
      getFigure: jest.fn(),
      getOpponentFigures: jest.fn().mockReturnValue([]),
      isKingInCheck: jest.fn(),
      isUnderAttack: jest.fn(),
      figureShah: null,
      clearFigure: jest.fn(),
      setFigure: jest.fn(),
      checkShahAndCheckmate: jest.fn()
    } as unknown as Board;

    king = new King('white', 4, 4, 1);
  });

  test('should return true for valid move', () => {
    const result = king.isValidMove(5, 5, board);
    expect(result).toBe(true);
  });

  test('should return false for invalid move', () => {
    const result = king.isValidMove(6, 6, board);
    expect(result).toBe(false);
  });

  test('should update hasMoved after move', () => {
    king.move(5, 5, board);
    expect(king['hasMoved']).toBe(true);
  });
});
