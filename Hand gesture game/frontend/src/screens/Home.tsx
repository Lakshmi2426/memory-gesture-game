import React from 'react';
import { useGame } from '../context/GameContext';
import { Play, BookOpen, Trophy, Brain, Eye, Hand } from 'lucide-react';

export const Home: React.FC = () => {
  const { startNewGame, navigateTo, highestScore } = useGame();

  const gestures = [
    { emoji: '✋', label: 'Palm',      color: '#6C3EF4', bg: '#EDE9FE' },
    { emoji: '☝️', label: 'Point Up',  color: '#DC2626', bg: '#FEE2E2' },
    { emoji: '👍', label: 'Thumbs Up', color: '#D97706', bg: '#FEF3C7' },
    { emoji: '✌️', label: 'Peace',    color: '#16A34A', bg: '#DCFCE7' },
    { emoji: '👌', label: 'OK',        color: '#0284C7', bg: '#E0F2FE' },
  ];

  const steps = [
    { icon: <Eye className="w-5 h-5" />, label: 'Watch', desc: 'A new gesture appears — observe it carefully.', color: '#6C3EF4', bg: '#EDE9FE' },
    { icon: <Brain className="w-5 h-5" />, label: 'Memorize', desc: 'Keep the full growing sequence in your head.', color: '#D97706', bg: '#FEF3C7' },
    { icon: <Hand className="w-5 h-5" />, label: 'Perform', desc: 'Show every gesture in order with your hand.', color: '#16A34A', bg: '#DCFCE7' },
  ];

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-80px)] py-10 px-4 max-w-6xl mx-auto relative select-none">
      <div className="hero-panel w-full rounded-[32px] p-6 md:p-10 animate-slide-up">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
          {/* ── Hero ── */}
          <div className="text-center lg:text-left space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider"
              style={{ background: 'rgba(237,233,254,0.92)', color: '#6C3EF4', border: '1px solid rgba(221,214,254,0.9)' }}>
              🎮 Hand Gesture Memory Game
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tight" style={{ color: '#0F172A' }}>
              Memory{' '}
              <span style={{
                background: 'linear-gradient(135deg,#6C3EF4,#A855F7 55%,#22C55E)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Moves
              </span>
            </h1>
            <p className="text-base md:text-lg font-semibold max-w-xl" style={{ color: '#64748B' }}>
              Watch a gesture, memorize the growing sequence, and repeat it under pressure using your hand camera feed.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2">
              {['Watch', 'Memorize', 'Perform'].map((step) => (
                <span key={step} className="px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider"
                  style={{ background: 'rgba(255,255,255,0.82)', color: '#1E293B', border: '1px solid rgba(226,232,240,0.9)', boxShadow: '0 8px 18px rgba(15,23,42,0.05)' }}>
                  {step}
                </span>
              ))}
            </div>
          </div>

          {/* ── Gesture Showcase ── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 justify-center lg:justify-end">
            {gestures.map(({ emoji, label, color, bg }, i) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1.5 animate-float"
                style={{ animationDelay: `${i * 0.22}s` }}
              >
                <div
                  className="w-16 h-16 rounded-3xl flex items-center justify-center text-3xl surface-raised transition-transform hover:scale-110"
                  style={{ background: bg, border: `1.5px solid ${color}22`, boxShadow: `0 10px 22px ${color}1f` }}
                >
                  {emoji}
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider" style={{ color }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── How to play ── */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 mb-8">
        {steps.map(({ icon, label, desc, color, bg }, i) => (
          <div
            key={label}
            className="surface-raised p-5 text-center space-y-3 animate-slide-up"
            style={{ animationDelay: `${0.1 + i * 0.12}s` }}
          >
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center mx-auto"
              style={{ background: bg, color }}>
              {icon}
            </div>
            <div className="font-black text-sm uppercase tracking-wide" style={{ color: '#0F172A' }}>{label}</div>
            <div className="text-xs leading-relaxed" style={{ color: '#64748B' }}>{desc}</div>
          </div>
        ))}
      </div>

      {/* ── Warning chip ── */}
      <div
        className="mb-8 px-5 py-2.5 rounded-2xl text-sm font-bold flex items-center gap-2"
        style={{ background: 'rgba(254,243,199,0.92)', border: '1px solid rgba(253,230,138,0.95)', color: '#92400E' }}
      >
        ⚠️ Only 1 mistake allowed — focus hard!
      </div>

      {/* ── CTA Buttons ── */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mb-8">
        <button
          onClick={startNewGame}
          className="flex-1 py-4 rounded-2xl font-black text-lg text-white flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer"
          style={{
            background: 'linear-gradient(135deg,#6C3EF4,#8B5CF6 60%,#A855F7)',
            boxShadow: '0 14px 32px rgba(108,62,244,0.30)',
          }}
        >
          <Play className="w-5 h-5 fill-white" /> Start Game
        </button>
        <button
          onClick={() => navigateTo('TUTORIAL')}
          className="flex-1 py-4 rounded-2xl font-black text-base flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer"
          style={{
            background: 'rgba(255,255,255,0.85)',
            border: '1.5px solid rgba(108,62,244,0.24)',
            color: '#6C3EF4',
            boxShadow: '0 10px 24px rgba(15,23,42,0.06)',
          }}
        >
          <BookOpen className="w-5 h-5" /> How To Play
        </button>
      </div>

      {/* ── High score ── */}
      {highestScore > 0 && (
        <div className="flex items-center gap-2 px-5 py-2.5 rounded-full font-black text-sm"
          style={{ background: 'rgba(254,243,199,0.9)', border: '1px solid rgba(253,230,138,0.95)', color: '#D97706' }}>
          <Trophy className="w-4 h-4 fill-current" /> Personal Best: {highestScore} pts
        </div>
      )}
    </div>
  );
};
