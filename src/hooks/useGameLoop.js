import { useRef, useCallback, useEffect, useMemo } from 'react';
import { calculateGameSpeed } from '../utils/gameUtils';

export const useGameLoop = (isPlaying, isPaused, gameSpeed, activeEffects, onTick) => {
  const gameIntervalRef = useRef(null);

  // Memoize current speed to avoid unnecessary recalculations
  const currentSpeed = useMemo(() => {
    const hasSpeedBoost = activeEffects.some(effect => effect.type === 'SPEED_BOOST');
    return calculateGameSpeed(gameSpeed, hasSpeedBoost);
  }, [gameSpeed, activeEffects]);

  // Clear interval
  const clearGameInterval = useCallback(() => {
    if (gameIntervalRef.current) {
      clearInterval(gameIntervalRef.current);
      gameIntervalRef.current = null;
    }
  }, []);

  // Start game loop
  const startGameLoop = useCallback(() => {
    clearGameInterval();
    if (isPlaying && !isPaused) {
      gameIntervalRef.current = setInterval(onTick, currentSpeed);
    }
  }, [isPlaying, isPaused, currentSpeed, onTick, clearGameInterval]);

  // Effect to manage game loop
  useEffect(() => {
    startGameLoop();
    
    return () => {
      clearGameInterval();
    };
  }, [startGameLoop, clearGameInterval]);

  return {
    clearGameInterval,
    startGameLoop
  };
};

