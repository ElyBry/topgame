import {Move} from "./Move";

export class Notation {
  private history: string[] = [];

  toAlgebraic(move: Move): string {
    return move.getMoveNotation();
  }

  fromAlgebraic(notation: string): Move | null {
    // Преобразует строку нотации обратно в объект Move
    // Например, "e2-e4" -> Move
    return null;
  }

  getHistory(): string[] {
    return this.history;
  }

  addMove(move: Move) {
    this.history.push(this.toAlgebraic(move));
  }

  validateNotation(notation: string): boolean {
    // Проверка корректности нотации
    return /^[a-h][1-8]-[a-h][1-8]$/.test(notation);
  }
}