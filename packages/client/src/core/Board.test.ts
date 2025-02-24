import { Board } from './Board';
import { Sound } from './Sound';
import { Rook } from './figures/Rook';
import { Pawn } from './figures/Pawn';

describe('Board', () => {
  let board: Board;
  let sounds: Sound;

  beforeEach(() => {
    sounds = { playMoveSound: jest.fn(), playCaptureSound: jest.fn() } as unknown as Sound;
    board = new Board(8, 8, 100, sounds);
    board.init();
  });

  it('should initialize board with pieces in correct position', () => {
    expect(board.getFigure(0, 0)).toBeInstanceOf(Rook);
    expect(board.getFigure(1, 1)).toBeInstanceOf(Pawn);
    expect(board.getFigure(7, 7)).toBeInstanceOf(Rook);
  });

  it('should detect check', () => {
    const isCheck = board.isKingInCheck('white');
    expect(isCheck).toBeFalsy();
  });
});
