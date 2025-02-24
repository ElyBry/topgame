import { Notation } from './Notation';
import { Move } from './Move';

describe('Notation', () => {
  let notation: Notation;
  let mockMove: Move;

  beforeEach(() => {
    notation = new Notation();
    mockMove = {
      getMoveNotation: jest.fn().mockReturnValue('a1-b2')
    } as unknown as Move;
  });

  test('should convert move to algebraic notation', () => {
    const result = notation.toAlgebraic(mockMove);
    expect(result).toBe('a1-b2');
  });

  test('should add move to history', () => {
    notation.addMove(mockMove);
    const history = notation.getHistory();
    expect(history).toContain(mockMove);
  });

  test('should validate correct notation', () => {
    const validNotation = 'a1-b2';
    const result = notation.validateNotation(validNotation);
    expect(result).toBe(true);
  });

  test('should invalidate incorrect notation', () => {
    const invalidNotation = 'a1-b9';
    const result = notation.validateNotation(invalidNotation);
    expect(result).toBe(false);
  });
});
