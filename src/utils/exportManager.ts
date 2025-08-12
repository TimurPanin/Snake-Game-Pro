import { ExportData, GameStats, Achievement } from '../types/game';
import { AchievementManager } from './achievements';

export class ExportManager {
  private achievementManager: AchievementManager;

  constructor(achievementManager: AchievementManager) {
    this.achievementManager = achievementManager;
  }

  // Export all game data
  exportData(): ExportData {
    const stats = this.loadGameStats();
    const achievements = this.achievementManager.getAchievements();
    const settings = this.loadSettings();

    return {
      stats,
      achievements,
      settings
    };
  }

  // Export as JSON file
  exportToFile(): void {
    const data = this.exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `snake-game-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Import data from file
  async importFromFile(file: File): Promise<boolean> {
    try {
      const text = await file.text();
      const data: ExportData = JSON.parse(text);
      
      // Validate data structure
      if (!this.validateImportData(data)) {
        throw new Error('Invalid data format');
      }

      // Import data
      this.importGameStats(data.stats);
      this.importAchievements(data.achievements);
      this.importSettings(data.settings);

      return true;
    } catch (error) {
      console.error('Failed to import data:', error);
      return false;
    }
  }

  // Export high scores only
  exportHighScores(): void {
    const stats = this.loadGameStats();
    const highScores = stats
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    const data = {
      highScores,
      exportDate: new Date().toISOString(),
      totalGames: stats.length
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `snake-high-scores-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Export achievements only
  exportAchievements(): void {
    const achievements = this.achievementManager.getAchievements();
    const unlockedCount = this.achievementManager.getUnlockedCount();
    const totalCount = this.achievementManager.getTotalCount();

    const data = {
      achievements,
      unlockedCount,
      totalCount,
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `snake-achievements-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Generate statistics report
  generateReport(): string {
    const stats = this.loadGameStats();
    const achievements = this.achievementManager.getAchievements();
    
    const totalGames = stats.length;
    const totalScore = stats.reduce((sum, stat) => sum + stat.score, 0);
    const averageScore = totalGames > 0 ? Math.round(totalScore / totalGames) : 0;
    const highestScore = Math.max(...stats.map(s => s.score), 0);
    const unlockedAchievements = achievements.filter(a => a.unlocked).length;
    const totalAchievements = achievements.length;

    const report = `
# Snake Game Pro - Статистика игрока

## Общая статистика
- **Всего игр**: ${totalGames}
- **Общий счет**: ${totalScore}
- **Средний счет**: ${averageScore}
- **Рекорд**: ${highestScore}

## Достижения
- **Разблокировано**: ${unlockedAchievements}/${totalAchievements}
- **Процент**: ${Math.round((unlockedAchievements / totalAchievements) * 100)}%

## Любимые режимы
${this.getFavoriteModes(stats)}

## Последние игры
${this.getRecentGames(stats)}

---
*Отчет сгенерирован: ${new Date().toLocaleString()}*
    `;

    return report.trim();
  }

  // Export report as text file
  exportReport(): void {
    const report = this.generateReport();
    const blob = new Blob([report], { type: 'text/plain' });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `snake-game-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Private methods
  private loadGameStats(): GameStats[] {
    try {
      const saved = localStorage.getItem('snakeGameStats');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.warn('Failed to load game stats:', error);
      return [];
    }
  }

  private loadSettings(): any {
    try {
      const saved = localStorage.getItem('snakeSettings');
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.warn('Failed to load settings:', error);
      return {};
    }
  }

  private validateImportData(data: any): data is ExportData {
    return (
      data &&
      Array.isArray(data.stats) &&
      Array.isArray(data.achievements) &&
      typeof data.settings === 'object'
    );
  }

  private importGameStats(stats: GameStats[]): void {
    try {
      localStorage.setItem('snakeGameStats', JSON.stringify(stats));
    } catch (error) {
      console.warn('Failed to import game stats:', error);
    }
  }

  private importAchievements(achievements: Achievement[]): void {
    try {
      localStorage.setItem('snakeAchievements', JSON.stringify(achievements));
    } catch (error) {
      console.warn('Failed to import achievements:', error);
    }
  }

  private importSettings(settings: any): void {
    try {
      localStorage.setItem('snakeSettings', JSON.stringify(settings));
    } catch (error) {
      console.warn('Failed to import settings:', error);
    }
  }

  private getFavoriteModes(stats: GameStats[]): string {
    const modeCounts = stats.reduce((acc, stat) => {
      acc[stat.gameMode] = (acc[stat.gameMode] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const sortedModes = Object.entries(modeCounts)
      .sort(([,a], [,b]) => b - a)
      .map(([mode, count]) => `- ${mode}: ${count} игр`);

    return sortedModes.join('\n') || '- Нет данных';
  }

  private getRecentGames(stats: GameStats[]): string {
    const recent = stats
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5)
      .map(stat => `- ${stat.gameMode}: ${stat.score} очков (${new Date(stat.date).toLocaleDateString()})`);

    return recent.join('\n') || '- Нет данных';
  }
}
