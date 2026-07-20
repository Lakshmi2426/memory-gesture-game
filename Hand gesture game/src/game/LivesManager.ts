/**
 * LivesManager skeleton.
 * Manages player health and retry status.
 */
export class LivesManager {
  private currentLives: number = 3;
  private maxLives: number = 3;

  getLives(): number {
    return this.currentLives;
  }

  loseLife(): number {
    if (this.currentLives > 0) {
      this.currentLives -= 1;
    }
    return this.currentLives;
  }

  reset(): void {
    this.currentLives = this.maxLives;
  }

  isDead(): boolean {
    return this.currentLives <= 0;
  }
}
export default LivesManager;
