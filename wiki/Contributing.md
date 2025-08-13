# Вклад в проект

Спасибо за интерес к Snake Game Pro! Мы приветствуем вклад от всех желающих.

## 🤝 Как внести вклад

### Типы вкладов

- 🐛 **Исправление ошибок** - сообщите о баге или исправьте его
- ✨ **Новые функции** - предложите и реализуйте новые возможности
- 📚 **Документация** - улучшите документацию и примеры
- 🧪 **Тесты** - добавьте или улучшите тесты
- 🎨 **UI/UX** - улучшите интерфейс и пользовательский опыт
- 🔧 **Оптимизация** - улучшите производительность
- 🌐 **Переводы** - добавьте поддержку новых языков

## 🚀 Быстрый старт

### 1. Форк репозитория

1. Перейдите на [GitHub репозиторий](https://github.com/TimurPanin/Snake-Game-Pro)
2. Нажмите кнопку "Fork" в правом верхнем углу
3. Склонируйте ваш форк локально:

```bash
git clone https://github.com/YOUR_USERNAME/Snake-Game-Pro.git
cd Snake-Game-Pro
```

### 2. Настройка окружения

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Запуск тестов
npm test
```

### 3. Создание ветки

```bash
# Создание новой ветки для ваших изменений
git checkout -b feature/your-feature-name

# Или для исправления ошибок
git checkout -b fix/your-bug-fix
```

## 📋 Процесс разработки

### 1. Планирование

- Создайте Issue для обсуждения ваших изменений
- Опишите проблему или предложение
- Обсудите подход с сообществом

### 2. Разработка

- Следуйте стандартам кода (см. ниже)
- Пишите тесты для новых функций
- Обновляйте документацию при необходимости

### 3. Тестирование

```bash
# Запуск всех тестов
npm test

# Запуск тестов с покрытием
npm run test:coverage

# Проверка линтера
npm run lint

# Проверка типов TypeScript
npm run type-check
```

### 4. Коммит

```bash
# Добавление изменений
git add .

# Создание коммита с описательным сообщением
git commit -m "feat: add new power-up system

- Add 3 new power-ups: Time Freeze, Magnet, Shield
- Implement power-up activation logic
- Add visual effects for active power-ups
- Update documentation with new features

Closes #123"
```

### 5. Push и Pull Request

```bash
# Отправка изменений
git push origin feature/your-feature-name
```

1. Перейдите на GitHub и создайте Pull Request
2. Заполните шаблон PR
3. Ожидайте ревью кода

## 📝 Стандарты кода

### JavaScript/TypeScript

```javascript
// Используйте современный JavaScript
const snake = [{ x: 0, y: 0 }];
const food = { x: 5, y: 5 };

// Используйте стрелочные функции
const moveSnake = (direction) => {
  // логика движения
};

// Используйте деструктуризацию
const { score, level } = gameState;

// Используйте async/await
const loadGameData = async () => {
  try {
    const data = await fetch('/api/game-data');
    return await data.json();
  } catch (error) {
    console.error('Failed to load game data:', error);
  }
};
```

### React компоненты

```jsx
// Функциональные компоненты с хуками
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const GameBoard = ({ snake, food, powerUp, walls, activeEffects }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnimation = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  }, []);

  useEffect(() => {
    if (powerUp) {
      handleAnimation();
    }
  }, [powerUp, handleAnimation]);

  return (
    <div className="game-board" data-testid="game-board">
      {/* Рендер игровых элементов */}
    </div>
  );
};

GameBoard.propTypes = {
  snake: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    })
  ).isRequired,
  food: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }),
  powerUp: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }),
  walls: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    })
  ).isRequired,
  activeEffects: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      endTime: PropTypes.number.isRequired
    })
  ).isRequired
};

export default GameBoard;
```

### CSS стили

```css
/* Используйте CSS переменные */
:root {
  --primary-color: #00ff00;
  --secondary-color: #ff0000;
  --background-color: #000000;
  --text-color: #ffffff;
  --border-radius: 4px;
  --transition-duration: 0.3s;
}

/* Используйте BEM методологию */
.game-board {
  display: grid;
  grid-template-columns: repeat(25, 1fr);
  gap: 1px;
  background-color: var(--background-color);
  border: 2px solid var(--primary-color);
  border-radius: var(--border-radius);
}

.game-board__cell {
  width: 20px;
  height: 20px;
  background-color: transparent;
  transition: background-color var(--transition-duration);
}

.game-board__cell--snake {
  background-color: var(--primary-color);
  border-radius: 2px;
}

.game-board__cell--food {
  background-color: var(--secondary-color);
  border-radius: 50%;
  animation: pulse 1s infinite;
}

/* Адаптивный дизайн */
@media (max-width: 768px) {
  .game-board {
    grid-template-columns: repeat(20, 1fr);
  }
  
  .game-board__cell {
    width: 15px;
    height: 15px;
  }
}
```

### Тесты

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import GameBoard from '../GameBoard';

describe('GameBoard', () => {
  const defaultProps = {
    snake: [{ x: 0, y: 0 }],
    food: { x: 5, y: 5 },
    powerUp: null,
    walls: [],
    activeEffects: []
  };

  test('renders game board with correct structure', () => {
    render(<GameBoard {...defaultProps} />);
    
    expect(screen.getByTestId('game-board')).toBeInTheDocument();
    expect(screen.getByTestId('snake-segment')).toBeInTheDocument();
    expect(screen.getByTestId('food')).toBeInTheDocument();
  });

  test('handles power-up animation correctly', () => {
    const propsWithPowerUp = {
      ...defaultProps,
      powerUp: { x: 10, y: 10, type: 'SPEED_BOOST', color: '#FFD700' }
    };
    
    render(<GameBoard {...propsWithPowerUp} />);
    
    const powerUp = screen.getByTestId('power-up');
    expect(powerUp).toHaveClass('power-up--animating');
  });
});
```

