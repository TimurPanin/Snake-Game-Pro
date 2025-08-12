# ⚡ Быстрый старт - Загрузка на GitHub

## 🚀 Автоматическая загрузка (Windows)

1. **Запустите скрипт**:
   ```
   upload-to-github.bat
   ```

2. **Следуйте инструкциям** на экране

## 📋 Ручная загрузка

### 1. Установите Git

```bash
# Скачайте с: https://git-scm.com/downloads
```

### 2. Настройте Git

```bash
git config --global user.name "Ваше Имя"
git config --global user.email "ваш.email@example.com"
```

### 3. Инициализируйте репозиторий

```bash
git init
git add .
git commit -m "Initial commit: Snake Game Pro with React"
git branch -M main
```

### 4. Создайте репозиторий на GitHub
- Перейдите на: https://github.com/new
- **Name**: `snake-game-pro`
- **Description**: `Modern Snake game built with React, featuring multiple game modes, power-ups, and advanced architecture`
- **Visibility**: Public
- **НЕ** ставьте галочки на README, .gitignore, license

### 5. Загрузите код

```bash
git remote add origin https://github.com/ВАШ_USERNAME/snake-game-pro.git
git push -u origin main
```

### 6. Добавьте тег релиза

```bash
git tag -a v1.0.0 -m "First release: Snake Game Pro"
git push origin v1.0.0
```

## 🎯 Настройка GitHub Pages

1. В настройках репозитория → **Pages**
2. **Source**: Deploy from a branch
3. **Branch**: main
4. **Folder**: / (root)
5. **Save**

## 📊 Что будет загружено

```text
✅ 15+ файлов исходного кода
✅ 5 React компонентов
✅ 4 кастомных хука
✅ 2 утилиты
✅ Полная документация
✅ Современная архитектура
✅ Готовность к продакшену
```

## 🎮 Результат

После загрузки у вас будет:
- **Профессиональный репозиторий** на GitHub
- **Демо игры** на GitHub Pages
- **Полная документация** проекта
- **Готовность к развитию** и продакшену

---

**Удачи! 🚀**

