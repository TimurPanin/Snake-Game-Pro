import { STORAGE_KEYS } from '../constants/game';

export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Failed to get item from localStorage (${key}):`, error);
      return defaultValue;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn(`Failed to set item in localStorage (${key}):`, error);
      return false;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn(`Failed to remove item from localStorage (${key}):`, error);
      return false;
    }
  },

  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
      return false;
    }
  }
};

// Game-specific storage functions
export const gameStorage = {
  getHighScore: () => {
    const score = storage.get(STORAGE_KEYS.HIGH_SCORE);
    return typeof score === 'number' ? score : 0;
  },

  setHighScore: (score) => {
    if (typeof score === 'number' && score >= 0) {
      return storage.set(STORAGE_KEYS.HIGH_SCORE, score);
    }
    return false;
  },

  clearHighScore: () => {
    return storage.remove(STORAGE_KEYS.HIGH_SCORE);
  }
};

