# Тестирование

Полное руководство по тестированию Snake Game Pro с использованием Jest и React Testing Library.

## 🧪 Обзор тестирования

### Технологии
- **Jest** - тестовый фреймворк
- **React Testing Library** - тестирование компонентов
- **@testing-library/jest-dom** - дополнительные матчеры
- **@testing-library/user-event** - симуляция пользовательских событий

### Структура тестов
```
__tests__/
├── components/          # Тесты компонентов
│   ├── GameBoard.test.tsx
│   ├── GameControls.test.tsx
│   ├── GameMenu.test.tsx
│   ├── GameOver.test.tsx
│   └── GameStats.test.tsx
├── hooks/              # Тесты хуков
│   ├── useGameState.test.js
│   ├── useGameLoop.test.js
│   ├── usePowerUps.test.js
│   └── useHighScore.test.js
└── utils/              # Тесты утилит
    ├── gameUtils.test.ts
    └── soundManager.test.ts
```

## 🚀 Запуск тестов

### Основные команды

```bash
# Запуск всех тестов
npm test

# Запуск тестов в watch режиме
npm run test:watch

# Запуск тестов с покрытием
npm run test:coverage

# Запуск конкретного теста
npm test -- GameBoard.test.tsx

# Запуск тестов с фильтром
npm test -- --testNamePattern="renders"
```

### Конфигурация Jest

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest'
  },
  testMatch: [
    '<rootDir>/__tests__/**/*.(test|spec).(ts|tsx|js|jsx)'
  ],
  collectCoverageFrom: [
    'src/**/*.(ts|tsx|js|jsx)',
    '!src/index.js',
    '!src/setupTests.js'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

## 🧩 Тестирование компонентов

### GameBoard

```javascript
import { render, screen } from '@testing-library/react';
import GameBoard from '../GameBoard';

describe('GameBoard', () => {
  const defaultProps = {
    snake: [{ x: 0, y: 0 }],
    food: { x: 5, y: 5 },
    powerUp: null,
    walls: [],
    activeEffects: []
  };

  test('renders game board', () => {
    render(<GameBoard {...defaultProps} />);
    expect(screen.getByTestId('game-board')).toBeInTheDocument();
  });

  test('renders snake segments', () => {
    render(<GameBoard {...defaultProps} />);
    const snakeSegments = screen.getAllByTestId('snake-segment');
    expect(snakeSegments).toHaveLength(1);
  });

  test('renders food', () => {
    render(<GameBoard {...defaultProps} />);
    const food = screen.getByTestId('food');
    expect(food).toBeInTheDocument();
  });

  test('renders power-up when present', () => {
    const propsWithPowerUp = {
      ...defaultProps,
      powerUp: { x: 10, y: 10, type: 'SPEED_BOOST', color: '#FFD700' }
    };
    render(<GameBoard {...propsWithPowerUp} />);
    const powerUp = screen.getByTestId('power-up');
    expect(powerUp).toBeInTheDocument();
  });

  test('renders walls in maze mode', () => {
    const propsWithWalls = {
      ...defaultProps,
      walls: [{ x: 1, y: 1 }, { x: 2, y: 2 }]
    };
    render(<GameBoard {...propsWithWalls} />);
    const walls = screen.getAllByTestId('wall');
    expect(walls).toHaveLength(2);
  });
});
```

### GameControls

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import GameControls from '../GameControls';

describe('GameControls', () => {
  const defaultProps = {
    isPaused: false,
    onPauseToggle: jest.fn(),
    onRestart: jest.fn(),
    activeEffects: []
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders control buttons', () => {
    render(<GameControls {...defaultProps} />);
    expect(screen.getByText('Pause')).toBeInTheDocument();
    expect(screen.getByText('Restart')).toBeInTheDocument();
  });

  test('shows resume button when paused', () => {
    render(<GameControls {...defaultProps} isPaused={true} />);
    expect(screen.getByText('Resume')).toBeInTheDocument();
  });

  test('calls onPauseToggle when pause button clicked', () => {
    render(<GameControls {...defaultProps} />);
    fireEvent.click(screen.getByText('Pause'));
    expect(defaultProps.onPauseToggle).toHaveBeenCalledTimes(1);
  });

  test('calls onRestart when restart button clicked', () => {
    render(<GameControls {...defaultProps} />);
    fireEvent.click(screen.getByText('Restart'));
    expect(defaultProps.onRestart).toHaveBeenCalledTimes(1);
  });

  test('renders active effects', () => {
    const propsWithEffects = {
      ...defaultProps,
      activeEffects: [
        { type: 'SPEED_BOOST', endTime: Date.now() + 5000 }
      ]
    };
    render(<GameControls {...propsWithEffects} />);
    expect(screen.getByText('Speed Boost')).toBeInTheDocument();
  });
});
```

### GameStats

```javascript
import { render, screen } from '@testing-library/react';
import GameStats from '../GameStats';

