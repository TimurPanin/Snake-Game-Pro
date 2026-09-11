# Snake Game Pro

[![CI](https://github.com/TimurPanin/Snake-Game-Pro/actions/workflows/ci.yml/badge.svg)](https://github.com/TimurPanin/Snake-Game-Pro/actions/workflows/ci.yml)

A browser-based Snake game built with **React 18**, **Webpack** and **JavaScript**, with a small amount of TypeScript used for tests, types and audio utilities.

The project is a compact portfolio/learning project focused on game-state management, reusable React hooks, collision logic, local persistence and automated tests.

## Features

- Three game modes:
  - **Classic** - standard speed and scoring
  - **Speed** - faster movement and higher food value
  - **Maze** - generated internal walls
- Keyboard controls with **Arrow keys** or **WASD**
- Pause/resume with **Space** or **P**
- Score, level and persistent high score
- Level progression every five food pickups
- Increasing game speed as the level rises
- Three implemented temporary power-ups:
  - **Speed Boost**
  - **Double Points**
  - **Ghost Mode** with edge wrapping and collision bypass
- Synthesized game sound effects using the Web Audio API
- Mute/unmute control
- Responsive layout styling
- Jest + Testing Library tests for game utilities and the game board

## Tech stack

- **React 18**
- **JavaScript / JSX**
- **TypeScript tooling** for selected files and tests
- **Webpack 5**
- **Babel**
- **CSS3**
- **Jest**
- **Testing Library**
- **PropTypes**
- **localStorage**
- **Web Audio API**

> The main application is primarily JavaScript. TypeScript is present in supporting files and tests, so this repository should not be considered a fully TypeScript application.

## Project structure

```text
src/
├── components/
│   ├── GameBoard.js
│   ├── GameControls.js
│   ├── GameMenu.js
│   ├── GameOver.js
│   ├── GameStats.js
│   └── __tests__/
├── constants/
│   └── game.js
├── hooks/
│   ├── useGameLoop.js
│   ├── useGameState.js
│   ├── useHighScore.js
│   └── usePowerUps.js
├── types/
│   └── game.ts
├── utils/
│   ├── gameUtils.js
│   ├── soundManager.ts
│   ├── storage.js
│   └── __tests__/
├── App.js
├── index.js
└── styles.css
```

## Architecture notes

Game state is managed through a reducer-based custom hook in `useGameState.js`. The timed game loop is isolated in `useGameLoop.js`, temporary effects are managed in `usePowerUps.js`, and high-score persistence is separated into `useHighScore.js`.

Collision detection, random positions, maze-wall generation, scoring and speed calculations are kept in `gameUtils.js` rather than directly in the React components.

The maze generator keeps the initial snake spawn area clear so a new game does not begin with an obstacle on top of the player.

## Run locally

### Requirements

- Node.js 18+ recommended
- npm

### Install

```bash
npm ci
```

### Development server

```bash
npm start
```

Webpack Dev Server runs on port `3000` by default.

### Production build

```bash
npm run build
```

The generated files are written to `dist/`.

## Tests and checks

```bash
npm test -- --runInBand
npm run type-check
npm run lint
npm run build
```

GitHub Actions runs the production-dependency audit, tests, type check, lint and production build on pushes and pull requests to `main`.

The current test suite contains **25 tests** covering core game utilities and the `GameBoard` component.

## Controls

| Action | Control |
|---|---|
| Move | Arrow keys / WASD |
| Pause / resume | Space / P |
| Restart | Restart button |
| Sound | Speaker button |

## Notes

This repository intentionally presents only features that are implemented in the current codebase. Earlier experimental documentation referenced planned features such as multiplayer, achievements and additional power-ups; those are not presented as current functionality.
