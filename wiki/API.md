# API документация

Полная документация API компонентов, хуков и утилит Snake Game Pro.

## 🧩 Компоненты

### GameBoard

Основной компонент игрового поля.

#### Props

```typescript
interface GameBoardProps {
  snake: SnakeSegment[];
  food: Food | null;
  powerUp: PowerUp | null;
  walls: Wall[];
  activeEffects: ActiveEffect[];
}
```

#### Пример использования

```jsx
<GameBoard
  snake={[{ x: 0, y: 0 }, { x: 1, y: 0 }]}
  food={{ x: 5, y: 5 }}
  powerUp={null}
  walls={[]}
  activeEffects={[]}
/>
```

### GameControls

Компонент управления игрой.

#### Props

```typescript
interface GameControlsProps {
  isPaused: boolean;
  onPauseToggle: () => void;
  onRestart: () => void;
  activeEffects: ActiveEffect[];
}
```

#### Пример использования

```jsx
<GameControls
  isPaused={false}
  onPauseToggle={() => setIsPaused(!isPaused)}
  onRestart={() => restartGame()}
  activeEffects={activeEffects}
/>
```

### GameStats

Компонент отображения статистики.

#### Props

```typescript
interface GameStatsProps {
  score: number;
  highScore: number;
  level: number;
}
```

#### Пример использования

```jsx
<GameStats
  score={150}
  highScore={500}
  level={3}
/>
```

### GameMenu

Компонент меню выбора режима.

#### Props

```typescript
interface GameMenuProps {
  onStartGame: (mode: GameMode) => void;
}
```

#### Пример использования

```jsx
<GameMenu onStartGame={(mode) => startGame(mode)} />
```

### GameOver

Компонент экрана окончания игры.

#### Props

```typescript
interface GameOverProps {
  score: number;
  level: number;
  onPlayAgain: () => void;
  onMainMenu: () => void;
}
```

#### Пример использования

```jsx
<GameOver
  score={250}
  level={5}
  onPlayAgain={() => restartGame()}
  onMainMenu={() => setGameOver(false)}
/>
```

## 🎣 Хуки

### useGameState

Хук для управления состоянием игры.

#### Параметры

```typescript
useGameState(initialMode?: GameMode): {
  gameState: GameState;
  startGame: (mode: GameMode) => void;
  moveSnake: (direction: Direction) => void;
  pauseGame: () => void;
  resumeGame: () => void;
  restartGame: () => void;
  gameOver: () => void;
}
```

#### Пример использования

```javascript
const {
  gameState,
  startGame,
  moveSnake,
  pauseGame,
  resumeGame,
  restartGame,
  gameOver
} = useGameState('CLASSIC');

// Запуск игры
startGame('SPEED');

// Движение змейки
moveSnake('UP');

// Пауза
pauseGame();
```

### useGameLoop

Хук для управления игровым циклом.

#### Параметры

```typescript
useGameLoop(
  isPlaying: boolean,
  speed: number,
  onTick: () => void
): void
```

#### Пример использования

```javascript
useGameLoop(
  isPlaying,
  gameSpeed,
  () => {
    // Логика игрового тика
    moveSnake(currentDirection);
  }
);
```

### usePowerUps

Хук для управления пауэр-апами.

#### Возвращаемые значения

```typescript
{
  activeEffects: ActiveEffect[];
  activatePowerUp: (powerUp: PowerUp) => void;
  clearExpiredEffects: () => void;
  hasEffect: (type: PowerUpType) => boolean;
}
```

#### Пример использования

```javascript
const {
  activeEffects,
  activatePowerUp,
  clearExpiredEffects,
  hasEffect
} = usePowerUps();

// Активация пауэр-апа
activatePowerUp({
  type: 'SPEED_BOOST',
  duration: 5000,
  color: '#FFD700'
});

// Проверка активного эффекта
if (hasEffect('SHIELD')) {
  console.log('Щит активен!');
}
```

### useHighScore

Хук для управления рекордами.

#### Возвращаемые значения

```typescript
{
  highScore: number;
  updateHighScore: (score: number) => void;
  resetHighScore: () => void;
}
```

#### Пример использования

