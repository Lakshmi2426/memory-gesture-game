import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { GestureCard } from '../components/GestureCard';
import { Button } from '../components/Button';
import { Play } from 'lucide-react';

export const Tutorial: React.FC = () => {
  const { navigateTo } = useGame();
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);

  const gestures = [
    { emoji: '✋', name: 'Open Palm', description: 'Extend all fingers straight up' },
    { emoji: '☝️', name: 'Point Up', description: 'Raise only your index finger' },
    { emoji: '👍', name: 'Thumbs Up', description: 'Extend your thumb up with a closed hand' },
    { emoji: '✌️', name: 'Peace', description: 'Extend index and middle fingers' },
    { emoji: '👌', name: 'OK', description: 'Touch thumb and index fingers to form a circle' }
  ];

  // Rotate through highlighting gestures to simulate the PRD tutorial countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedIndex((prev) => (prev + 1) % gestures.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [gestures.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] py-8 px-4 text-center max-w-2xl mx-auto space-y-6 select-none animate-fade-in">
      <div className="hero-panel w-full rounded-[32px] p-6 md:p-8 space-y-2">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight" style={{ color: '#0F172A' }}>
          Learn the Gestures
        </h2>
        <p className="text-sm font-semibold max-w-xl mx-auto" style={{ color: '#64748B' }}>
          The game uses these five hand signals. Practice performing them in front of your camera.
        </p>
      </div>

      {/* Gestures List */}
      <div className="w-full space-y-3">
        {gestures.map((gesture, idx) => (
          <GestureCard
            key={gesture.name}
            emoji={gesture.emoji}
            name={gesture.name}
            description={gesture.description}
            isActive={idx === highlightedIndex}
          />
        ))}
      </div>

      {/* Let's Begin CTA */}
      <Button onClick={() => navigateTo('GAMEPLAY')} className="w-full py-4 shadow-md font-bold mt-4">
        <Play className="w-5 h-5 fill-white" /> Let's Begin!
      </Button>
    </div>
  );
};
