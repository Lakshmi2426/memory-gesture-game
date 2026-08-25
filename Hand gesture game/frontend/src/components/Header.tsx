import React from 'react';
import { useGame } from '../context/GameContext';
import { LivesDisplay } from './LivesDisplay';
import { Trophy, Zap, ArrowLeft } from 'lucide-react';

export const Header: React.FC = () => {
  const { screen, level, score, lives, resetGame, navigateTo } = useGame();
  const isGameActive = screen === 'GAMEPLAY' || screen === 'HAND_DETECTION' || screen === 'TUTORIAL';

  return (
    <header
      className="w-full sticky top-0 z-40 px-4 md:px-6 py-3"
      style={{
        background: 'rgba(255,255,255,0.76)',
        backdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(226,232,240,0.88)',
        boxShadow: '0 8px 28px rgba(15,23,42,0.06)',
      }}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">

        {/* Logo */}
        <button
          onClick={() => { resetGame(); navigateTo('WELCOME'); }}
          className="flex items-center gap-2.5 cursor-pointer group"
          style={{ background: 'none', border: 'none', padding: 0 }}
        >
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl font-black transition-transform duration-200 group-hover:scale-110"
            style={{
              background: 'linear-gradient(135deg, #6C3EF4, #A855F7)',
              boxShadow: '0 10px 24px rgba(108,62,244,0.24)',
            }}
          >
            🧠
          </div>
          <div className="text-left">
            <div className="text-lg font-black leading-none tracking-tight" style={{ color: '#0F172A' }}>
              Memory{' '}
              <span style={{
                background: 'linear-gradient(135deg,#6C3EF4,#A855F7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Moves
              </span>
            </div>
            <div className="text-[10px] font-semibold tracking-wider" style={{ color: '#94A3B8' }}>
              Remember · Repeat · Win
            </div>
          </div>
        </button>

        {/* Game HUD */}
        {isGameActive && (
          <div className="flex items-center gap-2 flex-wrap justify-end">
            {/* Level chip */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
              style={{ background: 'rgba(237,233,254,0.88)', border: '1px solid rgba(221,214,254,0.95)' }}>
              <Zap className="w-3.5 h-3.5" style={{ color: '#6C3EF4' }} />
              <span className="text-xs font-black" style={{ color: '#6C3EF4' }}>Lv.{level}</span>
            </div>

            {/* Score chip */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
              style={{ background: 'rgba(254,243,199,0.88)', border: '1px solid rgba(253,230,138,0.95)' }}>
              <Trophy className="w-3.5 h-3.5" style={{ color: '#D97706' }} />
              <span className="text-xs font-black" style={{ color: '#D97706' }}>{score} pts</span>
            </div>

            {/* Lives chip */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
              style={{ background: 'rgba(254,226,226,0.88)', border: '1px solid rgba(254,202,202,0.95)' }}>
              <LivesDisplay lives={lives} />
            </div>

            {/* Back */}
            <button
              onClick={() => { resetGame(); navigateTo('WELCOME'); }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold text-xs cursor-pointer transition-all duration-150 hover:scale-105"
              style={{ background: 'rgba(241,245,249,0.9)', border: '1px solid rgba(226,232,240,0.9)', color: '#475569' }}
              title="Back to Home"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Home
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
