import { useReducer, useCallback } from 'react';
import { 
  INITIAL_SNAKE, 
  INITIAL_FOOD, 
  INITIAL_SPEED, 
  DIRECTIONS, 
  GAME_MODES 
} from '../constants/game';

// Action types
const ACTIONS = {
  START_GAME: 'START_GAME',
  MOVE_SNAKE: 'MOVE_SNAKE',
  EAT_FOOD: 'EAT_FOOD',
  COLLECT_POWER_UP: 'COLLECT_POWER_UP',
  GAME_OVER: 'GAME_OVER',
  PAUSE_GAME: 'PAUSE_GAME',
  RESUME_GAME: 'RESUME_GAME',
  RESET_GAME: 'RESET_GAME',
  UPDATE_SCORE: 'UPDATE_SCORE',
  UPDATE_LEVEL: 'UPDATE_LEVEL',
  SET_POWER_UP: 'SET_POWER_UP',
  REMOVE_POWER_UP: 'REMOVE_POWER_UP',
  SET_WALLS: 'SET_WALLS',
  RETURN_TO_MENU: 'RETURN_TO_MENU'
};

// Initial state
const initialState = {
  snake: INITIAL_SNAKE,
  food: INITIAL_FOOD,
  powerUp: null,
  direction: DIRECTIONS.ArrowRight,
  gameOver: false,
  score: 0,
  isPlaying: false,
  isPaused: false,
  gameMode: GAME_MODES.CLASSIC,
  gameSpeed: INITIAL_SPEED,
  walls: [],
  level: 1,
  foodEaten: 0,
  activeEffects: []
};

// Reducer function
const gameReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.START_GAME:
      return {
        ...initialState,
        gameMode: action.payload.mode,
        gameSpeed: action.payload.mode.speed,
        isPlaying: true,
        walls: action.payload.walls || []
      };

    case ACTIONS.MOVE_SNAKE:
      return {
        ...state,
        snake: action.payload.snake
      };

    case ACTIONS.EAT_FOOD:
      return {
        ...state,
        food: action.payload.newFood,
        foodEaten: state.foodEaten + 1,
        score: state.score + action.payload.points,
        powerUp: action.payload.newPowerUp
      };

    case ACTIONS.COLLECT_POWER_UP:
      return {
        ...state,
        powerUp: null,
        activeEffects: [...state.activeEffects, action.payload.effect]
      };

    case ACTIONS.GAME_OVER:
      return {
        ...state,
        gameOver: true,
        isPlaying: false
      };

    case ACTIONS.PAUSE_GAME:
      return {
        ...state,
        isPaused: true
      };

    case ACTIONS.RESUME_GAME:
      return {
        ...state,
        isPaused: false
      };

    case ACTIONS.RESET_GAME:
      return {
        ...initialState,
        gameMode: state.gameMode,
        gameSpeed: state.gameMode.speed,
        isPlaying: true,
        walls: state.walls
      };

    case ACTIONS.UPDATE_SCORE:
      return {
        ...state,
        score: action.payload.score
      };

    case ACTIONS.UPDATE_LEVEL:
      return {
        ...state,
        level: state.level + 1,
        gameSpeed: action.payload.newSpeed
      };

    case ACTIONS.SET_POWER_UP:
      return {
        ...state,
        powerUp: action.payload.powerUp
      };

    case ACTIONS.REMOVE_POWER_UP:
      return {
        ...state,
        activeEffects: state.activeEffects.filter(
          effect => effect.type !== action.payload.powerUpType
        )
      };

    case ACTIONS.SET_WALLS:
      return {
        ...state,
        walls: action.payload.walls
      };

    case ACTIONS.RETURN_TO_MENU:
      return {
        ...initialState
      };

    default:
      return state;
  }
};

// Custom hook
export const useGameState = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const startGame = useCallback((mode, walls = []) => {
    dispatch({ type: ACTIONS.START_GAME, payload: { mode, walls } });
  }, []);

  const moveSnake = useCallback((newSnake) => {
    dispatch({ type: ACTIONS.MOVE_SNAKE, payload: { snake: newSnake } });
  }, []);

  const eatFood = useCallback((newFood, points, newPowerUp) => {
    dispatch({ 
      type: ACTIONS.EAT_FOOD, 
      payload: { newFood, points, newPowerUp } 
    });
  }, []);

  const collectPowerUp = useCallback((effect) => {
    dispatch({ type: ACTIONS.COLLECT_POWER_UP, payload: { effect } });
  }, []);

  const gameOver = useCallback(() => {
    dispatch({ type: ACTIONS.GAME_OVER });
  }, []);

  const pauseGame = useCallback(() => {
    dispatch({ type: ACTIONS.PAUSE_GAME });
  }, []);

  const resumeGame = useCallback(() => {
    dispatch({ type: ACTIONS.RESUME_GAME });
  }, []);

  const resetGame = useCallback(() => {
    dispatch({ type: ACTIONS.RESET_GAME });
  }, []);

  const updateScore = useCallback((score) => {
    dispatch({ type: ACTIONS.UPDATE_SCORE, payload: { score } });
  }, []);

  const updateLevel = useCallback((newSpeed) => {
    dispatch({ type: ACTIONS.UPDATE_LEVEL, payload: { newSpeed } });
  }, []);

  const setPowerUp = useCallback((powerUp) => {
    dispatch({ type: ACTIONS.SET_POWER_UP, payload: { powerUp } });
  }, []);

  const removePowerUp = useCallback((powerUpType) => {
    dispatch({ type: ACTIONS.REMOVE_POWER_UP, payload: { powerUpType } });
  }, []);

  const setWalls = useCallback((walls) => {
    dispatch({ type: ACTIONS.SET_WALLS, payload: { walls } });
  }, []);

  const returnToMenu = useCallback(() => {
    dispatch({ type: ACTIONS.RETURN_TO_MENU });
  }, []);

  return {
    state,
    actions: {
      startGame,
      moveSnake,
      eatFood,
      collectPowerUp,
      gameOver,
      pauseGame,
      resumeGame,
      resetGame,
      updateScore,
      updateLevel,
      setPowerUp,
      removePowerUp,
      setWalls,
      returnToMenu
    }
  };
};

