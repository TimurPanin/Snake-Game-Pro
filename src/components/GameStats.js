import React from 'react';
import PropTypes from 'prop-types';

const GameStats = ({ score, highScore, level }) => {
  return (
    <div className="stats">
      <div className="stat">
        <span className="label">Score:</span>
        <span className="value">{score}</span>
      </div>
      <div className="stat">
        <span className="label">High Score:</span>
        <span className="value">{highScore}</span>
      </div>
      <div className="stat">
        <span className="label">Level:</span>
        <span className="value">{level}</span>
      </div>
    </div>
  );
};

GameStats.propTypes = {
  score: PropTypes.number.isRequired,
  highScore: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired
};

export default GameStats;
