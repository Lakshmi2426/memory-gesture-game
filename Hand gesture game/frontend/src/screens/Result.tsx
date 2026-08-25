import React, { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { Trophy, Award, RotateCcw, Home, Flame, Star, Target } from 'lucide-react';

export const Result: React.FC = () => {
  const { score, level, sequence, startNewGame, navigateTo, resetGame, totalAttempts, correctAttempts } = useGame();

  // Persist high score locally
  useEffect(() => {
    const currentHigh = localStorage.getItem('memory_moves_high_score');
    if (!currentHigh || score > parseInt(currentHigh, 10)) {
      localStorage.setItem('memory_moves_high_score', score.toString());
    }
  }, [score]);

  const longestSequence = sequence.length > 0 ? sequence.length - 1 : 0;
  const accuracyPct = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0;

  const isHighScore = (() => {
    const currentHigh = localStorage.getItem('memory_moves_high_score');
    return !currentHigh || score >= parseInt(currentHigh, 10);
  })();

  const stats = [
    {
      label: 'Final Score',
      value: score,
      icon: <Trophy className="w-5 h-5" />,
      color: '#FFD600',
      bg: 'rgba(255,214,0,0.12)',
      border: 'rgba(255,214,0,0.25)',
    },
    {
      label: 'Highest Level',
      value: `Lv. ${level}`,
      icon: <Flame className="w-5 h-5" />,
      color: '#FF6D00',
      bg: 'rgba(255,109,0,0.12)',
      border: 'rgba(255,109,0,0.25)',
    },
    {
      label: 'Sequence Length',
      value: `${longestSequence} gestures`,
      icon: <Star className="w-5 h-5" />,
      color: '#A78BFA',
      bg: 'rgba(124,58,237,0.12)',
      border: 'rgba(124,58,237,0.25)',
    },
    {
      label: 'Accuracy',
      value: `${accuracyPct}%`,
      icon: <Target className="w-5 h-5" />,
      color: '#16A34A',
      bg: 'rgba(22,163,74,0.12)',
      border: 'rgba(22,163,74,0.25)',
    },
    {
      label: 'Gestures Tried',
      value: totalAttempts,
      icon: <Award className="w-5 h-5" />,
      color: '#0284C7',
      bg: 'rgba(2,132,199,0.12)',
      border: 'rgba(2,132,199,0.25)',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] py-8 px-4 text-center max-w-2xl mx-auto space-y-6 select-none animate-fade-in">

      {/* Game Over Header */}
      <div className="hero-panel w-full rounded-[32px] p-6 md:p-8 space-y-4 animate-bounce-in">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto text-4xl animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(255,61,87,0.25), rgba(255,61,87,0.02))',
            border: '2px solid rgba(255,61,87,0.35)',
            boxShadow: '0 0 24px rgba(255,61,87,0.2)',
          }}
        >
          💔
        </div>
        <div className="space-y-1">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase" style={{ color: '#0F172A' }}>
            Game Over!
          </h2>
          <p className="font-semibold text-sm" style={{ color: '#94A3B8' }}>
            {score > 0 ? 'Amazing effort — beat your record next time!' : 'Keep practicing to improve!'}
          </p>
          {isHighScore && score > 0 && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mt-2"
              style={{ background: 'rgba(255,214,0,0.15)', border: '1px solid rgba(255,214,0,0.35)', color: '#D97706' }}>
              🏆 New Personal Best!
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3 animate-slide-in-up">
        {stats.map(({ label, value, icon, color, bg, border }) => (
          <div key={label} className="p-4 rounded-3xl flex flex-col items-center gap-2 surface-raised"
            style={{ background: bg, border: `1px solid ${border}` }}>
            <div style={{ color }}>{icon}</div>
            <div className="text-lg font-black" style={{ color: '#0F172A' }}>{value}</div>
            <div className="text-[9px] font-bold uppercase tracking-wider text-center" style={{ color: '#94A3B8' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Sequence replay */}
      {sequence.length > 0 && (
        <div className="w-full p-4 rounded-3xl space-y-2 surface text-center"
          style={{ background: 'rgba(255,255,255,0.78)' }}>
          <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#64748B' }}>Your Sequence</div>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {sequence.map((emoji, i) => (
              <div key={i} className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
                style={{
                  background: 'rgba(255,255,255,0.92)',
                  border: '1px solid rgba(226,232,240,0.95)',
                  boxShadow: '0 4px 10px rgba(15,23,42,0.04)'
                }}>
                {emoji}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-lg pt-4">
        <button
          onClick={startNewGame}
          className="flex-1 py-3 rounded-xl font-bold text-base text-white flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #16A34A, #22C55E)',
            boxShadow: '0 10px 24px rgba(22,163,74,0.2)'
          }}
        >
          <RotateCcw className="w-4 h-4" /> Play Again
        </button>
        <button
          onClick={() => { resetGame(); navigateTo('WELCOME'); }}
          className="flex-1 py-3 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          style={{
            background: 'rgba(255,255,255,0.85)',
            border: '1.5px solid rgba(108,62,244,0.2)',
            color: '#6C3EF4',
            boxShadow: '0 6px 18px rgba(15,23,42,0.04)'
          }}
        >
          <Home className="w-4 h-4" /> Home
        </button>
      </div>
    </div>
  );
};
