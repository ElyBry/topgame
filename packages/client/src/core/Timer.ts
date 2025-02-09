export class Timer {
  private minutes: number;
  private seconds: number;
  private interval: number | null = null;

  constructor(minutes: number, secondsPerMove: number) {
    this.minutes = minutes;
    this.seconds = secondsPerMove;
  }

  start() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  tick() {
    if (this.seconds === 0) {
      if (this.minutes === 0) {
        this.stop();
        return;
      }
      this.minutes--;
      this.seconds = 59;
    } else {
      this.seconds--;
    }
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}