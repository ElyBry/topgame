import { Sound } from './Sound';

class AudioMock {
  public volume: number = 1;
  public src: string = '';

  constructor(src: string) {
    this.src = src;
  }

  play() {
    return Promise.resolve();
  }
}

global.Audio = AudioMock as any;

describe('Sound Class', () => {
  let sound: Sound;
  let playSpy: jest.SpyInstance;

  beforeEach(() => {
    sound = new Sound();
    playSpy = jest.spyOn(AudioMock.prototype, 'play');
  });

  afterEach(() => {
    playSpy.mockRestore();
  });

  describe('Sound initialization', () => {
    it('should initialize with correct audio files', () => {
      const sound = new Sound();
      expect(sound).toBeInstanceOf(Sound);
    });
  });

  describe('Playing sounds', () => {
    it('should play move sound', () => {
      sound.playMoveSound();
      expect(playSpy).toHaveBeenCalledTimes(1);
    });

    it('should play capture sound', () => {
      sound.playCaptureSound();
      expect(playSpy).toHaveBeenCalledTimes(1);
    });

    it('should play win sound', () => {
      sound.playWinSound();
      expect(playSpy).toHaveBeenCalledTimes(1);
    });

    it('should play lose sound', () => {
      sound.playLoseSound();
      expect(playSpy).toHaveBeenCalledTimes(1);
    });

    it('should play check sound', () => {
      sound.playCheckSound();
      expect(playSpy).toHaveBeenCalledTimes(1);
    });

    it('should play cancel move sound', () => {
      sound.playCancelMoveSound();
      expect(playSpy).toHaveBeenCalledTimes(1);
    });

    it('should play clock tick sound', () => {
      sound.playClockTickSound();
      expect(playSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Volume controls', () => {
    it('should mute all sounds', () => {
      sound.mute();
      const instance = sound as any;
      expect(instance.moveSound.volume).toBe(0);
      expect(instance.winSound.volume).toBe(0);
      expect(instance.checkSound.volume).toBe(0);
    });

    it('should set volume for all sounds', () => {
      const volumeLevel = 0.5;
      sound.setVolume(volumeLevel);
      const instance = sound as any;
      expect(instance.moveSound.volume).toBe(volumeLevel);
      expect(instance.loseSound.volume).toBe(volumeLevel);
      expect(instance.checkSound.volume).toBe(volumeLevel);
    });
  });
});
