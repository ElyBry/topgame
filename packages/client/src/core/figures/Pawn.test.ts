import { Board } from "../Board";
import { Pawn } from "./Pawn";

describe('Pawn class', () => {
  let board: Board;
  let whitePawn: Pawn;
  let blackPawn: Pawn;

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

    whitePawn = new Pawn('white', 1, 1, 1);
    blackPawn = new Pawn('black', 6, 6, 1);
  });

  test('should return false for invalid move (white pawn)', () => {
    const result = whitePawn.isValidMove(2, 2, board);
    expect(result).toBe(false);
  });

  test('should return false for invalid move (black pawn)', () => {
    const result = blackPawn.isValidMove(5, 5, board);
    expect(result).toBe(false);
  });

  test('should correctly register double move for pawn', () => {
    whitePawn.move(1, 3, board);
    expect(whitePawn.didDoubleMove).toBe(true);
  });

  test('should return "p" for pawn name', () => {
    expect(whitePawn.getName()).toBe("p");
    expect(blackPawn.getName()).toBe("p");
  });
});