```javascript
const { highScore, updateHighScore, resetHighScore } = useHighScore();

// Обновление рекорда
if (currentScore > highScore) {
  updateHighScore(currentScore);
}

// Сброс рекорда
resetHighScore();
```

## 🛠 Утилиты

### gameUtils

Утилиты для игровой логики.

#### generateFood()

Генерирует новую еду на поле.

```typescript
generateFood(snake: SnakeSegment[], walls: Wall[]): Food
```

#### generateWalls()

Генерирует стены для Maze режима.

```typescript
generateWalls(gridSize: number, wallPercentage: number): Wall[]
```

#### checkCollision()

Проверяет столкновения.

```typescript
checkCollision(
  snake: SnakeSegment[],
  food: Food,
  walls: Wall[],
  gameMode: GameMode
): CollisionResult
```

#### moveSnake()

Двигает змейку в указанном направлении.

```typescript
moveSnake(
  snake: SnakeSegment[],
  direction: Direction,
  gridSize: number
): SnakeSegment[]
```

#### calculatePoints()

Вычисляет очки за съеденную еду.

```typescript
calculatePoints(level: number, basePoints: number = 10): number
```

#### calculateSpeed()

Вычисляет скорость игры на основе уровня.

```typescript
calculateSpeed(level: number, baseSpeed: number): number
```

### soundManager

Менеджер звуковой системы.

#### Методы

```typescript
class SoundManager {
  // Воспроизведение звука
  play(soundId: string): void;
  
  // Остановка звука
  stop(soundId: string): void;
  
  // Остановка всех звуков
  stopAll(): void;
  
  // Установка громкости
  setVolume(volume: number): void;
  
  // Получение громкости
  getVolume(): number;
  
  // Включение/выключение звука
  enable(): void;
  disable(): void;
  
  // Переключение звука
  toggleMute(): boolean;
  
  // Проверка статуса звука
  isSoundEnabled(): boolean;
  isSoundMuted(): boolean;
  
  // Специальные методы для игровых событий
  playEat(): void;
  playPowerUp(): void;
  playGameOver(): void;
  playLevelUp(): void;
  playAchievement(): void;
  playBackground(): void;
  stopBackground(): void;
}
```

#### Пример использования

```javascript
import soundManager from './utils/soundManager';

// Воспроизведение звука еды
soundManager.playEat();

// Воспроизведение пауэр-апа
soundManager.playPowerUp();

// Управление громкостью
soundManager.setVolume(0.7);

// Переключение звука
soundManager.toggleMute();
```

### storage

Утилиты для работы с localStorage.

#### Методы

```typescript
// Сохранение данных
saveToStorage(key: string, data: any): void;

// Загрузка данных
loadFromStorage(key: string, defaultValue?: any): any;

// Удаление данных
removeFromStorage(key: string): void;

// Очистка всех данных
clearStorage(): void;
```

#### Пример использования

```javascript
import { saveToStorage, loadFromStorage } from './utils/storage';

// Сохранение рекорда
saveToStorage('snakeHighScore', 500);

// Загрузка рекорда
const highScore = loadFromStorage('snakeHighScore', 0);
```

## 📊 Типы данных

### Основные типы

```typescript
interface Position {
  x: number;
  y: number;
}

interface SnakeSegment extends Position {
  // Дополнительные свойства сегмента змейки
}

interface Food extends Position {
  // Свойства еды
}

interface PowerUp extends Position {
  type: PowerUpType;
  duration: number;
  color: string;
  icon: string;
  description: string;
}

interface Wall extends Position {
  // Свойства стены
}

interface ActiveEffect {
  type: PowerUpType;
  endTime: number;
}

interface GameState {
  isPlaying: boolean;
  gameMode: GameMode;
  snake: SnakeSegment[];
  food: Food | null;
  powerUp: PowerUp | null;
  walls: Wall[];
  direction: Direction;
  score: number;
  level: number;
  speed: number;
  isPaused: boolean;
  gameOver: boolean;
}
```

### Перечисления

