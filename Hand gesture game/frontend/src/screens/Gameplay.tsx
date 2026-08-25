import React, { useEffect, useRef, useState } from 'react';
import { useGame } from '../context/GameContext';
import { CameraView } from '../components/CameraView';
import { ProgressBar } from '../components/ProgressBar';
import { CameraFeed } from '../camera/CameraFeed';
import { handTracker } from '../camera/HandTracker';
import { GestureClassifier } from '../gestures/classifier';
import { GESTURE_NAMES } from '../gestures/gestureRules';
import { drawHandLandmarks } from '../utils/drawing';
import { CheckCircle2, AlertTriangle, Timer, Eye, Clock } from 'lucide-react';

export const Gameplay: React.FC = () => {
  const {
    lives,
    gameStatus,
    sequence, expectedGestureIndex,
    isHandDetected, setIsHandDetected,
    detectedGesture, setDetectedGesture,
    feedbackState, processGestureInput, restartCurrentLevel,
  } = useGame();

  const videoRef    = useRef<HTMLVideoElement | null>(null);
  const canvasRef   = useRef<HTMLCanvasElement | null>(null);
  const [cameraError,    setCameraError]    = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const cameraFeedRef  = useRef<CameraFeed | null>(null);
  const classifierRef  = useRef<GestureClassifier | null>(null);
  const activeLoopRef  = useRef<boolean>(true);
  const timerRef       = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastGestureRef = useRef<string>(GESTURE_NAMES.UNKNOWN);
  const consFramesRef  = useRef<number>(0);
  const statusRef      = useRef(gameStatus);
  const processRef     = useRef(processGestureInput);
  const restartRef     = useRef(restartCurrentLevel);
  const livesRef       = useRef(lives);

  useEffect(() => { statusRef.current  = gameStatus;         }, [gameStatus]);
  useEffect(() => { processRef.current = processGestureInput; }, [processGestureInput]);
  useEffect(() => { restartRef.current = restartCurrentLevel; }, [restartCurrentLevel]);
  useEffect(() => { livesRef.current   = lives;               }, [lives]);

  useEffect(() => {
    if (gameStatus === 'WATCHING') {
      lastGestureRef.current = GESTURE_NAMES.UNKNOWN;
      consFramesRef.current = 0;
    }
  }, [gameStatus]);

  const [timeLeft, setTimeLeft] = useState<number>(10);

  /* ── Camera + detection init ── */
  useEffect(() => {
    cameraFeedRef.current = new CameraFeed();
    classifierRef.current = new GestureClassifier();
    activeLoopRef.current = true;

    (async () => {
      try {
        await handTracker.initialize(() => {});
        if (videoRef.current) {
          await cameraFeedRef.current!.start(videoRef.current);
          setIsCameraActive(true);
          setCameraError(null);
          loop();
        }
      } catch (e: unknown) {
        setIsCameraActive(false);
        setCameraError(e instanceof Error ? e.message : 'Could not access webcam.');
      }
    })();

    return () => {
      activeLoopRef.current = false;
      cameraFeedRef.current?.stop();
      if (timerRef.current) clearInterval(timerRef.current);
      setIsHandDetected(false);
      setDetectedGesture(GESTURE_NAMES.UNKNOWN);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setIsHandDetected, setDetectedGesture]);

  /* ── 10-second countdown ── */
  useEffect(() => {
    if (gameStatus === 'PLAYING') {
      setTimeLeft(10);
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            timerRef.current = null;

            restartRef.current();

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [gameStatus, expectedGestureIndex]);

  /* ── rAF frame loop ── */
  const loop = () => {
    const frame = () => {
      if (!activeLoopRef.current || !videoRef.current || !canvasRef.current || !classifierRef.current) return;
      const video = videoRef.current, canvas = canvasRef.current, clf = classifierRef.current;

      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        if (canvas.width !== video.videoWidth) {
          canvas.width  = video.videoWidth;
          canvas.height = video.videoHeight;
        }
        const ctx = canvas.getContext('2d');
        if (ctx) {
          try {
            const results = handTracker.detect(video, Date.now());
            if (results?.landmarks?.length) {
              const lm = results.landmarks[0];
              setIsHandDetected(true);
              drawHandLandmarks(ctx, lm, canvas.width, canvas.height);
              const raw = clf.classify(lm);
              if (raw === lastGestureRef.current) {
                consFramesRef.current++;
                if (consFramesRef.current === 5) {
                  setDetectedGesture(raw);
                  if (statusRef.current === 'PLAYING') processRef.current(raw);
                }
              } else {
                lastGestureRef.current = raw;
                consFramesRef.current  = 1;
              }
            } else {
              setIsHandDetected(false);
              consFramesRef.current = 0;
              ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
          } catch { /* silently ignore frame errors */ }
        }
      }
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };

  const retryCamera = async () => {
    if (!videoRef.current || !cameraFeedRef.current) return;
    try {
      setCameraError(null);
      await cameraFeedRef.current.start(videoRef.current);
      setIsCameraActive(true);
      loop();
    } catch (e: unknown) {
      setIsCameraActive(false);
      setCameraError(e instanceof Error ? e.message : 'Could not reconnect.');
    }
  };

  const isWatching  = gameStatus === 'WATCHING';
  const isPlaying   = gameStatus === 'PLAYING';
  const timerDanger = timeLeft <= 3;

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-80px)] py-5 px-3 w-full max-w-6xl mx-auto gap-4 select-none">

      {/* ══ Top HUD ══════════════════════════════════════════ */}
      <div className="w-full flex items-center justify-between gap-3 flex-wrap">

        {/* Phase / Timer indicator */}
        {isWatching ? (
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl surface"
            style={{ background: 'rgba(237,233,254,0.88)', border: '1.5px solid rgba(221,214,254,0.95)' }}>
            <Eye className="w-5 h-5 animate-pulse" style={{ color: '#6C3EF4' }} />
            <div>
              <p className="text-sm font-black uppercase tracking-wide leading-none" style={{ color: '#6C3EF4' }}>
                WATCH &amp; MEMORIZE
              </p>
              <p className="text-[10px] font-semibold mt-0.5" style={{ color: '#A78BFA' }}>
                Memorize the gesture, then perform it!
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl surface"
            style={{
              background: timerDanger ? 'rgba(254,226,226,0.88)' : 'rgba(220,252,231,0.88)',
              border: `1.5px solid ${timerDanger ? 'rgba(254,202,202,0.95)' : 'rgba(187,247,208,0.95)'}`,
            }}>
            {timerDanger
              ? <Timer className="w-5 h-5 animate-timer-pulse" style={{ color: '#DC2626' }} />
              : <Clock className="w-5 h-5" style={{ color: '#16A34A' }} />
            }
            <div className="text-2xl font-black tabular-nums leading-none"
              style={{ color: timerDanger ? '#DC2626' : '#16A34A' }}>
              {timeLeft}s
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-wide leading-none"
                style={{ color: timerDanger ? '#DC2626' : '#16A34A' }}>
                {timerDanger ? 'HURRY!' : 'YOUR TURN'}
              </p>
              <p className="text-[10px] font-semibold mt-0.5" style={{ color: timerDanger ? '#F87171' : '#4ADE80' }}>
                Perform the sequence from memory
              </p>
            </div>
          </div>
        )}

        {/* Step counter — only shows NUMBER, never the gesture emoji */}
        <div className="px-5 py-2.5 rounded-2xl text-center surface"
          style={{ background: 'rgba(255,255,255,0.84)' }}>
          <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#64748B' }}>Gesture</p>
          <p className="text-2xl font-black leading-none" style={{ color: '#0F172A' }}>
            {expectedGestureIndex + 1}
            <span className="text-sm font-bold" style={{ color: '#CBD5E1' }}>/{sequence.length}</span>
          </p>
        </div>
      </div>

      {/* ══ Camera area ══════════════════════════════════════ */}
      <div className="w-full max-w-2xl mx-auto relative">

        {/* ── Correct overlay ── */}
        {feedbackState === 'correct' && (
          <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none rounded-3xl"
            style={{ background: 'rgba(22,163,74,0.10)', border: '3px solid #16A34A', borderRadius: 24 }}>
            <div className="flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-xl animate-pop-in text-white"
              style={{ background: '#16A34A', boxShadow: '0 8px 32px rgba(22,163,74,0.5)' }}>
              <CheckCircle2 className="w-8 h-8" />
              Correct! 🎉
            </div>
          </div>
        )}

        {/* ── Wrong overlay ── */}
        {feedbackState === 'wrong' && (
          <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none animate-shake rounded-3xl"
            style={{ background: 'rgba(220,38,38,0.10)', border: '3px solid #DC2626', borderRadius: 24 }}>
            <div className="flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-xl animate-zoom-in text-white"
              style={{ background: '#DC2626', boxShadow: '0 8px 32px rgba(220,38,38,0.5)' }}>
              <AlertTriangle className="w-8 h-8" />
              Wrong! ❌
            </div>
          </div>
        )}

        <CameraView
          videoRef={videoRef}
          canvasRef={canvasRef}
          isCameraActive={isCameraActive}
          isHandDetected={isHandDetected}
          statusText={
            isWatching
              ? '👀 Watch & memorize this gesture'
              : isHandDetected
                ? detectedGesture !== GESTURE_NAMES.UNKNOWN
                  ? `Detected: ${detectedGesture}`
                  : 'Keep your hand steady…'
                : '✋ Show your hand to the camera'
          }
          errorMessage={cameraError}
          onRetryCamera={retryCamera}
        />

        {/* ── WATCHING overlay: shows the new gesture ONLY ── */}
        {isWatching && (
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
            style={{
              background: 'rgba(248,250,252,0.82)',
              backdropFilter: 'blur(6px)',
              borderRadius: 24,
            }}
          >
            <div className="text-center space-y-3 animate-pop-in">
              {/* Badge */}
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider"
                style={{ background: '#EDE9FE', color: '#6C3EF4', border: '1.5px solid #DDD6FE' }}>
                ✨ New gesture added to sequence!
              </span>
              {/* Big gesture emoji */}
              <div className="text-[110px] leading-none animate-float filter drop-shadow-md">
                {sequence[sequence.length - 1]}
              </div>
              {/* Caption */}
              <p className="font-black text-xl" style={{ color: '#1E293B' }}>
                Memorize this! 🧠
              </p>
              <p className="text-sm font-semibold" style={{ color: '#64748B' }}>
                This is gesture #{sequence.length} in your sequence
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ══ Progress bar (number only, no emoji hints) ═══════ */}
      <div className="w-full surface-raised px-5 py-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: '#94A3B8' }}>
            Progress
          </span>
          <span className="text-[11px] font-black" style={{ color: '#64748B' }}>
            {expectedGestureIndex} / {sequence.length} done
          </span>
        </div>
        <ProgressBar current={expectedGestureIndex} total={sequence.length} />
      </div>

      {/* ══ Memory challenge reminder (PLAYING only) ════════ */}
      {isPlaying && (
        <div className="w-full surface-raised px-5 py-3 flex items-center gap-3"
          style={{ borderLeft: '4px solid #6C3EF4' }}>
          <span className="text-2xl">🧠</span>
          <div>
            <p className="text-sm font-black" style={{ color: '#1E293B' }}>
              It&apos;s a memory challenge!
            </p>
            <p className="text-xs font-semibold" style={{ color: '#64748B' }}>
              Recall gesture #{expectedGestureIndex + 1} from memory and perform it now.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
