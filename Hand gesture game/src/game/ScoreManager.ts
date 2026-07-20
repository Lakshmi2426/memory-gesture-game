/**
 * ScoreManager skeleton.
 * Tracks score, bonus multipliers, and speed records.
 */
export class ScoreManager {
  private currentScore: number = 0;

  getScore(): number {
    return this.currentScore;
  }

  addPoints(points: number): void {
    this.currentScore += points;
  }

  reset(): void {
    this.currentScore = 0;
  }

  // Scoring rules from PRD: Level Complete (+10), Perfect (+5), Fast (+5)
  calculateLevelCompletionScore(isPerfect: boolean, isFast: boolean): number {
    let points = 10;
    if (isPerfect) points += 5;
    if (isFast) points += 5;
    return points;
  }
}
export default ScoreManager;
