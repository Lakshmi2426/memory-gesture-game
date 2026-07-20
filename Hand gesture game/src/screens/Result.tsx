import React, { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { Trophy, Award, RotateCcw, Home, Flame, Star } from 'lucide-react';

export const Result: React.FC = () => {
  const { score, level, sequence, startNewGame, navigateTo, resetGame } = useGame();

  useEffect(() => {
    const currentHigh = localStorage.getItem('memory_moves_high_score');
    if (!currentHigh || score > parseInt(currentHigh, 10)) {
      localStorage.setItem('memory_moves_high_score', score.toString());
    }
  }, [score]);

  const longestSequence = sequence.length > 0 ? sequence.length - 1 : 0;
  const isHighScore = (() => {
    const currentHigh = localStorage.getItem('memory_moves_high_score');
    return !currentHigh || score >= parseInt(currentHigh, 10);
  })();

  const stats = [
    { label: 'Final Score', value: score, icon: <Trophy className="w-6 h-6" />, color: '#FFD600', bg: 'rgba(255,214,0,0.15)', border: 'rgba(255,214,0,0.3)' },
    { label: 'Highest Level', value: `Lv. ${level}`, icon: <Flame className="w-6 h-6" />, color: '#FF6D00', bg: 'rgba(255,109,0,0.15)', border: 'rgba(255,109,0,0.3)' },
    { label: 'Sequence Length', value: `${longestSequence} gestures`, icon: <Star className="w-6 h-6" />, color: '#A78BFA', bg: 'rgba(124,58,237,0.15)', border: 'rgba(124,58,237,0.3)' },
    { label: 'Gestures Learned', value: Math.min(5, sequence.length), icon: <Award className="w-6 h-6" />, color: '#00C853', bg: 'rgba(0,200,83,0.15)', border: 'rgba(0,200,83,0.3)' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] py-8 px-4 text-center max-w-3xl mx-auto space-y-8 select-none">

      {/* Game Over Header */}
      <div className="hero-panel w-full rounded-[32px] p-6 md:p-8 space-y-4 animate-bounce-in">
        {/* Broken heart emoji */}
        <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto text-5xl animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(255,61,87,0.3), rgba(255,61,87,0.05))',
            border: '2px solid rgba(255,61,87,0.4)',
            boxShadow: '0 0 30px rgba(255,61,87,0.3)',
          }}
        >
          💔
        </div>
        <div className="space-y-1">
          <h2 className="text-4xl font-black tracking-tight uppercase" style={{ color: '#0F172A' }}>
            Game Over!
          </h2>
          <p className="font-semibold" style={{ color: '#94A3B8' }}>
            {score > 0 ? 'Amazing effort — beat your record next time!' : 'Keep practicing to improve!'}
          </p>
          {isHighScore && score > 0 && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mt-2"
              style={{ background: 'rgba(255,214,0,0.2)', border: '1px solid rgba(255,214,0,0.4)', color: '#FFD600' }}>
              🏆 New Personal Best!
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="w-full grid grid-cols-2 gap-4 animate-slide-in-up">
        {stats.map(({ label, value, icon, color, bg, border }) => (
          <div key={label} className="p-5 rounded-3xl flex flex-col items-center gap-2 surface-raised"
            style={{ background: bg, border: `1px solid ${border}` }}>
            <div style={{ color }}>{icon}</div>
            <div className="text-2xl font-black" style={{ color: '#0F172A' }}>{value}</div>
            <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#94A3B8' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Sequence replay */}
      {sequence.length > 0 && (
        <div className="w-full p-4 rounded-3xl space-y-2 surface"
          style={{ background: 'rgba(255,255,255,0.78)' }}>
          <div className="text-xs font-bold uppercase tracking-wider" style={{ color: '#64748B' }}>Your Sequence</div>
          <div className="flex flex-wrap gap-2 justify-center">
            {sequence.map((emoji, i) => (
              <div key={i} className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: 'rgba(255,255,255,0.92)', border: '1px solid rgba(226,232,240,0.95)', boxShadow: '0 8px 18px rgba(15,23,42,0.05)' }}>
                {emoji}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <button
          onClick={startNewGame}
          className="flex-1 py-4 rounded-2xl font-bold text-lg text-white flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #16A34A, #22C55E)',
            boxShadow: '0 14px 30px rgba(22,163,74,0.24)',
          }}
        >
          <RotateCcw className="w-5 h-5" /> Play Again
        </button>
        <button
          onClick={() => { resetGame(); navigateTo('WELCOME'); }}
          className="flex-1 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          style={{
            background: 'rgba(255,255,255,0.82)',
            border: '1.5px solid rgba(108,62,244,0.22)',
            color: '#6C3EF4',
            boxShadow: '0 10px 24px rgba(15,23,42,0.06)',
          }}
        >
          <Home className="w-5 h-5" /> Home
        </button>
      </div>
    </div>
  );
};
