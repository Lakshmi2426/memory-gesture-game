import React from 'react';
import { Heart } from 'lucide-react';
import { MAX_LIVES } from '../context/GameContext';

interface LivesDisplayProps {
  lives: number;
  maxLives?: number;
}

export const LivesDisplay: React.FC<LivesDisplayProps> = ({ lives, maxLives = MAX_LIVES }) => {
  return (
    <div className="flex items-center gap-1" aria-label={`${lives} of ${maxLives} lives`}>
      {Array.from({ length: maxLives }).map((_, i) => (
        <Heart
          key={i}
          className="w-4 h-4 transition-all duration-300"
          style={
            i < lives
              ? { fill: '#EF4444', color: '#EF4444', filter: 'drop-shadow(0 1px 3px rgba(239,68,68,0.45))' }
              : { color: '#FCA5A5', fill: 'none', opacity: 0.4 }
          }
        />
      ))}
    </div>
  );
};
