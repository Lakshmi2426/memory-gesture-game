/**
 * SequenceManager skeleton.
 * Generates sequences and keeps track of expected steps.
 */
export class SequenceManager {
  private sequence: string[] = [];

  getSequence(): string[] {
    return this.sequence;
  }

  generateNext(gesturesList: string[]): string {
    const randomGesture = gesturesList[Math.floor(Math.random() * gesturesList.length)];
    this.sequence.push(randomGesture);
    return randomGesture;
  }

  clear(): void {
    this.sequence = [];
  }
}
export default SequenceManager;
