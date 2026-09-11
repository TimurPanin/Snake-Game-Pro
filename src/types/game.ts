export interface Position {
  x: number;
  y: number;
}

export interface SnakeSegment extends Position {}

export interface Wall extends Position {}

export interface Food extends Position {}

export type GameModeName = 'Classic' | 'Speed' | 'Maze';

export type PowerUpType = 'SPEED_BOOST' | 'DOUBLE_POINTS' | 'GHOST_MODE';

export interface PowerUp {
  type: PowerUpType;
  name: string;
  position: Position;
  duration: number;
  color: string;
  icon: string;
  description: string;
}

export interface ActiveEffect extends Omit<PowerUp, 'position'> {
  position?: Position;
}
