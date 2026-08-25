import React, { useEffect, useState } from 'react';
import { Home, RotateCcw, Sparkles, Trophy } from 'lucide-react';
import { useGame } from '../context/GameContext';

const PARTICLES = Array.from({ length: 30 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  delay: `${(index % 10) * 0.09}s`,
  duration: `${2.2 + (index % 5) * 0.28}s`,
  color: ['#6C3EF4', '#16A34A', '#F59E0B', '#0284C7', '#EF4444'][index % 5],
  size: `${6 + (index % 4) * 2}px`,
}));

export const VictoryCelebration: React.FC = () => {
  const { sequence, score, startNewGame, resetGame, navigateTo } = useGame();
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const revealTimer = window.setTimeout(() => setIsRevealed(true), 650);
    return () => window.clearTimeout(revealTimer);
  }, []);

  const returnHome = () => {
    resetGame();
    navigateTo('WELCOME');
  };

  return (
    <div className={`victory-overlay ${isRevealed ? 'victory-overlay--revealed' : ''}`} role="dialog" aria-modal="true" aria-labelledby="victory-title">
      <div className="victory-overlay__wash" />
      <div className="victory-particles" aria-hidden="true">
        {PARTICLES.map((particle) => (
          <span
            key={particle.id}
            className="victory-particle"
            style={{
              left: particle.left,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
              backgroundColor: particle.color,
              width: particle.size,
              height: particle.size,
            }}
          />
        ))}
      </div>

      <div className="victory-content">
        <div className="victory-cards" aria-hidden="true">
          {sequence.slice(0, 5).map((emoji, index) => (
            <span key={`${emoji}-${index}`} className={`victory-card victory-card--${index + 1}`}>
              {emoji}
            </span>
          ))}
        </div>

        <div className="victory-trophy" aria-hidden="true">
          <Trophy className="w-16 h-16 md:w-20 md:h-20" strokeWidth={1.5} />
          <Sparkles className="victory-sparkle victory-sparkle--one w-5 h-5" />
          <Sparkles className="victory-sparkle victory-sparkle--two w-4 h-4" />
        </div>

        <div className="victory-copy">
          <p className="victory-kicker">All five gestures complete</p>
          <h1 id="victory-title">Memory Master!</h1>
          <p className="victory-message">You successfully remembered and completed all 5 gestures!</p>
        </div>

        <div className="victory-stats" aria-label="Victory results">
          <div><span>🏆</span><strong>Level Completed</strong></div>
          <div><span>⚡</span><strong>Perfect Memory Streak: 5/5</strong></div>
          <div><span>★</span><strong>{score} points earned</strong></div>
        </div>

        <div className="victory-actions">
          <button type="button" onClick={startNewGame} className="victory-button victory-button--primary">
            <RotateCcw className="w-5 h-5" /> Play Again
          </button>
          <button type="button" onClick={returnHome} className="victory-button victory-button--secondary">
            <Home className="w-5 h-5" /> Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};
