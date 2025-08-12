import React, { useState, useEffect } from 'react';
import { themeManager } from '../utils/themeManager';
import { soundManager } from '../utils/soundManager';
import { ExportManager } from '../utils/exportManager';
import { AchievementManager } from '../utils/achievements';
import { Theme } from '../types/game';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  const [currentTheme, setCurrentTheme] = useState<string>('Classic');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(0.5);
  const [themes] = useState<Theme[]>(themeManager.getThemes());
  const [exportManager] = useState<ExportManager>(
    new ExportManager(new AchievementManager())
  );

  useEffect(() => {
    if (isOpen) {
      setCurrentTheme(themeManager.getCurrentThemeName());
      setSoundEnabled(soundManager.isSoundEnabled());
      setVolume(soundManager.getVolume());
    }
  }, [isOpen]);

  const handleThemeChange = (themeName: string) => {
    themeManager.setTheme(themeName);
    setCurrentTheme(themeName);
  };

  const handleSoundToggle = () => {
    if (soundEnabled) {
      soundManager.disable();
      setSoundEnabled(false);
    } else {
      soundManager.enable();
      setSoundEnabled(true);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    soundManager.setVolume(newVolume);
    setVolume(newVolume);
  };

  const handleExportData = () => {
    exportManager.exportToFile();
  };

  const handleExportHighScores = () => {
    exportManager.exportHighScores();
  };

  const handleExportAchievements = () => {
    exportManager.exportAchievements();
  };

  const handleExportReport = () => {
    exportManager.exportReport();
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      exportManager.importFromFile(file).then((success) => {
        if (success) {
          alert('Данные успешно импортированы!');
        } else {
          alert('Ошибка при импорте данных');
        }
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="settings-overlay">
      <div className="settings-modal">
        <div className="settings-header">
          <h2>⚙️ Настройки</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="settings-content">
          {/* Theme Settings */}
          <section className="settings-section">
            <h3>🎨 Тема</h3>
            <div className="theme-grid">
              {themes.map((theme) => (
                <button
                  key={theme.name}
                  className={`theme-button ${currentTheme === theme.name ? 'active' : ''}`}
                  onClick={() => handleThemeChange(theme.name)}
                  style={{
                    backgroundColor: theme.colors.background,
                    color: theme.colors.text,
                    borderColor: theme.colors.button
                  }}
                >
                  {theme.name}
                </button>
              ))}
            </div>
          </section>

          {/* Sound Settings */}
          <section className="settings-section">
            <h3>🔊 Звук</h3>
            <div className="sound-controls">
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={handleSoundToggle}
                />
                <span className="toggle-slider"></span>
                Звуковые эффекты
              </label>
              
              <div className="volume-control">
                <label>Громкость: {Math.round(volume * 100)}%</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  disabled={!soundEnabled}
                />
              </div>
            </div>
          </section>

          {/* Export/Import Settings */}
          <section className="settings-section">
            <h3>📊 Данные</h3>
            <div className="data-controls">
              <div className="export-buttons">
                <button onClick={handleExportData} className="export-button">
                  📁 Экспорт всех данных
                </button>
                <button onClick={handleExportHighScores} className="export-button">
                  🏆 Экспорт рекордов
                </button>
                <button onClick={handleExportAchievements} className="export-button">
                  🏅 Экспорт достижений
                </button>
                <button onClick={handleExportReport} className="export-button">
                  📊 Экспорт отчета
                </button>
              </div>
              
              <div className="import-control">
                <label htmlFor="import-file" className="import-button">
                  📥 Импорт данных
                </label>
                <input
                  id="import-file"
                  type="file"
                  accept=".json"
                  onChange={handleImportData}
                  style={{ display: 'none' }}
                />
              </div>
            </div>
          </section>

          {/* PWA Settings */}
          <section className="settings-section">
            <h3>📱 PWA</h3>
            <div className="pwa-info">
              <p>Snake Game Pro поддерживает установку как приложение!</p>
              <button 
                className="install-button"
                onClick={() => {
                  // PWA install logic would go here
                  alert('Функция установки PWA будет доступна в браузере');
                }}
              >
                📱 Установить приложение
              </button>
            </div>
          </section>
        </div>

        <div className="settings-footer">
          <button className="close-button" onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
