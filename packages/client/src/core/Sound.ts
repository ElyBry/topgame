export class Sound {
  private moveSound: HTMLAudioElement;
  private winSound: HTMLAudioElement;
  private captureSound: HTMLAudioElement;
  private loseSound: HTMLAudioElement;
  private checkSound: HTMLAudioElement;
  dir = 'audio/';

  constructor() {
    this.moveSound = new Audio(this.dir + 'move.mp3'); // движение
    this.captureSound = new Audio(this.dir + 'capture.mp3'); // взятие фигуры
    this.winSound = new Audio(this.dir + 'win.mp3'); //  победа
    this.loseSound = new Audio(this.dir + 'lose.mp3'); // проигрыш
    this.checkSound = new Audio(this.dir + 'check.mp3'); // шах
  }

  playCaptureSound() {
    this.captureSound.play();
  }

  playMoveSound() {
    this.moveSound.play();
  }

  playWinSound() {
    this.winSound.play();
  }

  playLoseSound() {
    this.loseSound.play();
  }

  playCheckSound() {
    this.checkSound.play();
  }

  mute() {
    this.moveSound.volume = 0;
    this.winSound.volume = 0;
    this.checkSound.volume = 0;
  }

  setVolume(level: number) {
    this.moveSound.volume = level;
    this.loseSound.volume = level;
    this.checkSound.volume = level;
  }
}