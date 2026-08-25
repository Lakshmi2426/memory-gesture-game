import { GESTURE_NAMES } from './gestureRules';

export interface Landmark {
  x: number;
  y: number;
  z: number;
}

const dist2D = (p1: Landmark, p2: Landmark): number => {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
};

/**
 * Robust gesture classifier using MediaPipe hand landmarks.
 * 
 * MediaPipe landmark indices:
 * 0  = wrist
 * 1  = thumb_cmc, 2 = thumb_mcp, 3 = thumb_ip, 4 = thumb_tip
 * 5  = index_mcp, 6 = index_pip, 7 = index_dip, 8 = index_tip
 * 9  = middle_mcp, 10 = middle_pip, 11 = middle_dip, 12 = middle_tip
 * 13 = ring_mcp, 14 = ring_pip, 15 = ring_dip, 16 = ring_tip
 * 17 = pinky_mcp, 18 = pinky_pip, 19 = pinky_dip, 20 = pinky_tip
 * 
 * Note: The video is mirrored (scale-x-[-1]) in the display, but
 * MediaPipe returns coordinates in the ORIGINAL (non-mirrored) frame.
 * So landmark X values are from the camera's perspective.
 */

export class GestureClassifier {
  private isFingerExtended(tip: Landmark, pip: Landmark, mcp: Landmark, wrist: Landmark, palmWidth: number): boolean {
    const tipFartherFromWrist = dist2D(tip, wrist) > dist2D(pip, wrist) + palmWidth * 0.03;
    const tipFartherFromMcp = dist2D(tip, mcp) > dist2D(pip, mcp) + palmWidth * 0.03;
    const tipAbovePip = tip.y < pip.y - palmWidth * 0.015;

    return (
  (tipFartherFromWrist && tipAbovePip) ||
  (tipFartherFromMcp && tipAbovePip)
);
  }

  private isThumbExtended(
    thumbTip: Landmark,
    thumbMcp: Landmark,
    wrist: Landmark,
    indexMcp: Landmark,
    pinkyMcp: Landmark,
  ): boolean {
    const palmWidth = dist2D(indexMcp, pinkyMcp) || dist2D(wrist, pinkyMcp) || 0.1;
    const thumbTipAbovePalm = thumbTip.y < wrist.y - palmWidth * 0.04;
    const thumbTipAwayFromBase = dist2D(thumbTip, thumbMcp) > palmWidth * 0.34;
    const thumbTipAwayFromPalm = dist2D(thumbTip, wrist) > palmWidth * 0.36;
    const thumbSpreading = dist2D(thumbTip, indexMcp) > palmWidth * 0.28;

    return (thumbTipAbovePalm && thumbTipAwayFromBase) || (thumbTipAwayFromPalm && thumbSpreading);
  }

  private isPointUp(
    indexTip: Landmark,
    indexPip: Landmark,
    indexMcp: Landmark,
    middleTip: Landmark,
    middlePip: Landmark,
    middleMcp: Landmark,
    ringTip: Landmark,
    ringPip: Landmark,
    ringMcp: Landmark,
    pinkyTip: Landmark,
    pinkyPip: Landmark,
    pinkyMcp: Landmark,
    wrist: Landmark,
    palmWidth: number,
  ): boolean {
    const indexUp = this.isFingerExtended(indexTip, indexPip, indexMcp, wrist, palmWidth);
    const middleDown = !this.isFingerExtended(middleTip, middlePip, middleMcp, wrist, palmWidth);
    const ringDown = !this.isFingerExtended(ringTip, ringPip, ringMcp, wrist, palmWidth);
    const pinkyDown = !this.isFingerExtended(pinkyTip, pinkyPip, pinkyMcp, wrist, palmWidth);

    const middleFolded = middleTip.y > middlePip.y;
const ringFolded = ringTip.y > ringPip.y;
const pinkyFolded = pinkyTip.y > pinkyPip.y;

return (
  indexUp &&
  middleDown &&
  ringDown &&
  pinkyDown &&
  middleFolded &&
  ringFolded &&
  pinkyFolded
);
  }

