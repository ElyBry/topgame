import { Move } from './Move';
import { Figure } from './Figure';
import { Board } from './Board';
import { Sound } from './Sound';

class TestFigure extends Figure {
  constructor(color: string, y: number, x: number, cellSize: number, imageSrc: string) {
    super(color, y, x, cellSize, imageSrc);
  }
  
  isValidMove(endX: number, endY: number, board: Board): boolean {
    return true;
  }
  
  move(endX: number, endY: number, board: Board): void {
  }
}

describe('Move class', () => {
  let board: Board;
  let figure: Figure;
  let move: Move;

  beforeEach(() => {
    const sound = new Sound();
    board = new Board(8, 8, 1, sound);
    figure = new TestFigure('white', 0, 0, 1, 'image.png');
    move = new Move(figure, 0, 0, 1, 1);
  });

  test('isLegalMove should return true for a valid move', () => {
    jest.spyOn(figure, 'isValidMove').mockReturnValue(true);

    const result = move.isLegalMove(board);

    expect(result).toBe(true);
  });

  test('isLegalMove should return false for an invalid move', () => {
    jest.spyOn(figure, 'isValidMove').mockReturnValue(false);

    const result = move.isLegalMove(board);

    expect(result).toBe(false);
  });

  test('execute should call figure.move with correct parameters', () => {
    const moveSpy = jest.spyOn(figure, 'move');

    move.execute(board);

    expect(moveSpy).toHaveBeenCalledWith(1, 1, board);
  });

  test('undo should call figure.move with start position', () => {
    const moveSpy = jest.spyOn(figure, 'move');

    move.undo(board);

    expect(moveSpy).toHaveBeenCalledWith(0, 0, board);
  });

  test('getMoveNotation should return correct notation', () => {
    const notation = move.getMoveNotation();

    expect(notation).toBe('a8-b7');
  });
});
