import React from 'react';
import soundManager from '../utils/soundManager';

const GameControls = ({ 
  isPaused, 
  onPauseToggle, 
  onRestart, 
  activeEffects 
}) => {
  return (
    <>
      <div className="controls-info">
        <p>Controls: Arrow Keys or WASD | Pause: Space/P</p>
      </div>
      
      <div className="active-effects">
        {activeEffects.map((effect, index) => (
          <div 
            key={index} 
            className="effect-badge" 
            style={{ backgroundColor: effect.color }}
          >
            {effect.name}
          </div>
        ))}
      </div>

      <div className="game-controls">
        <button onClick={onPauseToggle} className="control-button">
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        <button onClick={onRestart} className="control-button">
          Restart
        </button>
        <button 
          onClick={() => soundManager.toggleMute()} 
          className="control-button sound-button"
        >
          {soundManager.isSoundMuted() ? '🔇' : '🔊'}
        </button>
      </div>
    </>
  );
};

export default GameControls;

