import { GRID_SIZE, WALL_PERCENTAGE, POWER_UP_CHANCE, POWER_UPS, LEVEL_UP_FOOD_COUNT, MIN_SPEED, SPEED_INCREMENT } from '../constants/game';

// Position utilities
export const generateRandomPosition = (snake, walls = []) => {
  let position;
  let attempts = 0;
  const maxAttempts = GRID_SIZE * GRID_SIZE; // Prevent infinite loop
  
  do {
    position = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    attempts++;
  } while (
    attempts < maxAttempts && (
      snake.some((segment) => segment.x === position.x && segment.y === position.y) ||
      walls.some((wall) => wall.x === position.x && wall.y === position.y)
    )
  );
  
  return position;
};

export const generateWalls = () => {
  const newWalls = [];
  const wallCount = Math.floor(GRID_SIZE * WALL_PERCENTAGE);
  
  for (let i = 0; i < wallCount; i++) {
    newWalls.push(generateRandomPosition([], newWalls));
  }
  
  return newWalls;
};

// Collision detection
export const checkWallCollision = (head) => {
  return head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE;
};

export const checkWallCollisionWithWalls = (head, walls) => {
  return walls.some(wall => wall.x === head.x && wall.y === head.y);
};

export const checkSelfCollision = (head, snake) => {
  return snake.some((segment) => segment.x === head.x && segment.y === head.y);
};

export const checkCollision = (head, snake, walls, isGhostMode = false) => {
  if (isGhostMode) {
    // Ghost mode: wrap around edges
    if (head.x < 0) head.x = GRID_SIZE - 1;
    if (head.x >= GRID_SIZE) head.x = 0;
    if (head.y < 0) head.y = GRID_SIZE - 1;
    if (head.y >= GRID_SIZE) head.y = 0;
    return false; // No collision in ghost mode
  }
  
  // Wall collision
  if (checkWallCollision(head) || checkWallCollisionWithWalls(head, walls)) {
    return true;
  }
  
  // Self collision
  return checkSelfCollision(head, snake);
};

// Power-up utilities
export const shouldGeneratePowerUp = () => {
  return Math.random() < POWER_UP_CHANCE;
};

export const generateRandomPowerUp = (snake, walls) => {
  if (!shouldGeneratePowerUp()) return null;
  
  const powerUpTypes = Object.keys(POWER_UPS);
  const randomType = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
  const position = generateRandomPosition(snake, walls);
  
  return {
    type: randomType,
    position,
    ...POWER_UPS[randomType]
  };
};

// Game mechanics
export const calculatePoints = (basePoints, hasDoublePoints = false) => {
  return hasDoublePoints ? basePoints * 2 : basePoints;
};

export const shouldLevelUp = (foodEaten) => {
  return (foodEaten + 1) % LEVEL_UP_FOOD_COUNT === 0;
};

export const calculateNewSpeed = (currentSpeed) => {
  return Math.max(currentSpeed - SPEED_INCREMENT, MIN_SPEED);
};

export const calculateGameSpeed = (baseSpeed, hasSpeedBoost = false) => {
  return hasSpeedBoost ? baseSpeed * 0.5 : baseSpeed;
};

// Direction validation
export const isValidDirectionChange = (currentDirection, newDirection) => {
  return !(
    (currentDirection.x === 1 && newDirection.x === -1) ||
    (currentDirection.x === -1 && newDirection.x === 1) ||
    (currentDirection.y === 1 && newDirection.y === -1) ||
    (currentDirection.y === -1 && newDirection.y === 1)
  );
};