describe('GameStats', () => {
  test('renders score, high score and level', () => {
    render(<GameStats score={150} highScore={500} level={3} />);
    
    expect(screen.getByText('Score: 150')).toBeInTheDocument();
    expect(screen.getByText('High Score: 500')).toBeInTheDocument();
    expect(screen.getByText('Level: 3')).toBeInTheDocument();
  });

  test('displays correct values', () => {
    render(<GameStats score={0} highScore={0} level={1} />);
    
    expect(screen.getByText('Score: 0')).toBeInTheDocument();
    expect(screen.getByText('High Score: 0')).toBeInTheDocument();
    expect(screen.getByText('Level: 1')).toBeInTheDocument();
  });
});
```

## 🎣 Тестирование хуков

### useGameState

```javascript
import { renderHook, act } from '@testing-library/react-hooks';
import { useGameState } from '../hooks/useGameState';

describe('useGameState', () => {
  test('initializes with default state', () => {
    const { result } = renderHook(() => useGameState('CLASSIC'));
    
    expect(result.current.gameState.isPlaying).toBe(false);
    expect(result.current.gameState.gameMode).toBe('CLASSIC');
    expect(result.current.gameState.score).toBe(0);
    expect(result.current.gameState.level).toBe(1);
  });

  test('starts game correctly', () => {
    const { result } = renderHook(() => useGameState('CLASSIC'));
    
    act(() => {
      result.current.startGame('SPEED');
    });
    
    expect(result.current.gameState.isPlaying).toBe(true);
    expect(result.current.gameState.gameMode).toBe('SPEED');
    expect(result.current.gameState.snake).toEqual([{ x: 12, y: 12 }]);
  });

  test('moves snake correctly', () => {
    const { result } = renderHook(() => useGameState('CLASSIC'));
    
    act(() => {
      result.current.startGame('CLASSIC');
    });
    
    act(() => {
      result.current.moveSnake('UP');
    });
    
    expect(result.current.gameState.direction).toBe('UP');
  });

  test('pauses and resumes game', () => {
    const { result } = renderHook(() => useGameState('CLASSIC'));
    
    act(() => {
      result.current.startGame('CLASSIC');
    });
    
    act(() => {
      result.current.pauseGame();
    });
    
    expect(result.current.gameState.isPaused).toBe(true);
    
    act(() => {
      result.current.resumeGame();
    });
    
    expect(result.current.gameState.isPaused).toBe(false);
  });
});
```

### usePowerUps

```javascript
import { renderHook, act } from '@testing-library/react-hooks';
import { usePowerUps } from '../hooks/usePowerUps';

