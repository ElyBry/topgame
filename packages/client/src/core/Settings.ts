export abstract class Settings {
  protected ctx: CanvasRenderingContext2D;
  protected debug: boolean = false;
  protected width: number = 8;
  protected height: number = 8;
  protected gameMode: string = "local";
  protected type: string = "classic";
  protected withTime: boolean = false;
  protected minutesPerParty: number = 10;
  protected countSecondsPerMove: number = 5;

  protected start: () => void = () => {};
  protected stop: () => void = () => {};
  protected gameLoop: () => void = () => {};
  protected onGameOver: () => void = () => {};

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  getContext(): CanvasRenderingContext2D {
    return this.ctx;
  }

  isDebugMode(): boolean {
    return this.debug;
  }

  getBoardSize(): { width: number; height: number } {
    return { width: this.width, height: this.height };
  }

  getGameMode(): string {
    return this.gameMode;
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  getType(): string {
    return this.type;
  }

  isWithTime(): boolean {
    return this.withTime;
  }

  getMinutesPerParty(): number {
    return this.minutesPerParty;
  }

  getCountSecondsPerMove(): number {
    return this.countSecondsPerMove;
  }

  setDebugMode(debug: boolean): void {
    this.debug = debug;
  }

  setGameMode(gameMode: string): void {
    this.gameMode = gameMode;
  }

  setType(type: string): void {
    this.type = type;
  }

  setWithTime(withTime: boolean): void {
    this.withTime = withTime;
  }

  setMinutesPerParty(minutes: number): void {
    this.minutesPerParty = minutes;
  }

  setCountSecondsPerMove(seconds: number): void {
    this.countSecondsPerMove = seconds;
  }

  setStartCallback(callback: () => void): void {
    this.start = callback;
  }

  setStopCallback(callback: () => void): void {
    this.stop = callback;
  }

  setGameLoopCallback(callback: () => void): void {
    this.gameLoop = callback;
  }

  setOnGameOverCallback(callback: () => void): void {
    this.onGameOver = callback;
  }

  abstract initialize(): void;
  abstract validateSettings(): boolean;
}