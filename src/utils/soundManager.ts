import { SoundEffect } from '../types/game';

export class SoundManager {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private isEnabled: boolean = true;
  private volume: number = 0.5;

  constructor() {
    this.loadSettings();
    this.preloadSounds();
  }

  private loadSettings(): void {
    try {
      const saved = localStorage.getItem('snakeSoundSettings');
      if (saved) {
        const settings = JSON.parse(saved);
        this.isEnabled = settings.enabled ?? true;
        this.volume = settings.volume ?? 0.5;
      }
    } catch (error) {
      console.warn('Failed to load sound settings:', error);
    }
  }

  private saveSettings(): void {
    try {
      localStorage.setItem('snakeSoundSettings', JSON.stringify({
        enabled: this.isEnabled,
        volume: this.volume
      }));
    } catch (error) {
      console.warn('Failed to save sound settings:', error);
    }
  }

  private preloadSounds(): void {
    const soundEffects: SoundEffect[] = [
      {
        id: 'eat',
        src: '/sounds/eat.mp3',
        volume: 0.6
      },
      {
        id: 'powerup',
        src: '/sounds/powerup.mp3',
        volume: 0.7
      },
      {
        id: 'gameOver',
        src: '/sounds/gameover.mp3',
        volume: 0.8
      },
      {
        id: 'levelUp',
        src: '/sounds/levelup.mp3',
        volume: 0.7
      },
      {
        id: 'achievement',
        src: '/sounds/achievement.mp3',
        volume: 0.8
      },
      {
        id: 'background',
        src: '/sounds/background.mp3',
        volume: 0.3,
        loop: true
      }
    ];

    soundEffects.forEach(sound => {
      const audio = new Audio(sound.src);
      audio.volume = sound.volume * this.volume;
      audio.preload = 'auto';
      if (sound.loop) {
        audio.loop = true;
      }
      this.sounds.set(sound.id, audio);
    });
  }

  play(soundId: string): void {
    if (!this.isEnabled) return;

    const sound = this.sounds.get(soundId);
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(error => {
        console.warn(`Failed to play sound ${soundId}:`, error);
      });
    }
  }

  stop(soundId: string): void {
    const sound = this.sounds.get(soundId);
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  }

  stopAll(): void {
    this.sounds.forEach(sound => {
      sound.pause();
      sound.currentTime = 0;
    });
  }

  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
    this.sounds.forEach(sound => {
      sound.volume = this.volume;
    });
    this.saveSettings();
  }

  getVolume(): number {
    return this.volume;
  }

  enable(): void {
    this.isEnabled = true;
    this.saveSettings();
  }

  disable(): void {
    this.isEnabled = false;
    this.stopAll();
    this.saveSettings();
  }

  isSoundEnabled(): boolean {
    return this.isEnabled;
  }

  // Background music control
  playBackground(): void {
    if (this.isEnabled) {
      this.play('background');
    }
  }

  stopBackground(): void {
    this.stop('background');
  }

  // Game event sounds
  playEat(): void {
    this.play('eat');
  }

  playPowerUp(): void {
    this.play('powerup');
  }

  playGameOver(): void {
    this.play('gameOver');
  }

  playLevelUp(): void {
    this.play('levelUp');
  }

  playAchievement(): void {
    this.play('achievement');
  }
}

// Singleton instance
export const soundManager = new SoundManager();
