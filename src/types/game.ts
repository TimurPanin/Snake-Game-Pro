// Game Types
export interface Position {
  x: number;
  y: number;
}

export interface SnakeSegment extends Position {
  isHead?: boolean;
  isGhost?: boolean;
}

export interface Food extends Position {
  type: 'normal' | 'powerup';
  powerUpType?: PowerUpType;
}

export interface Wall extends Position {}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export type GameMode = 'Classic' | 'Speed' | 'Maze';

export type PowerUpType = 'Speed Boost' | 'Double Points' | 'Ghost Mode' | 'Shield' | 'Time Freeze' | 'Magnet';

export interface PowerUp {
  type: PowerUpType;
  duration: number;
  color: string;
  icon: string;
  description: string;
}

export interface ActiveEffect {
  type: PowerUpType;
  endTime: number;
}

export interface GameState {
  snake: SnakeSegment[];
  food: Food | null;
  powerUp: Food | null;
  walls: Wall[];
  direction: Direction;
  score: number;
  level: number;
  foodEaten: number;
  isPlaying: boolean;
  isPaused: boolean;
  gameOver: boolean;
  gameMode: GameMode;
  gameSpeed: number;
  activeEffects: ActiveEffect[];
  highScore: number;
}

export interface GameAction {
  type: string;
  payload?: any;
}

// Achievement Types
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (gameState: GameState) => boolean;
  unlocked: boolean;
  unlockedAt?: Date;
}

// Multiplayer Types
export interface Player {
  id: string;
  name: string;
  score: number;
  snake: SnakeSegment[];
  isAlive: boolean;
  color: string;
}

export interface MultiplayerGameState {
  players: Player[];
  food: Food[];
  walls: Wall[];
  gameMode: 'Battle' | 'Cooperative';
  isHost: boolean;
  roomId?: string;
}

// Sound Types
export interface SoundEffect {
  id: string;
  src: string;
  volume: number;
  loop?: boolean;
}

// Theme Types
export interface Theme {
  name: string;
  colors: {
    background: string;
    snake: string;
    food: string;
    powerUp: string;
    wall: string;
    text: string;
    button: string;
    buttonHover: string;
  };
}

// PWA Types
export interface PWAConfig {
  name: string;
  shortName: string;
  description: string;
  themeColor: string;
  backgroundColor: string;
  display: 'standalone' | 'fullscreen' | 'minimal-ui';
  icons: {
    src: string;
    sizes: string;
    type: string;
  }[];
}

// Export Types
export interface GameStats {
  score: number;
  level: number;
  foodEaten: number;
  gameMode: GameMode;
  duration: number;
  date: Date;
  achievements: Achievement[];
}

export interface ExportData {
  stats: GameStats[];
  achievements: Achievement[];
  settings: {
    theme: string;
    soundEnabled: boolean;
    musicEnabled: boolean;
  };
}
