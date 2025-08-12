import React from 'react';
import { render, screen } from '@testing-library/react';
import GameBoard from '../GameBoard';

const mockSnake = [
  { x: 12, y: 12 },
  { x: 11, y: 12 },
  { x: 10, y: 12 }
];

const mockFood = { x: 15, y: 15 };
const mockWalls = [];
const mockActiveEffects = [];
const mockGameBoardRef = { current: null };

describe('GameBoard', () => {
  it('renders game board with correct dimensions', () => {
    render(
      <GameBoard
        snake={mockSnake}
        food={mockFood}
        powerUp={null}
        walls={mockWalls}
        activeEffects={mockActiveEffects}
        gameBoardRef={mockGameBoardRef}
      />
    );
    
    const gameBoard = screen.getByTestId('game-board');
    expect(gameBoard).toBeInTheDocument();
    expect(gameBoard).toHaveStyle({
      width: '450px',
      height: '450px'
    });
  });

  it('renders snake segments correctly', () => {
    render(
      <GameBoard
        snake={mockSnake}
        food={mockFood}
        powerUp={null}
        walls={mockWalls}
        activeEffects={mockActiveEffects}
        gameBoardRef={mockGameBoardRef}
      />
    );
    
    const snakeSegments = document.querySelectorAll('.snake-segment');
    expect(snakeSegments).toHaveLength(3);
    
    // Check if head has special class
    const head = document.querySelector('.snake-segment.head');
    expect(head).toBeInTheDocument();
  });

  it('renders food correctly', () => {
    render(
      <GameBoard
        snake={mockSnake}
        food={mockFood}
        powerUp={null}
        walls={mockWalls}
        activeEffects={mockActiveEffects}
        gameBoardRef={mockGameBoardRef}
      />
    );
    
    const food = document.querySelector('.food');
    expect(food).toBeInTheDocument();
    expect(food).toHaveStyle({
      left: '270px',
      top: '270px'
    });
  });

  it('renders power-up when present', () => {
    const mockPowerUp = {
      type: 'SPEED_BOOST',
      position: { x: 8, y: 8 },
      color: '#ffd700'
    };
    
    render(
      <GameBoard
        snake={mockSnake}
        food={mockFood}
        powerUp={mockPowerUp}
        walls={mockWalls}
        activeEffects={mockActiveEffects}
        gameBoardRef={mockGameBoardRef}
      />
    );
    
    const powerUp = document.querySelector('.power-up');
    expect(powerUp).toBeInTheDocument();
  });

  it('renders walls in maze mode', () => {
    const mockWallsWithData = [
      { x: 5, y: 5 },
      { x: 6, y: 5 },
      { x: 7, y: 5 }
    ];
    
    render(
      <GameBoard
        snake={mockSnake}
        food={mockFood}
        powerUp={null}
        walls={mockWallsWithData}
        activeEffects={mockActiveEffects}
        gameBoardRef={mockGameBoardRef}
      />
    );
    
    const walls = document.querySelectorAll('.wall');
    expect(walls).toHaveLength(3);
  });

  it('applies ghost effect to snake when active', () => {
    const mockActiveEffectsWithGhost = [
      { type: 'GHOST_MODE', endTime: Date.now() + 6000 }
    ];
    
    render(
      <GameBoard
        snake={mockSnake}
        food={mockFood}
        powerUp={null}
        walls={mockWalls}
        activeEffects={mockActiveEffectsWithGhost}
        gameBoardRef={mockGameBoardRef}
      />
    );
    
    const ghostSegments = document.querySelectorAll('.snake-segment.ghost');
    expect(ghostSegments).toHaveLength(3);
  });
});
