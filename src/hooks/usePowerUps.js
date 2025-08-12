import { useRef, useCallback, useEffect } from 'react';
import { POWER_UPS } from '../constants/game';

export const usePowerUps = (activeEffects, removePowerUp) => {
  const powerUpTimeoutsRef = useRef({});

  // Cleanup timeouts when component unmounts
  useEffect(() => {
    return () => {
      Object.values(powerUpTimeoutsRef.current).forEach(timeoutId => {
        clearTimeout(timeoutId);
      });
    };
  }, []);

  const activatePowerUp = useCallback((powerUpType) => {
    const effect = POWER_UPS[powerUpType];
    
    // Clear existing timeout for this power-up type
    if (powerUpTimeoutsRef.current[powerUpType]) {
      clearTimeout(powerUpTimeoutsRef.current[powerUpType]);
    }
    
    // Set new timeout
    const timeoutId = setTimeout(() => {
      removePowerUp(powerUpType);
      delete powerUpTimeoutsRef.current[powerUpType];
    }, effect.duration);
    
    powerUpTimeoutsRef.current[powerUpType] = timeoutId;
  }, [removePowerUp]);

  const clearPowerUpTimeout = useCallback((powerUpType) => {
    if (powerUpTimeoutsRef.current[powerUpType]) {
      clearTimeout(powerUpTimeoutsRef.current[powerUpType]);
      delete powerUpTimeoutsRef.current[powerUpType];
    }
  }, []);

  const clearAllPowerUpTimeouts = useCallback(() => {
    Object.values(powerUpTimeoutsRef.current).forEach(timeoutId => {
      clearTimeout(timeoutId);
    });
    powerUpTimeoutsRef.current = {};
  }, []);

  const hasActiveEffect = useCallback((effectType) => {
    return activeEffects.some(effect => effect.type === effectType);
  }, [activeEffects]);

  const getActiveEffects = useCallback(() => {
    return activeEffects;
  }, [activeEffects]);

  return {
    activatePowerUp,
    clearPowerUpTimeout,
    clearAllPowerUpTimeouts,
    hasActiveEffect,
    getActiveEffects
  };
};

