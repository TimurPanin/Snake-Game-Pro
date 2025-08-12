import { Achievement, GameState } from '../types/game';

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_blood',
    name: 'Первая кровь',
    description: 'Съешьте первую еду',
    icon: '🍎',
    condition: (gameState: GameState) => gameState.foodEaten >= 1,
    unlocked: false
  },
  {
    id: 'snake_master',
    name: 'Мастер змейки',
    description: 'Достигните длины змейки в 20 сегментов',
    icon: '🐍',
    condition: (gameState: GameState) => gameState.snake.length >= 20,
    unlocked: false
  },
  {
    id: 'speed_demon',
    name: 'Демон скорости',
    description: 'Достигните 10 уровня',
    icon: '🏃',
    condition: (gameState: GameState) => gameState.level >= 10,
    unlocked: false
  },
  {
    id: 'power_up_collector',
    name: 'Коллекционер пауэр-апов',
    description: 'Соберите 10 пауэр-апов за одну игру',
    icon: '⭐',
    condition: (gameState: GameState) => {
      // This would need to be tracked separately
      return false;
    },
    unlocked: false
  },
  {
    id: 'survivor',
    name: 'Выживший',
    description: 'Играйте 5 минут подряд',
    icon: '⏱️',
    condition: (gameState: GameState) => {
      // This would need to be tracked separately
      return false;
    },
    unlocked: false
  },
  {
    id: 'high_scorer',
    name: 'Рекордсмен',
    description: 'Наберите 1000 очков',
    icon: '🏆',
    condition: (gameState: GameState) => gameState.score >= 1000,
    unlocked: false
  },
  {
    id: 'maze_master',
    name: 'Мастер лабиринта',
    description: 'Пройдите Maze режим до 5 уровня',
    icon: '🧩',
    condition: (gameState: GameState) => 
      gameState.gameMode === 'Maze' && gameState.level >= 5,
    unlocked: false
  },
  {
    id: 'ghost_rider',
    name: 'Призрачный всадник',
    description: 'Используйте Ghost Mode 5 раз',
    icon: '👻',
    condition: (gameState: GameState) => {
      // This would need to be tracked separately
      return false;
    },
    unlocked: false
  },
  {
    id: 'perfect_game',
    name: 'Идеальная игра',
    description: 'Не проиграйте до 15 уровня',
    icon: '✨',
    condition: (gameState: GameState) => 
      gameState.level >= 15 && !gameState.gameOver,
    unlocked: false
  },
  {
    id: 'multiplayer_legend',
    name: 'Легенда мультиплеера',
    description: 'Выиграйте 10 мультиплеерных игр',
    icon: '👑',
    condition: (gameState: GameState) => {
      // This would need to be tracked separately
      return false;
    },
    unlocked: false
  }
];

export class AchievementManager {
  private achievements: Achievement[];

  constructor() {
    this.achievements = this.loadAchievements();
  }

  private loadAchievements(): Achievement[] {
    try {
      const saved = localStorage.getItem('snakeAchievements');
      if (saved) {
        const parsed = JSON.parse(saved);
        return ACHIEVEMENTS.map(achievement => ({
          ...achievement,
          ...parsed.find((a: Achievement) => a.id === achievement.id)
        }));
      }
    } catch (error) {
      console.warn('Failed to load achievements:', error);
    }
    return ACHIEVEMENTS;
  }

  private saveAchievements(): void {
    try {
      localStorage.setItem('snakeAchievements', JSON.stringify(this.achievements));
    } catch (error) {
      console.warn('Failed to save achievements:', error);
    }
  }

  checkAchievements(gameState: GameState): Achievement[] {
    const newlyUnlocked: Achievement[] = [];

    this.achievements.forEach(achievement => {
      if (!achievement.unlocked && achievement.condition(gameState)) {
        achievement.unlocked = true;
        achievement.unlockedAt = new Date();
        newlyUnlocked.push(achievement);
      }
    });

    if (newlyUnlocked.length > 0) {
      this.saveAchievements();
    }

    return newlyUnlocked;
  }

  getAchievements(): Achievement[] {
    return this.achievements;
  }

  getUnlockedCount(): number {
    return this.achievements.filter(a => a.unlocked).length;
  }

  getTotalCount(): number {
    return this.achievements.length;
  }

  resetAchievements(): void {
    this.achievements = ACHIEVEMENTS.map(a => ({ ...a, unlocked: false }));
    this.saveAchievements();
  }
}
