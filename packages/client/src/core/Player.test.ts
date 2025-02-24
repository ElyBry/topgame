import { Player } from './Player';
import { Board } from './Board';
import { Figure } from './Figure';
import { Sound } from './Sound';

jest.mock('./Sound');

describe('Player class', () => {
  let player: Player;
  let board: Board;
  let figure: Figure;
  let sound: Sound;

  beforeEach(() => {
    sound = new Sound();
    board = new Board(8, 8, 1, sound);
    player = new Player('John', 'white');

    figure = { 
      color: 'white', 
      isValidMove: jest.fn(() => true),
      x: 0,
      y: 0
    } as unknown as Figure;
    
    board.getFigure = jest.fn(() => figure);
  });

  test('makeMove should return true if the move is valid', () => {
    const result = player.makeMove(0, 0, 1, 1, board);
    expect(result).toBe(true);
    expect(board.getFigure).toHaveBeenCalledWith(0, 0);
  });

  test('endTurn should set isTurn to false', () => {
    player.endTurn();
    expect(player.isTurn).toBe(false);
  });
});
