/**
 * TimerManager skeleton.
 * Tracks remaining response seconds and sets limits.
 */
export class TimerManager {
  private durationSeconds: number = 10;
  private remainingSeconds: number = 10;

  start(seconds: number): void {
    this.durationSeconds = seconds;
    this.remainingSeconds = seconds;
  }

  tick(): number {
    if (this.remainingSeconds > 0) {
      this.remainingSeconds -= 1;
    }
    return this.remainingSeconds;
  }

  getRemainingSeconds(): number {
    return this.remainingSeconds;
  }

  getDurationSeconds(): number {
    return this.durationSeconds;
  }

  isExpired(): boolean {
    return this.remainingSeconds <= 0;
  }
}
export default TimerManager;
