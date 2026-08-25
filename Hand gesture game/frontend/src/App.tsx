import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Header } from './components/Header';
import { Home } from './screens/Home';
import { HandDetection } from './screens/HandDetection';
import { Tutorial } from './screens/Tutorial';
import { Gameplay } from './screens/Gameplay';
import { Result } from './screens/Result';
import { VictoryCelebration } from './components/VictoryCelebration';

const GameContainer: React.FC = () => {
  const { screen, gameStatus } = useGame();

  const renderScreen = () => {
    switch (screen) {
      case 'WELCOME':      return <Home />;
      case 'HAND_DETECTION': return <HandDetection />;
      case 'TUTORIAL':    return <Tutorial />;
      case 'GAMEPLAY':    return <Gameplay />;
      case 'RESULT':      return <Result />;
      default:            return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden page-shell" style={{ zIndex: 1 }}>
      <div className="page-orb w-72 h-72 -top-20 -left-24" style={{ background: 'rgba(108,62,244,0.12)' }} />
      <div className="page-orb w-80 h-80 top-32 -right-24" style={{ background: 'rgba(22,163,74,0.10)' }} />
      <div className="page-orb w-[28rem] h-[28rem] -bottom-40 left-1/2 -translate-x-1/2" style={{ background: 'rgba(2,132,199,0.08)' }} />
      <Header />
      <main className="flex-1 flex flex-col relative z-10">
        {renderScreen()}
      </main>
      {gameStatus === 'SUCCESS' && <VictoryCelebration />}
      <footer className="py-3 text-center text-[11px] font-semibold"
        style={{ color: '#64748B', borderTop: '1px solid rgba(226,232,240,0.88)', background: 'rgba(255,255,255,0.42)', backdropFilter: 'blur(10px)' }}>
        © 2026 Memory Moves · Powered by MediaPipe Hand Tracking
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <GameContainer />
    </GameProvider>
  );
}
