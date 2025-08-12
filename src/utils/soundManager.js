// Sound Manager for Snake Game
class SoundManager {
  constructor() {
    this.sounds = {};
    this.isMuted = false;
    this.volume = 0.5;
    this.loadSounds();
  }

  loadSounds() {
    // Create audio contexts for different sound effects
    this.sounds = {
      eat: this.createBeepSound(800, 0.1, 'sine'),
      powerup: this.createBeepSound(1200, 0.2, 'square'),
      gameOver: this.createBeepSound(200, 0.5, 'sawtooth'),
      levelUp: this.createBeepSound(1000, 0.3, 'triangle'),
      achievement: this.createBeepSound(1500, 0.2, 'sine'),
      background: this.createBackgroundMusic()
    };
  }

  createBeepSound(frequency, duration, type = 'sine') {
    return () => {
      if (this.isMuted) return;
      
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
    };
  }

  createBackgroundMusic() {
    return () => {
      if (this.isMuted) return;
      
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25]; // C major scale
      let currentNote = 0;
      
      const playNote = () => {
        if (this.isMuted) return;
        
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
    };
  }

  play(soundName) {
    if (this.sounds[soundName]) {
      this.sounds[soundName]();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  getVolume() {
    return this.volume;
  }

  isSoundMuted() {
    return this.isMuted;
  }
}

// Create singleton instance
const soundManager = new SoundManager();

export default soundManager;
