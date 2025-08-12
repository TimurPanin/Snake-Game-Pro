import React from 'react';

const GameOver = ({ score, level, onPlayAgain, onMainMenu }) => {
  return (
    <div className="game-over-overlay">
      <div className="game-over-content">
        <h2>Game Over!</h2>
        <p>Final Score: {score}</p>
        <p>Level Reached: {level}</p>
        <div className="game-over-buttons">
          <button onClick={onPlayAgain} className="restart-button">
            Play Again
          </button>
          <button onClick={onMainMenu} className="menu-button">
            Main Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOver;

