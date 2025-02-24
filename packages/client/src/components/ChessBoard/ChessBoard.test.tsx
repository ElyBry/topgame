import { act } from 'react';
import { render } from '@testing-library/react';
import { GameEngine } from '../../core/GameEngine';
import { SettingsClassic } from '../../core/SettingsClassic';

jest.mock('../../store/hooks', () => ({
  useAppSelector: jest.fn().mockReturnValue({
    settings: { 
      color: 'WHITE', 
      time: 5, 
      addTimeMove: 0 
    },
    winner: null
  })
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn().mockReturnValue(jest.fn())
}));

jest.mock('../../core/GameEngine');
jest.mock('../../core/SettingsClassic');
jest.mock('../../core/Sound');

document.getElementById = jest.fn().mockReturnValue({
  getContext: jest.fn().mockReturnValue({})
});

describe('ChessBoard Component', () => {
  const mockGameEngine = {
    start: jest.fn()
  };

  beforeEach(() => {
    (GameEngine as jest.Mock).mockImplementation(() => mockGameEngine);
    jest.clearAllMocks();
  });

  test('initializes and starts game engine', async () => {
    const ChessBoard = require('./ChessBoard').default;

    await act(async () => {
      render(<ChessBoard />);
    });

    expect(document.getElementById).toHaveBeenCalledWith('chessCanvas');
    expect(SettingsClassic).toHaveBeenCalled();
    expect(GameEngine).toHaveBeenCalled();
    expect(mockGameEngine.start).toHaveBeenCalled();
  });
});
