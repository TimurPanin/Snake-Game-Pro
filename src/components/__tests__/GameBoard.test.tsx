import React from 'react';
import { render, screen } from '@testing-library/react';
import GameBoard from '../GameBoard';
import { GameState } from '../../types/game';

const mockGameState: GameState = {
  snake: [
    { x: 12, y: 12, isHead: true },
    { x: 11, y: 12 },
    { x: 10, y: 12 }
  ],
  food: { x: 15, y: 15, type: 'normal' },
  powerUp: null,
  walls: [],
  direction: 'RIGHT',
  score: 100,
  level: 2,
  foodEaten: 5,
  isPlaying: true,
  isPaused: false,
  gameOver: false,
  gameMode: 'Classic',
  gameSpeed: 150,
  activeEffects: [],
  highScore: 500
};

describe('GameBoard', () => {
  it('renders game board with correct dimensions', () => {
    render(<GameBoard gameState={mockGameState} />);
    
    const gameBoard = screen.getByTestId('game-board');
    expect(gameBoard).toBeInTheDocument();
    expect(gameBoard).toHaveStyle({
      width: '450px',
      height: '450px'
    });
  });

  it('renders snake segments correctly', () => {
    render(<GameBoard gameState={mockGameState} />);
    
    const snakeSegments = screen.getAllByTestId('snake-segment');
    expect(snakeSegments).toHaveLength(3);
    
    // Check if head has special class
    const head = screen.getByTestId('snake-head');
    expect(head).toBeInTheDocument();
  });

  it('renders food correctly', () => {
    render(<GameBoard gameState={mockGameState} />);
    
    const food = screen.getByTestId('food');
    expect(food).toBeInTheDocument();
    expect(food).toHaveStyle({
      left: '270px',
      top: '270px'
    });
  });

  it('renders power-up when present', () => {
    const gameStateWithPowerUp = {
      ...mockGameState,
      powerUp: { x: 8, y: 8, type: 'powerup', powerUpType: 'Speed Boost' }
    };
    
    render(<GameBoard gameState={gameStateWithPowerUp} />);
    
    const powerUp = screen.getByTestId('power-up');
    expect(powerUp).toBeInTheDocument();
  });

  it('renders walls in maze mode', () => {
    const mazeGameState = {
      ...mockGameState,
      gameMode: 'Maze',
      walls: [
        { x: 5, y: 5 },
        { x: 6, y: 5 },
        { x: 7, y: 5 }
      ]
    };
    
    render(<GameBoard gameState={mazeGameState} />);
    
    const walls = screen.getAllByTestId('wall');
    expect(walls).toHaveLength(3);
  });

  it('applies ghost effect to snake when active', () => {
    const ghostGameState = {
      ...mockGameState,
      snake: [
        { x: 12, y: 12, isHead: true, isGhost: true },
        { x: 11, y: 12, isGhost: true },
        { x: 10, y: 12, isGhost: true }
      ]
    };
    
    render(<GameBoard gameState={ghostGameState} />);
    
    const ghostSegments = screen.getAllByTestId('snake-ghost');
    expect(ghostSegments).toHaveLength(3);
  });
});
