export interface Point {
  x: number;
  y: number;
}

// MediaPipe hand joint connection pairs (0-20 landmarks)
const HAND_CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4], // Thumb
  [0, 5], [5, 6], [6, 7], [7, 8], // Index
  [9, 10], [10, 11], [11, 12],     // Middle
  [13, 14], [14, 15], [15, 16],    // Ring
  [0, 17], [17, 18], [18, 19], [19, 20], // Pinky
  [5, 9], [9, 13], [13, 17]        // Knuckle line
];

export const drawHandLandmarks = (
  ctx: CanvasRenderingContext2D,
  landmarks: Point[],
  width: number,
  height: number
): void => {
  // Clear previous drawings
  ctx.clearRect(0, 0, width, height);

  if (!landmarks || landmarks.length < 21) return;

  // 1. Draw connections
  ctx.strokeStyle = '#1BA04B'; // Brand Green
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';

  HAND_CONNECTIONS.forEach(([startIdx, endIdx]) => {
    const start = landmarks[startIdx];
    const end = landmarks[endIdx];
    
    if (start && end) {
      ctx.beginPath();
      ctx.moveTo(start.x * width, start.y * height);
      ctx.lineTo(end.x * width, end.y * height);
      ctx.stroke();
    }
  });

  // 2. Draw joints
  landmarks.forEach((pt, idx) => {
    ctx.beginPath();
    // Use different color for fingertip vs joints
    const isTip = [4, 8, 12, 16, 20].includes(idx);
    ctx.fillStyle = isTip ? '#FFD100' : '#ffffff'; // Yellow tips, white joints
    ctx.strokeStyle = '#138A36';
    ctx.lineWidth = 2;
    ctx.arc(pt.x * width, pt.y * height, isTip ? 6 : 4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  });
};
