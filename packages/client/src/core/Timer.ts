export class Timer {
  private minutes: number;
  private seconds: number;
  private interval: number | NodeJS.Timeout | null = null;

  constructor(seconds: number) {
    this.minutes = Math.floor((seconds / 60) % 60);
    this.seconds = seconds % 60;
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
  addTime(timeToAdd: number): void {
    const totalSeconds = this.getTime() + timeToAdd;
    this.minutes = Math.floor(totalSeconds / 60);
    this.seconds = totalSeconds % 60;
  }
  stop() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
  getTime() {
    return this.minutes * 60 + this.seconds
  }
  getSeconds() {
    return this.seconds;
  }
  getMinutes() {
    return this.minutes;
  }
}