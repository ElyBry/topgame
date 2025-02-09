import {Settings} from "./Settings";

export class SettingsClassic extends Settings {
  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);
  }

  initialize(): void {
    this.width = 8;
    this.height = 8;
    this.type = "classic";
    this.withTime = true;
    this.minutesPerParty = 10;
    this.countSecondsPerMove = 5;
  }

  validateSettings(): boolean {
    if (this.width !== 8 || this.height !== 8) {
      console.error("Классические шахматы требуют доску 8x8.");
      return false;
    }
    if (this.minutesPerParty < 1 || this.minutesPerParty > 60) {
      console.error("Время на партию должно быть от 1 до 60 минут.");
      return false;
    }
    if (this.countSecondsPerMove < 0 || this.countSecondsPerMove > 120) {
      console.error("Добавляемые секунды на ход должны быть от 0 до 120.");
      return false;
    }
    return true;
  }
}