# 🚀 Инструкция по загрузке проекта на GitHub

## 📋 Предварительные требования

### 1. Установка Git
Скачайте и установите Git с официального сайта: https://git-scm.com/downloads

### 2. Создание аккаунта на GitHub
Зарегистрируйтесь на GitHub: https://github.com

## 🔧 Настройка Git

### 1. Настройка пользователя
```bash
git config --global user.name "Ваше Имя"
git config --global user.email "ваш.email@example.com"
```

### 2. Инициализация репозитория
```bash
git init
```

### 3. Добавление файлов
```bash
git add .
```

### 4. Первый коммит
```bash
git commit -m "Initial commit: Snake Game Pro with React"
```

## 📤 Создание репозитория на GitHub

### 1. Создание нового репозитория
1. Зайдите на GitHub.com
2. Нажмите "+" в правом верхнем углу
3. Выберите "New repository"
4. Заполните форму:
   - **Repository name**: `snake-game-pro`
   - **Description**: `Modern Snake game built with React, featuring multiple game modes, power-ups, and advanced architecture`
   - **Visibility**: Public (или Private по желанию)
   - **НЕ** ставьте галочки на "Add a README file", "Add .gitignore", "Choose a license"
5. Нажмите "Create repository"

### 2. Подключение локального репозитория
```bash
git remote add origin https://github.com/ВАШ_USERNAME/snake-game-pro.git
git branch -M main
git push -u origin main
```

## 📁 Структура проекта для загрузки

```text
snake-game-pro/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── GameBoard.js
│   │   ├── GameControls.js
│   │   ├── GameMenu.js
│   │   ├── GameOver.js
│   │   └── GameStats.js
│   ├── constants/
│   │   └── game.js
│   ├── hooks/
│   │   ├── useGameLoop.js
│   │   ├── useGameState.js
│   │   ├── useHighScore.js
│   │   └── usePowerUps.js
│   ├── utils/
│   │   ├── gameUtils.js
│   │   └── storage.js
│   ├── App.js
│   ├── index.js
│   └── styles.css
├── .babelrc
├── .gitignore
├── package.json
├── README.md
├── webpack.config.js
└── GITHUB_SETUP.md
```

## 🎯 Дополнительные настройки

### 1. Добавление тегов
```bash
git tag -a v1.0.0 -m "First release: Snake Game Pro"
git push origin v1.0.0
```

### 2. Настройка GitHub Pages (опционально)
1. В настройках репозитория перейдите в "Pages"
2. Выберите источник: "Deploy from a branch"
3. Выберите ветку: "main"
4. Выберите папку: "/ (root)"
5. Нажмите "Save"

### 3. Добавление описания репозитория
В настройках репозитория добавьте:
- **Website**: `https://ВАШ_USERNAME.github.io/snake-game-pro/`
- **Topics**: `react`, `game`, `snake`, `javascript`, `webpack`, `hooks`

## 🔄 Последующие обновления

### Добавление изменений

```bash
git add .
git commit -m "Описание изменений"
git push origin main
```

### Создание новой версии

```bash
git tag -a v1.1.0 -m "New features added"
git push origin v1.1.0
```

## 📊 Статистика проекта

После загрузки ваш репозиторий будет содержать:
- ✅ **15+ файлов** исходного кода
- ✅ **5 компонентов** React
- ✅ **4 кастомных хука**
- ✅ **2 утилиты** для логики
- ✅ **Полная документация**
- ✅ **Современная архитектура**
- ✅ **Готовность к продакшену**

## 🎮 Демо

После настройки GitHub Pages игра будет доступна по адресу:
`https://ВАШ_USERNAME.github.io/snake-game-pro/`

---

**Удачи с загрузкой! 🚀**
