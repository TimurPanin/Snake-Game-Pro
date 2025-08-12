// Game Configuration
export const GRID_SIZE = 25;
export const CELL_SIZE = 18;
export const INITIAL_SPEED = 150;
export const MIN_SPEED = 50;
export const SPEED_INCREMENT = 10;

// Initial Positions
export const INITIAL_SNAKE = [{ x: 12, y: 12 }];
export const INITIAL_FOOD = { x: 18, y: 18 };

// Game Mechanics
export const POWER_UP_CHANCE = 0.15;
export const WALL_PERCENTAGE = 0.1;
export const LEVEL_UP_FOOD_COUNT = 5;

// Directions
export const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 },
};

// Game Modes
export const GAME_MODES = {
  CLASSIC: { name: 'Classic', speed: 150, foodValue: 10 },
  SPEED: { name: 'Speed', speed: 80, foodValue: 15 },
  MAZE: { name: 'Maze', speed: 120, foodValue: 20 },
};

// Power-ups
export const POWER_UPS = {
  SPEED_BOOST: { name: 'Speed Boost', duration: 5000, color: '#ffd700', icon: '⚡', description: 'Увеличивает скорость на 5 секунд' },
  DOUBLE_POINTS: { name: 'Double Points', duration: 8000, color: '#ff69b4', icon: '💎', description: 'Удваивает очки на 8 секунд' },
  GHOST_MODE: { name: 'Ghost Mode', duration: 6000, color: '#00ffff', icon: '👻', description: 'Прохождение сквозь стены и себя на 6 секунд' },
  SHIELD: { name: 'Shield', duration: 10000, color: '#32CD32', icon: '🛡️', description: 'Защита от столкновений на 10 секунд' },
  TIME_FREEZE: { name: 'Time Freeze', duration: 4000, color: '#9370DB', icon: '⏰', description: 'Останавливает время на 4 секунды' },
  MAGNET: { name: 'Magnet', duration: 7000, color: '#FF4500', icon: '🧲', description: 'Притягивает еду к змейке на 7 секунд' },
};

// Local Storage Keys
export const STORAGE_KEYS = {
  HIGH_SCORE: 'snakeHighScore',
};

// Power-up Effects
export const POWER_UP_EFFECTS = {
  SPEED_BOOST_MULTIPLIER: 0.5,
  DOUBLE_POINTS_MULTIPLIER: 2,
};

