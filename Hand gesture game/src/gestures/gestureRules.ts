/**
 * Gesture Recognition constants and matching thresholds.
 */
export const GESTURE_NAMES = {
  PALM: 'Open Palm',
  POINT_UP: 'Point Up',
  THUMBS_UP: 'Thumbs Up',
  PEACE: 'Peace',
  OK: 'OK',
  UNKNOWN: 'Unknown'
};

export const GESTURE_EMOJIS = {
  [GESTURE_NAMES.PALM]: '✋',
  [GESTURE_NAMES.POINT_UP]: '☝️',
  [GESTURE_NAMES.THUMBS_UP]: '👍',
  [GESTURE_NAMES.PEACE]: '✌️',
  [GESTURE_NAMES.OK]: '👌',
  [GESTURE_NAMES.UNKNOWN]: '❓'
};

// Stabilizer thresholds
export const RECOGNITION_CONFIG = {
  STABILITY_FRAMES_MIN: 5,     // Gesture must appear for 5-8 frames
  STABILITY_FRAMES_MAX: 8,
  COOLDOWN_MS: 700,           // Cooldown before next recognition
  MIN_DETECTION_CONFIDENCE: 0.7
};
