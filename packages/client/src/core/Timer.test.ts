import { Timer } from './Timer';

describe('Timer', () => {
  let timer: Timer;

  beforeEach(() => {
    timer = new Timer(1);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('should initialize with correct time', () => {
    expect(timer.getMinutes()).toBe(0);
    expect(timer.getSeconds()).toBe(1);
  });

  test('should decrease time by 1 second after tick', () => {
    timer.tick();
    expect(timer.getMinutes()).toBe(0);
    expect(timer.getSeconds()).toBe(0);
  });

  test('should stop timer when time reaches 0', () => {
    const zeroTimer = new Timer(0);
    zeroTimer.start();
    jest.useFakeTimers();
    
    jest.advanceTimersByTime(1000);
    
    expect(zeroTimer.getMinutes()).toBe(0);
    expect(zeroTimer.getSeconds()).toBe(0);
    
    jest.useRealTimers();
  });
});

