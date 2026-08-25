import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { GESTURE_EMOJIS, GESTURE_NAMES, RECOGNITION_CONFIG } from '../gestures/gestureRules';

export type GameScreen = 'WELCOME' | 'HAND_DETECTION' | 'TUTORIAL' | 'GAMEPLAY' | 'RESULT';
export type GameStatus = 'IDLE' | 'WATCHING' | 'PLAYING' | 'SUCCESS' | 'GAMEOVER';

export const MAX_LIVES = 3; // PRD §10 specifies 3 lives
export const MAX_LEVEL = 5;

interface GameContextType {
  // Navigation / Routing
  screen: GameScreen;
  navigateTo: (nextScreen: GameScreen) => void;

  // Game States
  level: number;
  score: number;
  lives: number;
  highestScore: number;
  gameStatus: GameStatus;

  // Sequences
  sequence: string[];
  expectedGestureIndex: number;

  // Hardware & Gesture States
  isCameraActive: boolean;
  isHandDetected: boolean;
  detectedGesture: string;
  feedbackState: 'idle' | 'correct' | 'wrong';

  // Accuracy tracking
  totalAttempts: number;
  correctAttempts: number;

  // Actions
  resetGame: () => void;
  startNewGame: () => void;
  restartCurrentLevel: () => void;
  processGestureInput: (gesture: string) => void;

  // State Setters
  setLevel: React.Dispatch<React.SetStateAction<number>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setLives: React.Dispatch<React.SetStateAction<number>>;
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
  setSequence: React.Dispatch<React.SetStateAction<string[]>>;
  setIsCameraActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsHandDetected: React.Dispatch<React.SetStateAction<boolean>>;
  setDetectedGesture: React.Dispatch<React.SetStateAction<string>>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [screen, setScreen] = useState<GameScreen>('WELCOME');
  const [level, setLevel] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(MAX_LIVES); // Fixed: PRD §10 = 3 lives
  const [highestScore, setHighestScore] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>('IDLE');

  const [sequence, setSequence] = useState<string[]>([]);
  const [expectedGestureIndex, setExpectedGestureIndex] = useState<number>(0);

  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [isHandDetected, setIsHandDetected] = useState<boolean>(false);
  const [detectedGesture, setDetectedGesture] = useState<string>(GESTURE_NAMES.UNKNOWN);
  const [feedbackState, setFeedbackState] = useState<'idle' | 'correct' | 'wrong'>('idle');

  // Accuracy tracking
  const [totalAttempts, setTotalAttempts] = useState<number>(0);
  const [correctAttempts, setCorrectAttempts] = useState<number>(0);

  // Cooldown & stabilization trackers
  const [lastInputTime, setLastInputTime] = useState<number>(0);

  // Track level start time for "fast completion" bonus (PRD §12)
  const levelStartTimeRef = useRef<number>(0);
  const isHandlingFailureRef = useRef<boolean>(false);

  // Load highest score from localStorage on init
  useEffect(() => {
    const savedHighScore = localStorage.getItem('memory_moves_high_score');
    if (savedHighScore) {
      setHighestScore(parseInt(savedHighScore, 10));
    }
  }, []);

  // Effect 1: Handle sequence generation when entering gameplay or level increases
  useEffect(() => {
    if (screen !== 'GAMEPLAY') return;

    const gestures = ['✋', '☝️', '👍', '✌️', '👌'];
    // Ensure the new gesture is always different from the last one in the sequence
    setSequence((prev) => {
      const lastGesture = prev.length > 0 ? prev[prev.length - 1] : null;
      const available = gestures.filter((g) => g !== lastGesture);
      const newGesture = available[Math.floor(Math.random() * available.length)];
      return [...prev, newGesture];
    });
    setExpectedGestureIndex(0);
    setGameStatus('WATCHING');
    levelStartTimeRef.current = Date.now() + 2200; // Will be set after WATCHING ends
  }, [level, screen]);

  // Effect 2: Automatically transition from WATCHING to PLAYING status
  useEffect(() => {
    if (gameStatus !== 'WATCHING') return;

    const timer = setTimeout(() => {
      setGameStatus('PLAYING');
      levelStartTimeRef.current = Date.now(); // Start timing when player must perform
    }, 2200); // 2.2 seconds for player to observe the new gesture card

    return () => clearTimeout(timer);
  }, [gameStatus]);

