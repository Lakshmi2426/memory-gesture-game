import React, { useEffect, useRef, useState } from 'react';
import { useGame } from '../context/GameContext';
import { CameraView } from '../components/CameraView';
import { CameraFeed } from '../camera/CameraFeed';
import { handTracker } from '../camera/HandTracker';
import { drawHandLandmarks } from '../utils/drawing';

export const HandDetection: React.FC = () => {
  const { navigateTo, isHandDetected, setIsHandDetected, isCameraActive, setIsCameraActive } = useGame();
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isModelLoading, setIsModelLoading] = useState<boolean>(true);

  // Instantiated camera references
  const cameraFeedRef = useRef<CameraFeed | null>(null);
  const activeLoopRef = useRef<boolean>(true);

  useEffect(() => {
    cameraFeedRef.current = new CameraFeed();
    activeLoopRef.current = true;

    const initTracking = async () => {
      try {
        setIsModelLoading(true);
        // 1. Initialize Hand Landmarker Model
        await handTracker.initialize(() => {
          setIsModelLoading(false);
        });

        // 2. Start webcam streaming
        if (videoRef.current) {
          await cameraFeedRef.current!.start(videoRef.current);
          setIsCameraActive(true);
          setCameraError(null);
          
          // 3. Start frame analysis loop
          startDetectionLoop();
        }
      } catch (err: any) {
        console.error('Failed camera initialization:', err);
        setCameraError(err.message || 'Webcam access was denied. Please allow camera permissions in browser settings.');
        setIsModelLoading(false);
      }
    };

    initTracking();

    return () => {
      // Cleanup streams and hooks
      activeLoopRef.current = false;
      if (cameraFeedRef.current) {
        cameraFeedRef.current.stop();
      }
      setIsCameraActive(false);
      setIsHandDetected(false);
    };
  }, [setIsCameraActive, setIsHandDetected]);

  // Frame processing loop
  const startDetectionLoop = () => {
    const processFrame = () => {
      if (!activeLoopRef.current || !videoRef.current || !canvasRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const tracker = handTracker;

      // Ensure stream has active video data
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        // Match canvas dimensions to video
        if (canvas.width !== video.videoWidth) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }

        const ctx = canvas.getContext('2d');
        if (ctx) {
          try {
            const timestamp = Date.now();
            const results = tracker.detect(video, timestamp);

            if (results && results.landmarks && results.landmarks.length > 0) {
              const handPoints = results.landmarks[0];
              
              // Draw landmarks overlay
              drawHandLandmarks(ctx, handPoints, canvas.width, canvas.height);
              
              // Hand successfully tracked!
              setIsHandDetected(true);
              
              // Automatically move to Tutorial after a short delay to let the user see their skeleton
              setTimeout(() => {
                if (activeLoopRef.current) {
                  navigateTo('TUTORIAL');
                }
              }, 1200);
              
              return; // Stop looping on successful hand locked transition
            } else {
              setIsHandDetected(false);
              ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
          } catch (e) {
            console.error('Frame processing error:', e);
          }
        }
      }

      // Next frame
      requestAnimationFrame(processFrame);
    };

    requestAnimationFrame(processFrame);
  };

  const handleRetryCamera = async () => {
    if (videoRef.current && cameraFeedRef.current) {
      try {
        setCameraError(null);
        await cameraFeedRef.current.start(videoRef.current);
        setIsCameraActive(true);
        setIsHandDetected(false);
        startDetectionLoop();
      } catch (err: any) {
        setCameraError(err.message || 'Failed to reconnect webcam.');
      }
    }
  };

  const statusText = isModelLoading
    ? 'Loading Hand Tracking Model...'
    : isHandDetected
    ? '✓ Hand Detected! Preparing tutorial...'
    : '🔍 Place hand in front of camera';

  return (
    <div className="flex flex-col items-center h-screen overflow-hidden py-3 px-3 w-full max-w-5xl mx-auto gap-3 select-none">
      <div className="hero-panel w-full rounded-[32px] p-6 md:p-8 space-y-3 animate-slide-in-up">
        <div className="text-4xl animate-float">✋</div>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight" style={{ color: '#0F172A' }}>
          Hand Detection <span style={{ background: 'linear-gradient(135deg, #00C853, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Setup</span>
        </h2>
        <p className="text-sm font-semibold max-w-md mx-auto leading-relaxed" style={{ color: '#64748B' }}>
          Place your hand in front of the camera. Once detected, we'll guide you through the gestures!
        </p>
      </div>

      {/* Main Camera View */}
      <div className="w-full max-w-3xl">
        <CameraView
          videoRef={videoRef}
          canvasRef={canvasRef}
          isCameraActive={isCameraActive && !isModelLoading}
          isHandDetected={isHandDetected}
          statusText={statusText}
          errorMessage={cameraError}
          onRetryCamera={handleRetryCamera}
        />
      </div>

      {isModelLoading && (
        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl"
          style={{ background: 'rgba(124,58,237,0.10)', border: '1px solid rgba(124,58,237,0.22)' }}>
          <div className="w-4 h-4 rounded-full animate-spin"
            style={{ border: '2px solid rgba(124,58,237,0.3)', borderTopColor: '#A78BFA' }} />
          <span className="text-sm font-bold" style={{ color: '#A78BFA' }}>Loading hand tracking model...</span>
        </div>
      )}
    </div>
  );
};