```typescript
enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

enum GameMode {
  CLASSIC = 'CLASSIC',
  SPEED = 'SPEED',
  MAZE = 'MAZE'
}

enum PowerUpType {
  SPEED_BOOST = 'SPEED_BOOST',
  DOUBLE_POINTS = 'DOUBLE_POINTS',
  GHOST_MODE = 'GHOST_MODE',
  SHIELD = 'SHIELD',
  TIME_FREEZE = 'TIME_FREEZE',
  MAGNET = 'MAGNET'
}
```

## 🎮 Игровые события

### Обработка событий

```javascript
// Обработка нажатий клавиш
const handleKeyPress = useCallback((e) => {
  const key = e.key.toLowerCase();
  
  if (DIRECTIONS[key]) {
    e.preventDefault();
    moveSnake(DIRECTIONS[key]);
  }
  
  if (key === ' ' || key === 'p') {
    e.preventDefault();
    togglePause();
  }
}, [moveSnake, togglePause]);

// Добавление слушателя
useEffect(() => {
  document.addEventListener('keydown', handleKeyPress);
  return () => {
    document.removeEventListener('keydown', handleKeyPress);
  };
}, [handleKeyPress]);
```

### Игровые действия

```javascript
// Действия игры
const gameActions = {
  START_GAME: 'START_GAME',
  MOVE_SNAKE: 'MOVE_SNAKE',
  EAT_FOOD: 'EAT_FOOD',
  ACTIVATE_POWER_UP: 'ACTIVATE_POWER_UP',
  PAUSE_GAME: 'PAUSE_GAME',
  RESUME_GAME: 'RESUME_GAME',
  GAME_OVER: 'GAME_OVER',
  RESTART_GAME: 'RESTART_GAME'
};
```

## 🔧 Конфигурация

### Константы игры

```javascript
export const GRID_SIZE = 25;
export const INITIAL_SNAKE = [{ x: 12, y: 12 }];
export const INITIAL_DIRECTION = 'RIGHT';
export const BASE_SPEED = 150;
export const POINTS_PER_FOOD = 10;
export const LEVEL_UP_THRESHOLD = 5;
export const POWER_UP_CHANCE = 0.15;
export const WALL_PERCENTAGE = 0.1;
```

### Настройки пауэр-апов

```javascript
export const POWER_UPS = {
  SPEED_BOOST: {
    name: 'Speed Boost',
    duration: 5000,
    color: '#FFD700',
    icon: '⚡',
    description: 'Увеличивает скорость на 5 секунд'
  },
  DOUBLE_POINTS: {
    name: 'Double Points',
    duration: 8000,
    color: '#FF69B4',
    icon: '💎',
    description: 'Удваивает очки на 8 секунд'
  },
  // ... остальные пауэр-апы
};
```

## 🧪 Тестирование API

### Тестирование компонентов

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import GameBoard from '../GameBoard';

test('renders game board with snake', () => {
  const props = {
    snake: [{ x: 0, y: 0 }],
    food: { x: 5, y: 5 },
    powerUp: null,
    walls: [],
    activeEffects: []
  };
  
  render(<GameBoard {...props} />);
  expect(screen.getByTestId('game-board')).toBeInTheDocument();
});
```

### Тестирование хуков

```javascript
import { renderHook, act } from '@testing-library/react-hooks';
import { useGameState } from '../hooks/useGameState';

test('starts game with correct initial state', () => {
  const { result } = renderHook(() => useGameState('CLASSIC'));
  
  act(() => {
    result.current.startGame('SPEED');
  });
  
  expect(result.current.gameState.gameMode).toBe('SPEED');
  expect(result.current.gameState.isPlaying).toBe(true);
});
```

### Тестирование утилит

```javascript
import { generateFood, checkCollision } from '../utils/gameUtils';

test('generates food in valid position', () => {
  const snake = [{ x: 0, y: 0 }];
  const walls = [];
  const food = generateFood(snake, walls);
  
  expect(food.x).toBeGreaterThanOrEqual(0);
  expect(food.x).toBeLessThan(25);
  expect(food.y).toBeGreaterThanOrEqual(0);
  expect(food.y).toBeLessThan(25);
});
```

---

**Полная документация API поможет вам эффективно использовать все возможности Snake Game Pro! 📚**
