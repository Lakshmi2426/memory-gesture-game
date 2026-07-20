/**
 * CameraFeed Manager
 * Responsible for requesting webcam access and managing stream lifecycle.
 */
export class CameraFeed {
  private stream: MediaStream | null = null;

  async start(videoElement?: HTMLVideoElement | null): Promise<MediaStream> {
    if (this.stream) {
      this.stop();
    }

    this.stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 640 },
        height: { ideal: 480 },
        facingMode: 'user',
        frameRate: { ideal: 30 }
      },
      audio: false
    });

    if (videoElement) {
      videoElement.srcObject = this.stream;
      await videoElement.play().catch(() => {});
    }

    return this.stream;
  }

  stop(): void {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
  }

  getStream(): MediaStream | null {
    return this.stream;
  }
}
export default CameraFeed;