describe('usePowerUps', () => {
  test('initializes with empty active effects', () => {
    const { result } = renderHook(() => usePowerUps());
    
    expect(result.current.activeEffects).toEqual([]);
  });

  test('activates power-up correctly', () => {
    const { result } = renderHook(() => usePowerUps());
    
    const powerUp = {
      type: 'SPEED_BOOST',
      duration: 5000,
      color: '#FFD700'
    };
    
    act(() => {
      result.current.activatePowerUp(powerUp);
    });
    
    expect(result.current.activeEffects).toHaveLength(1);
    expect(result.current.activeEffects[0].type).toBe('SPEED_BOOST');
  });

  test('checks if effect is active', () => {
    const { result } = renderHook(() => usePowerUps());
    
    const powerUp = {
      type: 'SHIELD',
      duration: 10000,
      color: '#00FF00'
    };
    
    act(() => {
      result.current.activatePowerUp(powerUp);
    });
    
    expect(result.current.hasEffect('SHIELD')).toBe(true);
    expect(result.current.hasEffect('SPEED_BOOST')).toBe(false);
  });
});
```

## 🛠 Тестирование утилит

### gameUtils

```javascript
import {
  generateFood,
  generateWalls,
  checkCollision,
  moveSnake,
  calculatePoints,
  calculateSpeed
} from '../utils/gameUtils';

describe('gameUtils', () => {
  describe('generateFood', () => {
    test('generates food in valid position', () => {
      const snake = [{ x: 0, y: 0 }];
      const walls = [];
      const food = generateFood(snake, walls);
      
      expect(food.x).toBeGreaterThanOrEqual(0);
      expect(food.x).toBeLessThan(25);
      expect(food.y).toBeGreaterThanOrEqual(0);
      expect(food.y).toBeLessThan(25);
    });

    test('does not generate food on snake', () => {
      const snake = [{ x: 5, y: 5 }, { x: 6, y: 5 }];
      const walls = [];
      const food = generateFood(snake, walls);
      
      const isOnSnake = snake.some(segment => 
        segment.x === food.x && segment.y === food.y
      );
      expect(isOnSnake).toBe(false);
    });
  });

  describe('generateWalls', () => {
    test('generates correct number of walls', () => {
      const walls = generateWalls(25, 0.1);
      const expectedCount = Math.floor(25 * 0.1);
      expect(walls).toHaveLength(expectedCount);
    });

    test('generates walls in valid positions', () => {
      const walls = generateWalls(25, 0.1);
      
      walls.forEach(wall => {
        expect(wall.x).toBeGreaterThanOrEqual(0);
        expect(wall.x).toBeLessThan(25);
        expect(wall.y).toBeGreaterThanOrEqual(0);
        expect(wall.y).toBeLessThan(25);
      });
    });
  });

  describe('checkCollision', () => {
    test('detects wall collision', () => {
      const snake = [{ x: 0, y: 0 }];
      const food = { x: 5, y: 5 };
      const walls = [{ x: 0, y: 0 }];
      const gameMode = 'MAZE';
      
      const result = checkCollision(snake, food, walls, gameMode);
      expect(result.type).toBe('WALL');
    });

    test('detects self collision', () => {
      const snake = [
        { x: 5, y: 5 },
        { x: 5, y: 6 },
        { x: 5, y: 7 },
        { x: 5, y: 6 } // Collision with self
      ];
      const food = { x: 10, y: 10 };
      const walls = [];
      const gameMode = 'CLASSIC';
      
      const result = checkCollision(snake, food, walls, gameMode);
      expect(result.type).toBe('SELF');
    });

    test('detects food collision', () => {
      const snake = [{ x: 5, y: 5 }];
      const food = { x: 5, y: 5 };
      const walls = [];
      const gameMode = 'CLASSIC';
      
      const result = checkCollision(snake, food, walls, gameMode);
      expect(result.type).toBe('FOOD');
    });
  });

  describe('moveSnake', () => {
    test('moves snake up correctly', () => {
      const snake = [{ x: 5, y: 5 }];
      const newSnake = moveSnake(snake, 'UP', 25);
      
      expect(newSnake[0].x).toBe(5);
      expect(newSnake[0].y).toBe(4);
    });

    test('moves snake down correctly', () => {
      const snake = [{ x: 5, y: 5 }];
      const newSnake = moveSnake(snake, 'DOWN', 25);
      
      expect(newSnake[0].x).toBe(5);
      expect(newSnake[0].y).toBe(6);
    });

    test('handles wrapping around edges', () => {
      const snake = [{ x: 0, y: 0 }];
      const newSnake = moveSnake(snake, 'UP', 25);
      
      expect(newSnake[0].x).toBe(0);
      expect(newSnake[0].y).toBe(24);
    });
  });

  describe('calculatePoints', () => {
    test('calculates points correctly', () => {
      expect(calculatePoints(1, 10)).toBe(10);
      expect(calculatePoints(5, 10)).toBe(50);
      expect(calculatePoints(10, 10)).toBe(100);
    });
  });

  describe('calculateSpeed', () => {
    test('calculates speed correctly', () => {
      expect(calculateSpeed(1, 150)).toBe(150);
      expect(calculateSpeed(5, 150)).toBe(100);
      expect(calculateSpeed(10, 150)).toBe(50);
    });
  });
});
```

### soundManager

```javascript
import soundManager from '../utils/soundManager';

