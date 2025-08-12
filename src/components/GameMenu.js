import React from 'react';
import PropTypes from 'prop-types';
import { GAME_MODES } from '../constants/game';

const GameMenu = ({ onStartGame }) => {
  return (
    <div className="menu">
      <h2>Select Game Mode</h2>
      <div className="mode-buttons">
        {Object.values(GAME_MODES).map((mode) => (
          <button
            key={mode.name}
            onClick={() => onStartGame(mode)}
            className="mode-button"
          >
            <h3>{mode.name}</h3>
            <p>Speed: {mode.speed}ms</p>
            <p>Points: {mode.foodValue}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

GameMenu.propTypes = {
  onStartGame: PropTypes.func.isRequired
};

export default GameMenu;

