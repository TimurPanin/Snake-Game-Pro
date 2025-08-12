import {
  generateRandomPosition,
  generateWalls,
  checkCollision,
  checkWallCollision,
  checkSelfCollision,
  calculatePoints,
  calculateSpeed,
  calculateLevel
} from '../gameUtils';
import { SnakeSegment, Wall, Food } from '../../types/game';

describe('gameUtils', () => {
  describe('generateRandomPosition', () => {
    it('generates position within grid bounds', () => {
      const snake: SnakeSegment[] = [{ x: 12, y: 12 }];
      const walls: Wall[] = [];
      
      for (let i = 0; i < 100; i++) {
        const position = generateRandomPosition(snake, walls);
        expect(position.x).toBeGreaterThanOrEqual(0);
        expect(position.x).toBeLessThan(25);
        expect(position.y).toBeGreaterThanOrEqual(0);
        expect(position.y).toBeLessThan(25);
      }
    });

    it('avoids snake positions', () => {
      const snake: SnakeSegment[] = [
        { x: 12, y: 12 },
        { x: 11, y: 12 },
        { x: 10, y: 12 }
      ];
      const walls: Wall[] = [];
      
      for (let i = 0; i < 50; i++) {
        const position = generateRandomPosition(snake, walls);
        const isOnSnake = snake.some(segment => 
          segment.x === position.x && segment.y === position.y
        );
        expect(isOnSnake).toBe(false);
      }
    });

    it('avoids wall positions', () => {
      const snake: SnakeSegment[] = [{ x: 12, y: 12 }];
      const walls: Wall[] = [
        { x: 5, y: 5 },
        { x: 6, y: 5 },
        { x: 7, y: 5 }
      ];
      
      for (let i = 0; i < 50; i++) {
        const position = generateRandomPosition(snake, walls);
        const isOnWall = walls.some(wall => 
          wall.x === position.x && wall.y === position.y
        );
        expect(isOnWall).toBe(false);
      }
    });
  });

  describe('generateWalls', () => {
    it('generates correct number of walls', () => {
      const walls = generateWalls();
      const expectedCount = Math.floor(25 * 25 * 0.1); // 10% of grid
      expect(walls.length).toBe(expectedCount);
    });

    it('generates walls within grid bounds', () => {
      const walls = generateWalls();
      walls.forEach(wall => {
        expect(wall.x).toBeGreaterThanOrEqual(0);
        expect(wall.x).toBeLessThan(25);
        expect(wall.y).toBeGreaterThanOrEqual(0);
        expect(wall.y).toBeLessThan(25);
      });
    });

    it('avoids center area for snake spawn', () => {
      const walls = generateWalls();
      walls.forEach(wall => {
        const distanceFromCenter = Math.sqrt(
          Math.pow(wall.x - 12, 2) + Math.pow(wall.y - 12, 2)
        );
        expect(distanceFromCenter).toBeGreaterThan(2);
      });
    });
  });

  describe('checkCollision', () => {
    it('detects wall collision', () => {
      const head: SnakeSegment = { x: 0, y: 0 };
      const snake: SnakeSegment[] = [head];
      const walls: Wall[] = [{ x: 0, y: 0 }];
      
      expect(checkCollision(head, snake, walls)).toBe(true);
    });

    it('detects self collision', () => {
      const head: SnakeSegment = { x: 10, y: 10 };
      const snake: SnakeSegment[] = [
        head,
        { x: 10, y: 10 },
        { x: 9, y: 10 }
      ];
      const walls: Wall[] = [];
      
      expect(checkCollision(head, snake, walls)).toBe(true);
    });

    it('allows ghost mode to pass through walls', () => {
      const head: SnakeSegment = { x: 0, y: 0 };
      const snake: SnakeSegment[] = [head];
      const walls: Wall[] = [{ x: 0, y: 0 }];
      
      expect(checkCollision(head, snake, walls, true)).toBe(false);
    });

    it('wraps around edges in ghost mode', () => {
      const head: SnakeSegment = { x: -1, y: 0 };
      const snake: SnakeSegment[] = [head];
      const walls: Wall[] = [];
      
      const result = checkCollision(head, snake, walls, true);
      expect(result).toBe(false);
      expect(head.x).toBe(24); // Should wrap to right edge
    });
  });

  describe('checkWallCollision', () => {
    it('detects boundary collision', () => {
      expect(checkWallCollision({ x: -1, y: 0 })).toBe(true);
      expect(checkWallCollision({ x: 25, y: 0 })).toBe(true);
      expect(checkWallCollision({ x: 0, y: -1 })).toBe(true);
      expect(checkWallCollision({ x: 0, y: 25 })).toBe(true);
    });

    it('allows valid positions', () => {
      expect(checkWallCollision({ x: 0, y: 0 })).toBe(false);
      expect(checkWallCollision({ x: 12, y: 12 })).toBe(false);
      expect(checkWallCollision({ x: 24, y: 24 })).toBe(false);
    });
  });

  describe('checkSelfCollision', () => {
    it('detects collision with snake body', () => {
      const head: SnakeSegment = { x: 10, y: 10 };
      const snake: SnakeSegment[] = [
        head,
        { x: 10, y: 10 },
        { x: 9, y: 10 }
      ];
      
      expect(checkSelfCollision(head, snake)).toBe(true);
    });

    it('allows valid movement', () => {
      const head: SnakeSegment = { x: 10, y: 10 };
      const snake: SnakeSegment[] = [
        head,
        { x: 9, y: 10 },
        { x: 8, y: 10 }
      ];
      
      expect(checkSelfCollision(head, snake)).toBe(false);
    });
  });

  describe('calculatePoints', () => {
    it('calculates base points correctly', () => {
      expect(calculatePoints(1, false)).toBe(10);
      expect(calculatePoints(5, false)).toBe(50);
    });

    it('applies double points multiplier', () => {
      expect(calculatePoints(1, true)).toBe(20);
      expect(calculatePoints(5, true)).toBe(100);
    });
  });

  describe('calculateSpeed', () => {
    it('calculates speed based on level', () => {
      expect(calculateSpeed(1)).toBe(150);
      expect(calculateSpeed(5)).toBe(110);
      expect(calculateSpeed(10)).toBe(60);
    });

    it('respects minimum speed', () => {
      expect(calculateSpeed(20)).toBe(50); // Minimum speed
    });
  });

  describe('calculateLevel', () => {
    it('calculates level based on food eaten', () => {
      expect(calculateLevel(0)).toBe(1);
      expect(calculateLevel(5)).toBe(2);
      expect(calculateLevel(10)).toBe(3);
      expect(calculateLevel(15)).toBe(4);
    });
  });
});