  classify(landmarks: Landmark[]): string {
    if (!landmarks || landmarks.length < 21) {
      return GESTURE_NAMES.UNKNOWN;
    }

    const wrist = landmarks[0];

    // Finger tip, pip, mcp landmarks
    const thumbTip = landmarks[4];
    const thumbMcp = landmarks[2];

    const indexTip = landmarks[8];
    const indexPip = landmarks[6];
    const indexMcp = landmarks[5];

    const middleTip = landmarks[12];
    const middlePip = landmarks[10];
    const middleMcp = landmarks[9];

    const ringTip = landmarks[16];
    const ringPip = landmarks[14];
    const ringMcp = landmarks[13];

    const pinkyTip = landmarks[20];
    const pinkyPip = landmarks[18];
    const pinkyMcp = landmarks[17];

    const palmWidth = dist2D(indexMcp, pinkyMcp) || dist2D(wrist, pinkyMcp) || 0.1;

    // Check finger extension using tip vs pip comparison
    const indexUp  = this.isFingerExtended(indexTip, indexPip, indexMcp, wrist, palmWidth);
    const middleUp = this.isFingerExtended(middleTip, middlePip, middleMcp, wrist, palmWidth);
    const ringUp   = this.isFingerExtended(ringTip, ringPip, ringMcp, wrist, palmWidth);
    const pinkyUp  = this.isFingerExtended(pinkyTip, pinkyPip, pinkyMcp, wrist, palmWidth);

    const indexDown  = !indexUp;
    const middleDown = !middleUp;
    const ringDown   = !ringUp;
    const pinkyDown  = !pinkyUp;

    const thumbExtended = this.isThumbExtended(thumbTip, thumbMcp, wrist, indexMcp, pinkyMcp);

    // Thumb-index tip distance for OK gesture (pinch)
    const thumbIndexDist = dist2D(thumbTip, indexTip);

    // Normalized thumb-index distance
    const thumbIndexDistNorm = thumbIndexDist / palmWidth;

    // -------------------------------------------------------
    // GESTURE RULES (order matters - specific first)
    // -------------------------------------------------------

    // 1. OK Gesture: Thumb tip and Index tip pinch together,
    //    other 3 fingers (middle, ring, pinky) are extended.
    if (thumbIndexDistNorm < 0.55 && middleUp && ringUp && pinkyUp) {
      return GESTURE_NAMES.OK;
    }

    // 2. Point Up: Only the index finger is extended.
    if (this.isPointUp(indexTip, indexPip, indexMcp, middleTip, middlePip, middleMcp, ringTip, ringPip, ringMcp, pinkyTip, pinkyPip, pinkyMcp, wrist, palmWidth)) {
      return GESTURE_NAMES.POINT_UP;
    }

    // 3. Thumbs Up: Only thumb extended upward, all 4 fingers curled.
    if (thumbExtended && indexDown && middleDown && ringDown && pinkyDown) {
      return GESTURE_NAMES.THUMBS_UP;
    }
const indexMiddleDist = dist2D(indexTip, middleTip) / palmWidth;
    // 4. Peace / Victory Sign: Index + Middle extended, Ring + Pinky closed.
    //    Thumb can be in any position.
    if (indexUp &&
  middleUp &&
  ringDown &&
  pinkyDown &&
  indexMiddleDist > 0.20) {
      return GESTURE_NAMES.PEACE;
    }

    // 5. Open Palm: All 4 main fingers extended (spread open hand).
    if (indexUp && middleUp && ringUp && pinkyUp) {
      return GESTURE_NAMES.PALM;
    }

    return GESTURE_NAMES.UNKNOWN;
  }
}

export default GestureClassifier;