describe('soundManager', () => {
  beforeEach(() => {
    // Mock AudioContext
    global.AudioContext = jest.fn().mockImplementation(() => ({
      createOscillator: jest.fn().mockReturnValue({
        connect: jest.fn(),
        frequency: { setValueAtTime: jest.fn() },
        type: 'sine',
        start: jest.fn(),
        stop: jest.fn()
      }),
      createGain: jest.fn().mockReturnValue({
        connect: jest.fn(),
        gain: { setValueAtTime: jest.fn(), linearRampToValueAtTime: jest.fn(), exponentialRampToValueAtTime: jest.fn() }
      }),
      destination: {},
      currentTime: 0
    }));
  });

  test('plays sound when enabled', () => {
    soundManager.enable();
    expect(() => soundManager.play('eat')).not.toThrow();
  });

  test('does not play sound when disabled', () => {
    soundManager.disable();
    expect(() => soundManager.play('eat')).not.toThrow();
  });

  test('toggles mute correctly', () => {
    soundManager.enable();
    expect(soundManager.isSoundMuted()).toBe(false);
    
    soundManager.toggleMute();
    expect(soundManager.isSoundMuted()).toBe(true);
    
    soundManager.toggleMute();
    expect(soundManager.isSoundMuted()).toBe(false);
  });

  test('sets volume correctly', () => {
    soundManager.setVolume(0.7);
    expect(soundManager.getVolume()).toBe(0.7);
  });

  test('clamps volume to valid range', () => {
    soundManager.setVolume(1.5);
    expect(soundManager.getVolume()).toBe(1);
    
    soundManager.setVolume(-0.5);
    expect(soundManager.getVolume()).toBe(0);
  });
});
```

## 📊 Покрытие кода

### Настройка покрытия

```javascript
// jest.config.js
module.exports = {
  collectCoverageFrom: [
    'src/**/*.(ts|tsx|js|jsx)',
    '!src/index.js',
    '!src/setupTests.js',
    '!src/**/*.d.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  coverageReporters: ['text', 'lcov', 'html']
};
```

### Генерация отчета

```bash
npm run test:coverage
```

Отчет будет создан в папке `coverage/` и покажет:
- Общее покрытие кода
- Покрытие по файлам
- Покрытие по функциям и веткам
- HTML отчет для детального анализа

## 🔧 Настройка тестов

### setupTests.js

```javascript
// src/setupTests.js
import '@testing-library/jest-dom';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
```

### Тестовые утилиты

```javascript
// __tests__/utils/test-utils.js
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider theme={{}}>
      {children}
    </ThemeProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

## 🚀 CI/CD интеграция

### GitHub Actions

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test -- --coverage --watchAll=false
    
    - name: Upload coverage
      uses: codecov/codecov-action@v1
      with:
        file: ./coverage/lcov.info
```

### Pre-commit hooks

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint && npm test -- --watchAll=false",
      "pre-push": "npm run test:coverage"
    }
  }
}
```

---

**Тестирование обеспечивает надежность и качество кода! 🧪**
