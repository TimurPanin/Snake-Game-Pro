# Установка и настройка

## 📋 Требования

### Системные требования

- **Node.js**: версия 16.0.0 или выше
- **npm**: версия 8.0.0 или выше
- **Git**: для клонирования репозитория
- **Браузер**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

### Проверка версий

```bash
node --version
npm --version
git --version
```

## 🚀 Установка

### 1. Клонирование репозитория

```bash
git clone https://github.com/TimurPanin/Snake-Game-Pro.git
cd Snake-Game-Pro
```

### 2. Установка зависимостей

```bash
npm install
```

### 3. Запуск в режиме разработки

```bash
npm run dev
```

Игра автоматически откроется в браузере на `http://localhost:3001`

## 🛠 Доступные команды

### Разработка

```bash
# Запуск dev сервера
npm run dev

# Сборка для продакшена
npm run build

# Предварительный просмотр сборки
npm run preview
```

### Тестирование

```bash
# Запуск всех тестов
npm test

# Запуск тестов в watch режиме
npm run test:watch

# Запуск тестов с покрытием
npm run test:coverage
```

### Качество кода

```bash
# Проверка типов TypeScript
npm run type-check

# Линтинг кода
npm run lint

# Автоисправление ошибок линтера
npm run lint:fix
```

## ⚙️ Конфигурация

### Переменные окружения

Создайте файл `.env` в корне проекта:

```env
# Порт для dev сервера
PORT=3001

# Режим сборки
NODE_ENV=development

# Включение/выключение звука по умолчанию
SOUND_ENABLED=true

# Громкость звука (0-1)
SOUND_VOLUME=0.5
```

### Настройка Webpack

Основные настройки находятся в `webpack.config.js`:

```javascript
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    port: 3001,
    open: true,
    hot: true,
  },
  // ... остальные настройки
};
```

### Настройка TypeScript

Конфигурация TypeScript в `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/utils/*": ["src/utils/*"],
      "@/hooks/*": ["src/hooks/*"],
      "@/constants/*": ["src/constants/*"],
      "@/types/*": ["src/types/*"]
    }
  },
  "include": ["src"]
}
```

## 🔧 Устранение неполадок

### Проблемы с установкой

#### Ошибка "EADDRINUSE"
```bash
# Порт 3001 занят, используйте другой порт
PORT=3002 npm run dev
```

#### Ошибки зависимостей
```bash
# Очистка кэша npm
npm cache clean --force

# Удаление node_modules и переустановка
rm -rf node_modules package-lock.json
npm install
```

#### Проблемы с TypeScript
```bash
# Проверка типов
npm run type-check

# Переустановка TypeScript
npm install typescript@latest
```

### Проблемы с браузером

#### Звук не работает
- Убедитесь, что браузер поддерживает Web Audio API
- Проверьте настройки звука в браузере
- Попробуйте другой браузер

#### Игра не загружается
- Очистите кэш браузера
- Проверьте консоль на ошибки
- Убедитесь, что все файлы загружены

## 📦 Развертывание

### Локальная сборка

```bash
# Создание продакшен сборки
npm run build

# Файлы будут в папке dist/
```

### GitHub Pages

```bash
# Установка gh-pages
npm install --save-dev gh-pages

# Добавьте в package.json
{
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}

# Развертывание
npm run build
npm run deploy
```

### Netlify

1. Подключите репозиторий к Netlify
2. Установите build command: `npm run build`
3. Установите publish directory: `dist`

### Vercel

1. Подключите репозиторий к Vercel
2. Vercel автоматически определит настройки
3. Нажмите Deploy

## 🔄 Обновления

### Обновление зависимостей

```bash
# Проверка устаревших пакетов
npm outdated

# Обновление всех зависимостей
npm update

# Обновление до последних версий
npx npm-check-updates -u
npm install
```

### Обновление проекта

```bash
# Получение последних изменений
git pull origin main

# Переустановка зависимостей
npm install

# Проверка работоспособности
npm test
npm run dev
```

---

**Готово! Теперь вы можете начать разработку! 🚀**
