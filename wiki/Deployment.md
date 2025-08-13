# Развертывание

Полное руководство по развертыванию Snake Game Pro на различных платформах.

## 🚀 Подготовка к развертыванию

### Сборка проекта

```bash
# Установка зависимостей
npm install

# Создание продакшен сборки
npm run build

# Проверка сборки
npm run preview
```

### Оптимизация

#### Анализ размера бандла

```bash
# Установка анализатора
npm install --save-dev webpack-bundle-analyzer

# Анализ бандла
npm run build
npx webpack-bundle-analyzer dist/stats.json
```

#### Оптимизация изображений

```bash
# Установка оптимизатора
npm install --save-dev imagemin imagemin-webp

# Оптимизация изображений
npx imagemin public/images/* --out-dir=dist/images
```

## 🌐 GitHub Pages

### Автоматическое развертывание

1. **Установка gh-pages**

```bash
npm install --save-dev gh-pages
```

2. **Настройка package.json**

```json
{
  "scripts": {
    "deploy": "gh-pages -d dist",
    "predeploy": "npm run build"
  },
  "homepage": "https://timurpanin.github.io/Snake-Game-Pro"
}
```

3. **Развертывание**

```bash
npm run deploy
```

### Ручное развертывание

1. **Создание ветки gh-pages**

```bash
git checkout -b gh-pages
git add dist -f
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

2. **Настройка в GitHub**

- Перейдите в Settings → Pages
- Выберите Source: Deploy from a branch
- Выберите Branch: gh-pages
- Нажмите Save

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## ☁️ Netlify

### Автоматическое развертывание

1. **Подключение репозитория**

- Зайдите на [netlify.com](https://netlify.com)
- Нажмите "New site from Git"
- Выберите GitHub и репозиторий

2. **Настройка сборки**

```
Build command: npm run build
Publish directory: dist
```

3. **Переменные окружения**

```
NODE_VERSION=16
NPM_VERSION=8
```

### Ручное развертывание

```bash
# Установка Netlify CLI
npm install -g netlify-cli

# Логин
netlify login

# Инициализация
netlify init

# Развертывание
netlify deploy --prod --dir=dist
```

### netlify.toml

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "16"
  NPM_VERSION = "8"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## ⚡ Vercel

### Автоматическое развертывание

1. **Подключение репозитория**

- Зайдите на [vercel.com](https://vercel.com)
- Нажмите "New Project"
- Импортируйте GitHub репозиторий

2. **Автоматическая настройка**

Vercel автоматически определит настройки для React проекта.

### Ручное развертывание

```bash
# Установка Vercel CLI
npm install -g vercel

# Логин
vercel login

# Развертывание
vercel --prod
```

### vercel.json

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

## 🔥 Firebase Hosting

### Настройка

1. **Установка Firebase CLI**

```bash
npm install -g firebase-tools
```

2. **Инициализация проекта**

```bash
firebase login
firebase init hosting
```

3. **Настройка firebase.json**

```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

4. **Развертывание**

```bash
npm run build
firebase deploy
```

## 🐳 Docker

### Dockerfile

```dockerfile
# Многоэтапная сборка
FROM node:16-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Продакшен образ
FROM nginx:alpine

# Копирование собранных файлов
COPY --from=builder /app/dist /usr/share/nginx/html

# Копирование конфигурации nginx
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # Gzip сжатие
        gzip on;
        gzip_vary on;
        gzip_min_length 1024;
        gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

        # Кэширование статических файлов
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # SPA роутинг
        location / {
            try_files $uri $uri/ /index.html;
        }

        # Безопасность
        add_header X-Frame-Options "DENY" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    }
}
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  snake-game:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
```

### Сборка и запуск

```bash
# Сборка образа
docker build -t snake-game-pro .

# Запуск контейнера
docker run -p 80:80 snake-game-pro

# Или с Docker Compose
docker-compose up -d
```

## 📱 PWA развертывание

### Настройка Service Worker

```javascript
// public/sw.js
const CACHE_NAME = 'snake-game-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
```

### Регистрация Service Worker

```javascript
// src/index.js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
```

### manifest.json

```json
{
  "name": "Snake Game Pro",
  "short_name": "Snake Pro",
  "description": "Modern Snake game with power-ups and multiple modes",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#000000",
  "theme_color": "#00ff00",
  "icons": [
    {
      "src": "icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

## 🔒 Безопасность

### HTTPS

```bash
# Получение SSL сертификата (Let's Encrypt)
sudo certbot --nginx -d yourdomain.com

# Автоматическое обновление
sudo crontab -e
# Добавить: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Заголовки безопасности

```nginx
# nginx.conf
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';" always;
```

### CSP (Content Security Policy)

```html
<!-- index.html -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">
```

## 📊 Мониторинг

### Google Analytics

```html
<!-- index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Sentry (отслеживание ошибок)

```bash
npm install @sentry/react @sentry/tracing
```

```javascript
// src/index.js
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

## 🚀 CI/CD Pipeline

### GitHub Actions (полный pipeline)

```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test -- --coverage --watchAll=false
    
    - name: Run linting
      run: npm run lint
    
    - name: Type check
      run: npm run type-check

  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Upload build artifacts
      uses: actions/upload-artifact@v2
      with:
        name: build-files
        path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Download build artifacts
      uses: actions/download-artifact@v2
      with:
        name: build-files
        path: dist/
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
    
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v1.2
      with:
        publish-dir: './dist'
        production-branch: main
        github-token: ${{ secrets.GITHUB_TOKEN }}
        deploy-message: "Deploy from GitHub Actions"
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 📈 Аналитика производительности

### Lighthouse CI

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI

on:
  push:
    branches: [ main ]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Run Lighthouse CI
      run: |
        npm install -g @lhci/cli@0.11.x
        lhci autorun
```

### lighthouserc.js

```javascript
module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', {minScore: 0.9}],
        'categories:accessibility': ['error', {minScore: 0.9}],
        'categories:best-practices': ['warn', {minScore: 0.9}],
        'categories:seo': ['warn', {minScore: 0.9}]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
```

---

**Выберите подходящий способ развертывания для ваших потребностей! 🚀**
