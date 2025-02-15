import {Move} from "./Move";

export class Notation {
  private history: Move[] = [];

  toAlgebraic(move: Move): string {
    return move.getMoveNotation();
  }

  getHistory(): Move[] {
    return this.history;
  }

  addMove(move: Move) {
    this.history.push(move);
  }

  validateNotation(notation: string): boolean {
    // Проверка корректности нотации
    return /^[a-h][1-8]-[a-h][1-8]$/.test(notation);
  }
}