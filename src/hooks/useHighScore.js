import { useState, useEffect, useCallback } from 'react';
import { gameStorage } from '../utils/storage';

export const useHighScore = () => {
  const [highScore, setHighScore] = useState(0);

  // Load high score on mount
  useEffect(() => {
    const savedHighScore = gameStorage.getHighScore();
    setHighScore(savedHighScore);
  }, []);

  // Update high score
  const updateHighScore = useCallback((newScore) => {
    if (newScore > highScore) {
      setHighScore(newScore);
      gameStorage.setHighScore(newScore);
      return true; // New record
    }
    return false; // No new record
  }, [highScore]);

  // Reset high score
  const resetHighScore = useCallback(() => {
    setHighScore(0);
    gameStorage.clearHighScore();
  }, []);

  return {
    highScore,
    updateHighScore,
    resetHighScore
  };
};

