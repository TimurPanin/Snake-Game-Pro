import React from 'react';
import PropTypes from 'prop-types';

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

GameOver.propTypes = {
  score: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
  onPlayAgain: PropTypes.func.isRequired,
  onMainMenu: PropTypes.func.isRequired
};

export default GameOver;

