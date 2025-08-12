import { SoundEffect } from '../types/game';

export class SoundManager {
  private sounds: Map<string, (() => void) | HTMLAudioElement> = new Map();
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
    // Create simple beep sounds using Web Audio API instead of external files
    this.createBeepSound('eat', 800, 0.1, 'sine');
    this.createBeepSound('powerup', 1200, 0.2, 'square');
    this.createBeepSound('gameOver', 200, 0.5, 'sawtooth');
    this.createBeepSound('levelUp', 1000, 0.3, 'triangle');
    this.createBeepSound('achievement', 1500, 0.2, 'sine');
    this.createBackgroundMusic();
  }

  private createBeepSound(id: string, frequency: number, duration: number, type: OscillatorType = 'sine'): void {
    const soundFunction = () => {
      if (!this.isEnabled) return;
      
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(this.volume, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
      } catch (error) {
        console.warn('Audio playback failed:', error);
      }
    };

    // Store the sound function instead of Audio element
    this.sounds.set(id, soundFunction as any);
  }

  private createBackgroundMusic(): void {
    const musicFunction = () => {
      if (!this.isEnabled) return;
      
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25]; // C major scale
        let currentNote = 0;
        
        const playNote = () => {
          if (!this.isEnabled) return;
          
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.setValueAtTime(notes[currentNote], audioContext.currentTime);
          oscillator.type = 'sine';
          
          gainNode.gain.setValueAtTime(0, audioContext.currentTime);
          gainNode.gain.linearRampToValueAtTime(this.volume * 0.3, audioContext.currentTime + 0.1);
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.5);
          
          currentNote = (currentNote + 1) % notes.length;
          
          setTimeout(playNote, 2000); // Play next note after 2 seconds
        };
        
        playNote();
      } catch (error) {
        console.warn('Background music failed:', error);
      }
    };

    this.sounds.set('background', musicFunction as any);
  }

  play(soundId: string): void {
    if (!this.isEnabled) return;

    const sound = this.sounds.get(soundId);
    if (sound && typeof sound === 'function') {
      sound();
    }
  }

  stop(soundId: string): void {
    // For function-based sounds, we can't stop them individually
    // They will stop automatically after their duration
  }

  stopAll(): void {
    // For function-based sounds, we can't stop them individually
    // They will stop automatically after their duration
  }

  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
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

  toggleMute(): boolean {
    this.isEnabled = !this.isEnabled;
    this.saveSettings();
    return this.isEnabled;
  }

  isSoundMuted(): boolean {
    return !this.isEnabled;
  }

  // Background music control
  playBackground(): void {
    if (this.isEnabled) {
      this.play('background');
    }
  }

  stopBackground(): void {
    // Background music will stop automatically when disabled
    this.isEnabled = false;
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
export default soundManager;
