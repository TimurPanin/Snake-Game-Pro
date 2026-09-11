import React, { useState } from 'react';
import PropTypes from 'prop-types';
import soundManager from '../utils/soundManager';

const GameControls = ({
  isPaused,
  onPauseToggle,
  onRestart,
  activeEffects
}) => {
  const [isMuted, setIsMuted] = useState(soundManager.isSoundMuted());

  const handleSoundToggle = () => {
    const enabled = soundManager.toggleMute();
    setIsMuted(!enabled);
  };

  return (
    <>
      <div className="controls-info">
        <p>Controls: Arrow Keys or WASD | Pause: Space/P</p>
      </div>

      <div className="active-effects">
        {activeEffects.map((effect, index) => (
          <div
            key={`${effect.type}-${index}`}
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
          onClick={handleSoundToggle}
          className="control-button sound-button"
          aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
          title={isMuted ? 'Unmute sound' : 'Mute sound'}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
      </div>
    </>
  );
};

GameControls.propTypes = {
  isPaused: PropTypes.bool.isRequired,
  onPauseToggle: PropTypes.func.isRequired,
  onRestart: PropTypes.func.isRequired,
  activeEffects: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      name: PropTypes.string,
      color: PropTypes.string
    })
  ).isRequired
};

export default GameControls;
