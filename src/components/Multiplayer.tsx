import React, { useState, useEffect } from 'react';
import { multiplayerManager } from '../utils/multiplayerManager';
import { Player, MultiplayerGameState } from '../types/game';

interface MultiplayerProps {
  isOpen: boolean;
  onClose: () => void;
}

const Multiplayer: React.FC<MultiplayerProps> = ({ isOpen, onClose }) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<string>('');
  const [playerName, setPlayerName] = useState<string>('');
  const [playerColor, setPlayerColor] = useState<string>('#4CAF50');
  const [gameState, setGameState] = useState<MultiplayerGameState | null>(null);
  const [error, setError] = useState<string>('');

  const colors = [
    '#4CAF50', '#2196F3', '#FF5722', '#9C27B0', 
    '#FF9800', '#00BCD4', '#E91E63', '#795548'
  ];

  useEffect(() => {
    if (isOpen) {
      // Set up event listeners
      multiplayerManager.onStateUpdate((state) => {
        setGameState(state);
      });

      multiplayerManager.onPlayerJoin((player) => {
        console.log('Player joined:', player.name);
      });

      multiplayerManager.onPlayerLeave((playerId) => {
        console.log('Player left:', playerId);
      });

      multiplayerManager.onGameStart(() => {
        console.log('Game started!');
      });

      multiplayerManager.onGameEnd((winner) => {
        alert(`Победитель: ${winner.name} с ${winner.score} очками!`);
      });

      // Check connection status
      setIsConnected(multiplayerManager.isConnected());
    }
  }, [isOpen]);

  const handleConnect = async () => {
    setIsConnecting(true);
    setError('');

    try {
      await multiplayerManager.connect();
      setIsConnected(true);
    } catch (error) {
      setError('Не удалось подключиться к серверу');
      console.error('Connection error:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    multiplayerManager.disconnect();
    setIsConnected(false);
    setGameState(null);
    setRoomId('');
  };

  const handleJoinRoom = () => {
    if (!playerName.trim()) {
      setError('Введите имя игрока');
      return;
    }

    setError('');
    multiplayerManager.setPlayerName(playerName);
    multiplayerManager.setPlayerColor(playerColor);
    multiplayerManager.joinRoom(roomId || undefined);
  };

  const handleLeaveRoom = () => {
    multiplayerManager.leaveRoom();
    setGameState(null);
    setRoomId('');
  };

  const handleStartGame = () => {
    if (multiplayerManager.isHost()) {
      multiplayerManager.startGame();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="multiplayer-overlay">
      <div className="multiplayer-modal">
        <div className="multiplayer-header">
          <h2>🌐 Мультиплеер</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="multiplayer-content">
          {/* Connection Status */}
          <div className="connection-section">
            <h3>🔗 Подключение</h3>
            <div className="connection-status">
              <span className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
                {isConnected ? '🟢 Подключено' : '🔴 Отключено'}
              </span>
            </div>
            
            {!isConnected ? (
              <button 
                className="connect-button"
                onClick={handleConnect}
                disabled={isConnecting}
              >
                {isConnecting ? 'Подключение...' : 'Подключиться'}
              </button>
            ) : (
              <button className="disconnect-button" onClick={handleDisconnect}>
                Отключиться
              </button>
            )}
          </div>

          {/* Player Settings */}
          {isConnected && (
            <div className="player-settings">
              <h3>👤 Настройки игрока</h3>
              
              <div className="input-group">
                <label>Имя игрока:</label>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Введите ваше имя"
                  maxLength={20}
                />
              </div>

              <div className="input-group">
                <label>Цвет змейки:</label>
                <div className="color-picker">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className={`color-option ${playerColor === color ? 'selected' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setPlayerColor(color)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Room Management */}
          {isConnected && (
            <div className="room-section">
              <h3>🏠 Комната</h3>
              
              {!gameState ? (
                <div className="join-room">
                  <div className="input-group">
                    <label>ID комнаты (оставьте пустым для создания новой):</label>
                    <input
                      type="text"
                      value={roomId}
                      onChange={(e) => setRoomId(e.target.value)}
                      placeholder="Введите ID комнаты"
                    />
                  </div>
                  
                  <button 
                    className="join-button"
                    onClick={handleJoinRoom}
                    disabled={!playerName.trim()}
                  >
                    {roomId ? 'Присоединиться к комнате' : 'Создать комнату'}
                  </button>
                </div>
              ) : (
                <div className="room-info">
                  <div className="room-details">
                    <p><strong>ID комнаты:</strong> {gameState.roomId}</p>
                    <p><strong>Режим:</strong> {gameState.gameMode}</p>
                    <p><strong>Игроков:</strong> {gameState.players.length}</p>
                    {multiplayerManager.isHost() && (
                      <p><strong>Статус:</strong> Хост</p>
                    )}
                  </div>

                  <div className="players-list">
                    <h4>Игроки в комнате:</h4>
                    {gameState.players.map((player) => (
                      <div 
                        key={player.id}
                        className="player-item"
                        style={{ borderLeftColor: player.color }}
                      >
                        <span className="player-name">{player.name}</span>
                        <span className="player-score">{player.score} очков</span>
                        <span className="player-status">
                          {player.isAlive ? '🟢' : '🔴'}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="room-actions">
                    {multiplayerManager.isHost() && (
                      <button className="start-game-button" onClick={handleStartGame}>
                        🎮 Начать игру
                      </button>
                    )}
                    <button className="leave-room-button" onClick={handleLeaveRoom}>
                      Покинуть комнату
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="error-message">
              ❌ {error}
            </div>
          )}
        </div>

        <div className="multiplayer-footer">
          <button className="close-button" onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default Multiplayer;