## 📋 Шаблоны

### Issue Template

```markdown
## Описание

Краткое описание проблемы или предложения.

## Тип изменения

- [ ] Исправление ошибки
- [ ] Новая функция
- [ ] Улучшение документации
- [ ] Рефакторинг кода
- [ ] Тесты
- [ ] Другое

## Шаги для воспроизведения

1. Откройте игру
2. Выберите режим Classic
3. Начните игру
4. Попробуйте использовать пауэр-ап
5. Ошибка происходит на шаге 4

## Ожидаемое поведение

Пауэр-ап должен активироваться и показать визуальный эффект.

## Фактическое поведение

Пауэр-ап не активируется, консоль показывает ошибку.

## Скриншоты

Если применимо, добавьте скриншоты.

## Окружение

- ОС: Windows 10
- Браузер: Chrome 90
- Версия игры: 1.0.0

## Дополнительная информация

Любая дополнительная информация.
```

### Pull Request Template

```markdown
## Описание

Краткое описание изменений.

## Тип изменения

- [ ] Исправление ошибки
- [ ] Новая функция
- [ ] Улучшение документации
- [ ] Рефакторинг кода
- [ ] Тесты
- [ ] Другое

## Изменения

- Добавлен новый пауэр-ап Time Freeze
- Исправлена ошибка с WASD управлением
- Обновлена документация

## Тестирование

- [ ] Все тесты проходят
- [ ] Добавлены новые тесты
- [ ] Проверено в разных браузерах
- [ ] Проверено на мобильных устройствах

## Скриншоты

Если применимо, добавьте скриншоты.

## Checklist

- [ ] Код следует стандартам проекта
- [ ] Добавлены PropTypes для новых компонентов
- [ ] Обновлена документация
- [ ] Добавлены тесты для новых функций
- [ ] Проверен линтер (npm run lint)
- [ ] Проверены типы TypeScript (npm run type-check)

## Связанные Issues

Closes #123
Fixes #456
```

## 🏷️ Система меток

### Labels для Issues

- `bug` - Ошибка в коде
- `enhancement` - Улучшение существующей функции
- `feature` - Новая функция
- `documentation` - Улучшение документации
- `good first issue` - Подходит для новичков
- `help wanted` - Нужна помощь
- `priority: high` - Высокий приоритет
- `priority: low` - Низкий приоритет

### Labels для Pull Requests

- `ready for review` - Готов к ревью
- `work in progress` - В процессе разработки
- `breaking change` - Критические изменения
- `bug fix` - Исправление ошибки
- `feature` - Новая функция

## 🔍 Ревью кода

### Для авторов

1. **Подготовка PR**
   - Убедитесь, что все тесты проходят
   - Проверьте линтер и типы
   - Обновите документацию
   - Добавьте описательное сообщение

2. **Ответ на комментарии**
   - Отвечайте на все комментарии
   - Вносите необходимые изменения
   - Будьте открыты к предложениям

### Для ревьюеров

1. **Проверка кода**
   - Функциональность
   - Производительность
   - Безопасность
   - Читаемость

2. **Конструктивная обратная связь**
   - Будьте вежливы и конструктивны
   - Объясняйте причины предложений
   - Предлагайте альтернативы

## 🎯 Рекомендации

### Для новичков

1. **Начните с простого**
   - Исправьте опечатки в документации
   - Добавьте тесты для существующих функций
   - Улучшите комментарии в коде

2. **Изучите код**
   - Прочитайте README и документацию
   - Изучите структуру проекта
   - Запустите игру локально

3. **Присоединитесь к сообществу**
   - Задавайте вопросы в Issues
   - Участвуйте в обсуждениях
   - Помогайте другим

### Для опытных разработчиков

1. **Архитектурные решения**
   - Предлагайте улучшения архитектуры
   - Оптимизируйте производительность
   - Добавляйте новые возможности

2. **Менторство**
   - Помогайте новичкам
   - Проводите ревью кода
   - Делитесь знаниями

## 📞 Связь

### Каналы связи

- **Issues**: Для багов и предложений
- **Discussions**: Для общих вопросов
- **Pull Requests**: Для кода
- **Wiki**: Для документации

### Правила поведения

1. **Будьте уважительны**
   - Относитесь к другим с уважением
   - Избегайте оскорблений и токсичности
   - Будьте конструктивны

2. **Будьте полезны**
   - Предлагайте решения, а не только проблемы
   - Помогайте другим участникам
   - Делитесь знаниями

3. **Будьте терпеливы**
   - Ревью кода может занять время
   - Не все предложения будут приняты
   - Учитесь на обратной связи

## 🏆 Признание вклада

### Способы признания

- **Contributors** - список в README
- **Releases** - упоминание в релизах
- **Special thanks** - особое спасибо за значительный вклад

### Критерии

- Качество кода
- Полезность изменений
- Соблюдение стандартов
- Активность в сообществе

---

**Спасибо за ваш вклад в развитие Snake Game Pro! 🎮**
