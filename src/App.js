import React, { useState, useEffect, useCallback, useRef } from 'react';
import { DIRECTIONS, GAME_MODES } from './constants/game';
import { 
  checkCollision, 
  generateRandomPosition, 
  generateWalls, 
  generateRandomPowerUp,
  calculatePoints,
  shouldLevelUp,
  calculateNewSpeed,
  isValidDirectionChange
} from './utils/gameUtils';
import { useGameState } from './hooks/useGameState';
import { usePowerUps } from './hooks/usePowerUps';
import { useGameLoop } from './hooks/useGameLoop';
import { useHighScore } from './hooks/useHighScore';
import soundManager from './utils/soundManager';
import GameStats from './components/GameStats';
import GameBoard from './components/GameBoard';
import GameControls from './components/GameControls';
import GameMenu from './components/GameMenu';
import GameOver from './components/GameOver';

function App() {
  const { state, actions } = useGameState();
  const { highScore, updateHighScore } = useHighScore();
  const { 
    activatePowerUp, 
    clearAllPowerUpTimeouts, 
    hasActiveEffect 
  } = usePowerUps(state.activeEffects, actions.removePowerUp);

  const [direction, setDirection] = useState(DIRECTIONS.ArrowRight);
  const gameBoardRef = useRef(null);

  // Game tick function - optimized with useCallback
  const gameTick = useCallback(() => {
    if (state.gameOver || !state.isPlaying || state.isPaused) return;

    const newSnake = [...state.snake];
    const head = { ...newSnake[0] };
    head.x += direction.x;
    head.y += direction.y;

    // Check collision with optimized collision detection
    const isGhostMode = hasActiveEffect('GHOST_MODE');
    if (checkCollision(head, state.snake, state.walls, isGhostMode)) {
      soundManager.play('gameOver');
      actions.gameOver();
      updateHighScore(state.score);
      return;
    }

    newSnake.unshift(head);

    // Check if food is eaten
    if (head.x === state.food.x && head.y === state.food.y) {
      soundManager.play('eat');
      const hasDoublePoints = hasActiveEffect('DOUBLE_POINTS');
      const points = calculatePoints(state.gameMode.foodValue, hasDoublePoints);
      const newFood = generateRandomPosition(state.snake, state.walls);
      const newPowerUp = generateRandomPowerUp(state.snake, state.walls);
      
      actions.eatFood(newFood, points, newPowerUp);
      
      // Level up logic
      if (shouldLevelUp(state.foodEaten)) {
        soundManager.play('levelUp');
        const newSpeed = calculateNewSpeed(state.gameSpeed);
        actions.updateLevel(newSpeed);
      }
    } else {
      newSnake.pop();
    }

    // Check if power-up is collected
    if (state.powerUp && head.x === state.powerUp.position.x && head.y === state.powerUp.position.y) {
      soundManager.play('powerup');
      const effect = { type: state.powerUp.type, ...state.powerUp };
      actions.collectPowerUp(effect);
      activatePowerUp(state.powerUp.type);
    }

    actions.moveSnake(newSnake);
  }, [
    state.gameOver, 
    state.isPlaying, 
    state.isPaused, 
    state.snake, 
    state.food, 
    state.powerUp, 
    state.walls, 
    state.gameMode, 
    state.foodEaten, 
    state.gameSpeed,
    direction,
    actions,
    hasActiveEffect,
    activatePowerUp,
    updateHighScore
  ]);

  // Game loop hook
  useGameLoop(
    state.isPlaying, 
    state.isPaused, 
    state.gameSpeed, 
    state.activeEffects, 
    gameTick
  );

  // Keyboard event handler
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (state.gameOver) return;

      // Pause/Resume
      if (e.key === ' ' || e.key === 'p') {
        e.preventDefault();
        if (state.isPlaying) {
          if (state.isPaused) {
            actions.resumeGame();
          } else {
            actions.pauseGame();
          }
        }
        return;
      }

      if (!state.isPlaying || state.isPaused) return;

      // Handle both arrow keys and WASD
      let newDirection = null;
      if (DIRECTIONS[e.key]) {
        newDirection = DIRECTIONS[e.key];
      } else if (e.key.toLowerCase() === 'w') {
        newDirection = DIRECTIONS.w;
      } else if (e.key.toLowerCase() === 's') {
        newDirection = DIRECTIONS.s;
      } else if (e.key.toLowerCase() === 'a') {
        newDirection = DIRECTIONS.a;
      } else if (e.key.toLowerCase() === 'd') {
        newDirection = DIRECTIONS.d;
      }

      if (newDirection && isValidDirectionChange(direction, newDirection)) {
        setDirection(newDirection);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, state.isPlaying, state.isPaused, state.gameOver, actions]);

  // Start game handler
  const handleStartGame = useCallback((mode) => {
    soundManager.play('levelUp'); // Play start sound
    const walls = mode === GAME_MODES.MAZE ? generateWalls() : [];
    actions.startGame(mode, walls);
    setDirection(DIRECTIONS.ArrowRight);
    clearAllPowerUpTimeouts();
  }, [actions, clearAllPowerUpTimeouts]);

  // Pause toggle handler
  const handlePauseToggle = useCallback(() => {
    if (state.isPaused) {
      actions.resumeGame();
    } else {
      actions.pauseGame();
    }
  }, [state.isPaused, actions]);

  // Restart handler
  const handleRestart = useCallback(() => {
    actions.resetGame();
    setDirection(DIRECTIONS.ArrowRight);
    clearAllPowerUpTimeouts();
  }, [actions, clearAllPowerUpTimeouts]);

  // Return to menu handler
  const handleReturnToMenu = useCallback(() => {
    actions.returnToMenu();
    setDirection(DIRECTIONS.ArrowRight);
    clearAllPowerUpTimeouts();
  }, [actions, clearAllPowerUpTimeouts]);

  return (
    <div className="game-container">
      <div className="header">
        <h1>🐍 Snake Game Pro</h1>
        <GameStats 
          score={state.score} 
          highScore={highScore} 
          level={state.level} 
        />
      </div>

      {!state.isPlaying && (
        <GameMenu onStartGame={handleStartGame} />
      )}

      {state.isPlaying && (
        <>
          <GameControls
            isPaused={state.isPaused}
            onPauseToggle={handlePauseToggle}
            onRestart={handleRestart}
            activeEffects={state.activeEffects}
          />
          
          {state.isPaused && (
            <div className="pause-overlay">
              <div className="pause-message">PAUSED</div>
              <button onClick={handlePauseToggle} className="resume-button">
                Resume
              </button>
            </div>
          )}

          <GameBoard
            snake={state.snake}
            food={state.food}
            powerUp={state.powerUp}
            walls={state.walls}
            activeEffects={state.activeEffects}
            gameBoardRef={gameBoardRef}
          />
        </>
      )}

      {state.gameOver && (
        <GameOver
          score={state.score}
          level={state.level}
          onPlayAgain={handleRestart}
          onMainMenu={handleReturnToMenu}
        />
      )}
    </div>
  );
}

export default App;


