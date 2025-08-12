import React from 'react';
import PropTypes from 'prop-types';
import { GRID_SIZE, CELL_SIZE } from '../constants/game';

const GameBoard = ({ 
  snake, 
  food, 
  powerUp, 
  walls, 
  activeEffects,
  gameBoardRef 
}) => {
  const hasGhostMode = activeEffects.some(effect => effect.type === 'GHOST_MODE');

  return (
    <div
      ref={gameBoardRef}
      className="game-board"
      style={{
        width: GRID_SIZE * CELL_SIZE,
        height: GRID_SIZE * CELL_SIZE,
      }}
    >
      {/* Render walls */}
      {walls.map((wall, index) => (
        <div
          key={`wall-${index}`}
          className="wall"
          style={{
            left: wall.x * CELL_SIZE,
            top: wall.y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE,
          }}
        />
      ))}

      {/* Render snake */}
      {snake.map((segment, index) => (
        <div
          key={index}
          className={`snake-segment ${index === 0 ? 'head' : ''} ${
            hasGhostMode ? 'ghost' : ''
          }`}
          style={{
            left: segment.x * CELL_SIZE,
            top: segment.y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE,
          }}
        />
      ))}

      {/* Render food */}
      <div
        className="food"
        style={{
          left: food.x * CELL_SIZE,
          top: food.y * CELL_SIZE,
          width: CELL_SIZE,
          height: CELL_SIZE,
        }}
      />

      {/* Render power-up */}
      {powerUp && (
        <div
          className="power-up"
          style={{
            left: powerUp.position.x * CELL_SIZE,
            top: powerUp.position.y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE,
            backgroundColor: powerUp.color,
          }}
        />
      )}
    </div>
  );
};

GameBoard.propTypes = {
  snake: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    })
  ).isRequired,
  food: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
  powerUp: PropTypes.shape({
    type: PropTypes.string.isRequired,
    position: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }).isRequired,
    color: PropTypes.string.isRequired
  }),
  walls: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    })
  ).isRequired,
  activeEffects: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired
    })
  ).isRequired,
  gameBoardRef: PropTypes.object
};

export default GameBoard;
