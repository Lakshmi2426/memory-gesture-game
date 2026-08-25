import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';

export class HandTracker {
  private landmarker: HandLandmarker | null = null;
  private initializingPromise: Promise<void> | null = null;

  async initialize(onReady: () => void): Promise<void> {
    if (this.landmarker) {
      onReady();
      return;
    }

    if (this.initializingPromise) {
      await this.initializingPromise;
      onReady();
      return;
    }

    this.initializingPromise = (async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
        );
        
        this.landmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
            delegate: 'GPU'
          },
          runningMode: 'VIDEO',
          numHands: 1
        });
      } catch (error) {
        console.error('Failed to initialize HandLandmarker:', error);
        this.initializingPromise = null;
        throw error;
      }
    })();

    await this.initializingPromise;
    onReady();
  }

  detect(videoElement: HTMLVideoElement, timestamp: number) {
    if (!this.landmarker) return null;
    return this.landmarker.detectForVideo(videoElement, timestamp);
  }
}

// Export a shared singleton instance
export const handTracker = new HandTracker();
export default handTracker;
