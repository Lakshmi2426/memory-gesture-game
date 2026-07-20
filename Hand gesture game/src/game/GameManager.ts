/**
 * GameManager skeleton.
 * Integrates sequence generation, scoring, lives, and timing.
 */
export class GameManager {
  private level: number = 1;
  private isGameOver: boolean = false;

  startNewGame(): void {
    this.level = 1;
    this.isGameOver = false;
  }

  nextLevel(): number {
    this.level += 1;
    return this.level;
  }

  getCurrentLevel(): number {
    return this.level;
  }

  getIsGameOver(): boolean {
    return this.isGameOver;
  }
}
export default GameManager;
