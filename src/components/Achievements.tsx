import React, { useState, useEffect } from 'react';
import { AchievementManager } from '../utils/achievements';
import { Achievement } from '../types/game';

interface AchievementsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Achievements: React.FC<AchievementsProps> = ({ isOpen, onClose }) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [unlockedCount, setUnlockedCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [achievementManager] = useState<AchievementManager>(new AchievementManager());

  useEffect(() => {
    if (isOpen) {
      const allAchievements = achievementManager.getAchievements();
      setAchievements(allAchievements);
      setUnlockedCount(achievementManager.getUnlockedCount());
      setTotalCount(achievementManager.getTotalCount());
    }
  }, [isOpen, achievementManager]);

  const handleResetAchievements = () => {
    if (window.confirm('Вы уверены, что хотите сбросить все достижения?')) {
      achievementManager.resetAchievements();
      const allAchievements = achievementManager.getAchievements();
      setAchievements(allAchievements);
      setUnlockedCount(achievementManager.getUnlockedCount());
    }
  };

  const getProgressPercentage = () => {
    return totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;
  };

  if (!isOpen) return null;

  return (
    <div className="achievements-overlay">
      <div className="achievements-modal">
        <div className="achievements-header">
          <h2>🏆 Достижения</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="achievements-content">
          {/* Progress Bar */}
          <div className="progress-section">
            <div className="progress-info">
              <span>Прогресс: {unlockedCount}/{totalCount}</span>
              <span>{getProgressPercentage()}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="achievements-grid">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
              >
                <div className="achievement-icon">
                  {achievement.unlocked ? achievement.icon : '🔒'}
                </div>
                <div className="achievement-info">
                  <h3 className="achievement-name">
                    {achievement.unlocked ? achievement.name : '???'}
                  </h3>
                  <p className="achievement-description">
                    {achievement.unlocked ? achievement.description : 'Достижение заблокировано'}
                  </p>
                  {achievement.unlocked && achievement.unlockedAt && (
                    <p className="achievement-date">
                      Разблокировано: {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="achievement-status">
                  {achievement.unlocked ? '✅' : '🔒'}
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="achievements-actions">
            <button 
              className="reset-button"
              onClick={handleResetAchievements}
              title="Сбросить все достижения"
            >
              🔄 Сбросить достижения
            </button>
          </div>
        </div>

        <div className="achievements-footer">
          <button className="close-button" onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
