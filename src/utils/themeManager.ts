import { Theme } from '../types/game';

export const THEMES: Theme[] = [
  {
    name: 'Classic',
    colors: {
      background: '#1a1a1a',
      snake: '#4CAF50',
      food: '#FF5722',
      powerUp: '#FFD700',
      wall: '#666666',
      text: '#FFFFFF',
      button: '#2196F3',
      buttonHover: '#1976D2'
    }
  },
  {
    name: 'Dark',
    colors: {
      background: '#000000',
      snake: '#00FF00',
      food: '#FF0000',
      powerUp: '#FFFF00',
      wall: '#333333',
      text: '#FFFFFF',
      button: '#4CAF50',
      buttonHover: '#45a049'
    }
  },
  {
    name: 'Light',
    colors: {
      background: '#F5F5F5',
      snake: '#2E7D32',
      food: '#D32F2F',
      powerUp: '#F57C00',
      wall: '#9E9E9E',
      text: '#212121',
      button: '#1976D2',
      buttonHover: '#1565C0'
    }
  },
  {
    name: 'Neon',
    colors: {
      background: '#0D0D0D',
      snake: '#00FFFF',
      food: '#FF00FF',
      powerUp: '#FFFF00',
      wall: '#FF0080',
      text: '#FFFFFF',
      button: '#00FF00',
      buttonHover: '#00CC00'
    }
  },
  {
    name: 'Ocean',
    colors: {
      background: '#1A237E',
      snake: '#4FC3F7',
      food: '#FF6B6B',
      powerUp: '#FFD54F',
      wall: '#546E7A',
      text: '#FFFFFF',
      button: '#26A69A',
      buttonHover: '#00897B'
    }
  },
  {
    name: 'Forest',
    colors: {
      background: '#2E7D32',
      snake: '#8BC34A',
      food: '#FF9800',
      powerUp: '#FFEB3B',
      wall: '#795548',
      text: '#FFFFFF',
      button: '#4CAF50',
      buttonHover: '#45a049'
    }
  }
];

export class ThemeManager {
  private currentTheme: string = 'Classic';

  constructor() {
    this.loadTheme();
    this.applyTheme();
  }

  private loadTheme(): void {
    try {
      const saved = localStorage.getItem('snakeTheme');
      if (saved) {
        this.currentTheme = saved;
      }
    } catch (error) {
      console.warn('Failed to load theme:', error);
    }
  }

  private saveTheme(): void {
    try {
      localStorage.setItem('snakeTheme', this.currentTheme);
    } catch (error) {
      console.warn('Failed to save theme:', error);
    }
  }

  private applyTheme(): void {
    const theme = this.getCurrentTheme();
    if (!theme) return;

    const root = document.documentElement;
    
    // Apply CSS custom properties
    root.style.setProperty('--background-color', theme.colors.background);
    root.style.setProperty('--snake-color', theme.colors.snake);
    root.style.setProperty('--food-color', theme.colors.food);
    root.style.setProperty('--powerup-color', theme.colors.powerUp);
    root.style.setProperty('--wall-color', theme.colors.wall);
    root.style.setProperty('--text-color', theme.colors.text);
    root.style.setProperty('--button-color', theme.colors.button);
    root.style.setProperty('--button-hover-color', theme.colors.buttonHover);
  }

  setTheme(themeName: string): void {
    const theme = THEMES.find(t => t.name === themeName);
    if (theme) {
      this.currentTheme = themeName;
      this.saveTheme();
      this.applyTheme();
    }
  }

  getCurrentTheme(): Theme | undefined {
    return THEMES.find(t => t.name === this.currentTheme);
  }

  getCurrentThemeName(): string {
    return this.currentTheme;
  }

  getThemes(): Theme[] {
    return THEMES;
  }

  getThemeNames(): string[] {
    return THEMES.map(t => t.name);
  }

  // Cycle through themes
  nextTheme(): void {
    const currentIndex = THEMES.findIndex(t => t.name === this.currentTheme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    this.setTheme(THEMES[nextIndex].name);
  }

  previousTheme(): void {
    const currentIndex = THEMES.findIndex(t => t.name === this.currentTheme);
    const prevIndex = currentIndex === 0 ? THEMES.length - 1 : currentIndex - 1;
    this.setTheme(THEMES[prevIndex].name);
  }
}

// Singleton instance
export const themeManager = new ThemeManager();