  const navigateTo = (nextScreen: GameScreen) => {
    setScreen(nextScreen);
  };

  const resetGame = () => {
    isHandlingFailureRef.current = false;
    setLevel(1);
    setScore(0);
    setLives(MAX_LIVES);
    setSequence([]);
    setExpectedGestureIndex(0);
    setGameStatus('IDLE');
    setFeedbackState('idle');
    setDetectedGesture(GESTURE_NAMES.UNKNOWN);
    setTotalAttempts(0);
    setCorrectAttempts(0);
  };

  const startNewGame = () => {
    resetGame();
    navigateTo('HAND_DETECTION');
  };

  const restartCurrentLevel = () => {
    if (isHandlingFailureRef.current) return;
    isHandlingFailureRef.current = true;

    setExpectedGestureIndex(0);
    setFeedbackState('idle');
    setDetectedGesture(GESTURE_NAMES.UNKNOWN);
    setLives((prev) => {
      const nextLives = prev - 1;

      setTimeout(() => {
        if (nextLives <= 0) {
          setGameStatus('GAMEOVER');
          navigateTo('RESULT');
        } else {
          setGameStatus('WATCHING');
        }
        isHandlingFailureRef.current = false;
      }, 0);

      return nextLives;
    });
  };

  // Main input processor that validates stabilized gesture inputs
  const processGestureInput = (gesture: string) => {
    // Only accept input if the game is in active playing phase
    if (gameStatus !== 'PLAYING' || feedbackState !== 'idle') return;

    // Apply cooldown to prevent double triggers
    const now = Date.now();
    if (now - lastInputTime < RECOGNITION_CONFIG.COOLDOWN_MS) return;

    // Ignore unknown or raw transitions
    if (gesture === GESTURE_NAMES.UNKNOWN) return;

    setLastInputTime(now);
    setTotalAttempts((prev) => prev + 1);

    const expectedEmoji = sequence[expectedGestureIndex];
    const detectedEmoji = GESTURE_EMOJIS[gesture];

    if (detectedEmoji === expectedEmoji) {
      // ── Correct gesture ──
      setCorrectAttempts((prev) => prev + 1);
      setFeedbackState('correct');

      setTimeout(() => {
        setFeedbackState('idle');

        // Check if this was the last gesture of the sequence
        if (expectedGestureIndex === sequence.length - 1) {
          // Level completed!
          const elapsedSec = (Date.now() - levelStartTimeRef.current) / 1000;
          const isFast = elapsedSec < sequence.length * 3; // under 3s per gesture = fast
          const isPerfect = lives === MAX_LIVES; // no lives lost so far = perfect

          // PRD §12: +10 level complete, +5 perfect, +5 fast
          let points = 10;
          if (isPerfect) points += 5;
          if (isFast) points += 5;

          setScore((prev) => {
            const newScore = prev + points;
            // Update high score if exceeded
            const savedHigh = parseInt(localStorage.getItem('memory_moves_high_score') || '0', 10);
            if (newScore > savedHigh) {
              localStorage.setItem('memory_moves_high_score', newScore.toString());
              setHighestScore(newScore);
            }
            return newScore;
          });

          if (level >= MAX_LEVEL) {
            setGameStatus('SUCCESS');
          } else {
            setLevel((prev) => prev + 1);
            setGameStatus('WATCHING');
          }
        } else {
          // Advance to the next gesture in the sequence
          setExpectedGestureIndex((prev) => prev + 1);
        }
      }, 900);

    } else {
      // ── Wrong gesture ──
      setFeedbackState('wrong');
      restartCurrentLevel();
    }
  };

  return (
    <GameContext.Provider
      value={{
        screen,
        navigateTo,
        level,
        score,
        lives,
        highestScore,
        gameStatus,
        sequence,
        expectedGestureIndex,
        isCameraActive,
        isHandDetected,
        detectedGesture,
        feedbackState,
        totalAttempts,
        correctAttempts,
        setLevel,
        setScore,
        setLives,
        setGameStatus,
        setSequence,
        setIsCameraActive,
        setIsHandDetected,
        setDetectedGesture,
        resetGame,
        startNewGame,
        restartCurrentLevel,
        processGestureInput,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
