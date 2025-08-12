import { Player, MultiplayerGameState, Food, Wall } from '../types/game';

export class MultiplayerManager {
  private socket: WebSocket | null = null;
  private roomId: string | null = null;
  private playerId: string | null = null;
  private gameState: MultiplayerGameState | null = null;
  private onStateUpdate: ((state: MultiplayerGameState) => void) | null = null;
  private onPlayerJoin: ((player: Player) => void) | null = null;
  private onPlayerLeave: ((playerId: string) => void) | null = null;
  private onGameStart: (() => void) | null = null;
  private onGameEnd: ((winner: Player) => void) | null = null;

  constructor() {
    this.generatePlayerId();
  }

  private generatePlayerId(): void {
    this.playerId = `player_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Connect to multiplayer server
  connect(serverUrl: string = 'wss://snake-multiplayer-server.herokuapp.com'): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.socket = new WebSocket(serverUrl);
        
        this.socket.onopen = () => {
          console.log('Connected to multiplayer server');
          resolve();
        };

        this.socket.onmessage = (event) => {
          this.handleMessage(JSON.parse(event.data));
        };

        this.socket.onerror = (error) => {
          console.error('WebSocket error:', error);
          reject(error);
        };

        this.socket.onclose = () => {
          console.log('Disconnected from multiplayer server');
          this.cleanup();
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  // Create or join a room
  joinRoom(roomId?: string): void {
    if (!this.socket) {
      throw new Error('Not connected to server');
    }

    this.roomId = roomId || this.generateRoomId();
    
    this.socket.send(JSON.stringify({
      type: 'join_room',
      roomId: this.roomId,
      playerId: this.playerId
    }));
  }

  // Leave current room
  leaveRoom(): void {
    if (this.socket && this.roomId) {
      this.socket.send(JSON.stringify({
        type: 'leave_room',
        roomId: this.roomId,
        playerId: this.playerId
      }));
    }
    this.roomId = null;
    this.gameState = null;
  }

  // Send player movement
  sendMovement(direction: string): void {
    if (this.socket && this.roomId && this.playerId) {
      this.socket.send(JSON.stringify({
        type: 'movement',
        roomId: this.roomId,
        playerId: this.playerId,
        direction
      }));
    }
  }

  // Send player action (pause, restart, etc.)
  sendAction(action: string): void {
    if (this.socket && this.roomId && this.playerId) {
      this.socket.send(JSON.stringify({
        type: 'action',
        roomId: this.roomId,
        playerId: this.playerId,
        action
      }));
    }
  }

  // Set player name
  setPlayerName(name: string): void {
    if (this.socket && this.roomId && this.playerId) {
      this.socket.send(JSON.stringify({
        type: 'set_name',
        roomId: this.roomId,
        playerId: this.playerId,
        name
      }));
    }
  }

  // Set player color
  setPlayerColor(color: string): void {
    if (this.socket && this.roomId && this.playerId) {
      this.socket.send(JSON.stringify({
        type: 'set_color',
        roomId: this.roomId,
        playerId: this.playerId,
        color
      }));
    }
  }

  // Start game
  startGame(): void {
    if (this.socket && this.roomId && this.playerId) {
      this.socket.send(JSON.stringify({
        type: 'start_game',
        roomId: this.roomId,
        playerId: this.playerId
      }));
    }
  }

  // Handle incoming messages
  private handleMessage(message: any): void {
    switch (message.type) {
      case 'room_joined':
        this.handleRoomJoined(message);
        break;
      case 'player_joined':
        this.handlePlayerJoined(message);
        break;
      case 'player_left':
        this.handlePlayerLeft(message);
        break;
      case 'game_state':
        this.handleGameState(message);
        break;
      case 'game_started':
        this.handleGameStarted(message);
        break;
      case 'game_ended':
        this.handleGameEnded(message);
        break;
      case 'error':
        this.handleError(message);
        break;
    }
  }

  private handleRoomJoined(message: any): void {
    this.gameState = {
      players: message.players || [],
      food: message.food || [],
      walls: message.walls || [],
      gameMode: message.gameMode || 'Battle',
      isHost: message.isHost || false,
      roomId: this.roomId!
    };
    
    if (this.onStateUpdate) {
      this.onStateUpdate(this.gameState);
    }
  }

  private handlePlayerJoined(message: any): void {
    const newPlayer: Player = {
      id: message.playerId,
      name: message.name || `Player ${message.playerId}`,
      score: 0,
      snake: [],
      isAlive: true,
      color: message.color || '#4CAF50'
    };

    if (this.gameState) {
      this.gameState.players.push(newPlayer);
      if (this.onStateUpdate) {
        this.onStateUpdate(this.gameState);
      }
    }

    if (this.onPlayerJoin) {
      this.onPlayerJoin(newPlayer);
    }
  }

  private handlePlayerLeft(message: any): void {
    if (this.gameState) {
      this.gameState.players = this.gameState.players.filter(
        p => p.id !== message.playerId
      );
      if (this.onStateUpdate) {
        this.onStateUpdate(this.gameState);
      }
    }

    if (this.onPlayerLeave) {
      this.onPlayerLeave(message.playerId);
    }
  }

  private handleGameState(message: any): void {
    this.gameState = {
      players: message.players,
      food: message.food,
      walls: message.walls,
      gameMode: message.gameMode,
      isHost: this.gameState?.isHost || false,
      roomId: this.roomId!
    };

    if (this.onStateUpdate) {
      this.onStateUpdate(this.gameState);
    }
  }

  private handleGameStarted(message: any): void {
    if (this.onGameStart) {
      this.onGameStart();
    }
  }

  private handleGameEnded(message: any): void {
    if (this.onGameEnd && message.winner) {
      this.onGameEnd(message.winner);
    }
  }

  private handleError(message: any): void {
    console.error('Multiplayer error:', message.error);
  }

  // Event handlers
  onStateUpdate(callback: (state: MultiplayerGameState) => void): void {
    this.onStateUpdate = callback;
  }

  onPlayerJoin(callback: (player: Player) => void): void {
    this.onPlayerJoin = callback;
  }

  onPlayerLeave(callback: (playerId: string) => void): void {
    this.onPlayerLeave = callback;
  }

  onGameStart(callback: () => void): void {
    this.onGameStart = callback;
  }

  onGameEnd(callback: (winner: Player) => void): void {
    this.onGameEnd = callback;
  }

  // Getters
  getCurrentState(): MultiplayerGameState | null {
    return this.gameState;
  }

  getPlayerId(): string | null {
    return this.playerId;
  }

  getRoomId(): string | null {
    return this.roomId;
  }

  isConnected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN;
  }

  isHost(): boolean {
    return this.gameState?.isHost || false;
  }

  // Utility methods
  private generateRoomId(): string {
    return `room_${Math.random().toString(36).substr(2, 9)}`;
  }

  private cleanup(): void {
    this.socket = null;
    this.roomId = null;
    this.gameState = null;
  }

  // Disconnect from server
  disconnect(): void {
    if (this.socket) {
      this.socket.close();
    }
    this.cleanup();
  }
}

// Singleton instance
export const multiplayerManager = new MultiplayerManager();
