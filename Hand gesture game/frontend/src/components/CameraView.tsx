import React from 'react';
import { Camera, RefreshCw, Hand, Loader2 } from 'lucide-react';

interface CameraViewProps {
  videoRef?: React.RefObject<HTMLVideoElement | null>;
  canvasRef?: React.RefObject<HTMLCanvasElement | null>;
  isCameraActive?: boolean;
  isHandDetected?: boolean;
  statusText?: string;
  errorMessage?: string | null;
  onRetryCamera?: () => void;
}

export const CameraView: React.FC<CameraViewProps> = ({
  videoRef,
  canvasRef,
  isCameraActive = false,
  isHandDetected = false,
  statusText = 'Camera offline',
  errorMessage = null,
  onRetryCamera,
}) => {
  const borderColor = isHandDetected ? '#16A34A' : '#6C3EF4';
  const glowColor   = isHandDetected
    ? 'rgba(22,163,74,0.25)'
    : 'rgba(108,62,244,0.18)';

  return (
    <div
      className="relative w-full overflow-hidden hero-panel accent-ring"
      style={{
        aspectRatio: '16/9',
        maxHeight: '420px',
        borderRadius: 28,
        border: `1.5px solid ${borderColor}`,
        boxShadow: `0 0 0 8px ${glowColor}, 0 24px 64px rgba(15,23,42,0.14)`,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.92), rgba(241,245,249,0.92))',
        transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
      }}
    >
      {/* ── Scanning corner brackets ── */}
      {(['tl','tr','bl','br'] as const).map((pos) => {
        const top    = pos.startsWith('t') ? 12 : undefined;
        const bottom = pos.startsWith('b') ? 12 : undefined;
        const left   = pos.endsWith('l')   ? 12 : undefined;
        const right  = pos.endsWith('r')   ? 12 : undefined;
        const bt = pos.startsWith('t') ? 'borderTop' : 'borderBottom';
        const bl = pos.endsWith('l')   ? 'borderLeft' : 'borderRight';
        return (
          <div
            key={pos}
            className="absolute w-8 h-8 z-10"
            style={{
              top, bottom, left, right,
              [bt]: `3px solid ${borderColor}`,
              [bl]: `3px solid ${borderColor}`,
              borderRadius: pos === 'tl' ? '8px 0 0 0' : pos === 'tr' ? '0 8px 0 0' : pos === 'bl' ? '0 0 0 8px' : '0 0 8px 0',
              transition: 'border-color 0.35s',
            }}
          />
        );
      })}

      {/* ── Scan line (active camera) ── */}
      {isCameraActive && !errorMessage && (
        <div
          className="absolute inset-x-0 h-0.5 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${borderColor} 50%, transparent 100%)`,
            animation: 'scan-line 3s linear infinite',
            top: '50%',
            opacity: 0.75,
          }}
        />
      )}

      {/* ── Video ── */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
        style={{ display: isCameraActive && !errorMessage ? 'block' : 'none' }}
      />

      {/* ── Landmark canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover scale-x-[-1] bg-transparent"
        style={{ display: isCameraActive && !errorMessage ? 'block' : 'none' }}
      />

      {/* ── Placeholder states ── */}
      {(!isCameraActive || errorMessage) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 z-20"
          style={{ background: 'linear-gradient(180deg, rgba(248,250,252,0.95), rgba(255,255,255,0.92))' }}>
          {errorMessage ? (
            <>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: '#FEE2E2', color: '#DC2626', boxShadow: '0 12px 30px rgba(220,38,38,0.12)' }}>
                <Camera className="w-8 h-8" />
              </div>
              <div className="text-center space-y-1">
                <p className="font-black text-lg" style={{ color: '#1E293B' }}>Camera blocked</p>
                <p className="text-sm max-w-sm leading-relaxed" style={{ color: '#64748B' }}>{errorMessage}</p>
              </div>
              {onRetryCamera && (
                <button
                  onClick={onRetryCamera}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-sm text-white cursor-pointer transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg,#6C3EF4,#8B5CF6)', boxShadow: '0 10px 24px rgba(108,62,244,0.28)' }}
                >
                  <RefreshCw className="w-4 h-4" /> Retry
                </button>
              )}
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(108,62,244,0.10)', color: '#6C3EF4', boxShadow: '0 12px 28px rgba(108,62,244,0.10)' }}>
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
              <p className="font-black text-base" style={{ color: '#1E293B' }}>Starting camera…</p>
              <p className="text-sm max-w-sm leading-relaxed" style={{ color: '#64748B' }}>Please allow webcam access when prompted.</p>
            </>
          )}
        </div>
      )}

      {/* ── Status bar ── */}
      {isCameraActive && !errorMessage && (
        <div
          className="absolute bottom-0 inset-x-0 px-5 py-3 z-30 flex items-center justify-between"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.70), rgba(255,255,255,0.88))',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(226,232,240,0.9)',
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full"
              style={{
                background: isHandDetected ? '#16A34A' : '#94A3B8',
                boxShadow: isHandDetected ? '0 0 0 3px rgba(22,163,74,0.2)' : undefined,
                animation: isHandDetected ? 'pulse-slow 1.6s ease-in-out infinite' : undefined,
              }}
            />
            <span className="text-xs font-black uppercase tracking-wider" style={{ color: '#334155' }}>
              {statusText}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Hand className="w-3.5 h-3.5" style={{ color: isHandDetected ? '#16A34A' : '#CBD5E1' }} />
            <span className="text-[11px] font-black uppercase tracking-wider"
              style={{ color: isHandDetected ? '#16A34A' : '#94A3B8' }}>
              {isHandDetected ? 'Detected' : 'No hand'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
