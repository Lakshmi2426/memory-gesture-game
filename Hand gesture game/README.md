# Memory Moves

Memory Moves is a webcam-based hand-gesture memory game built with React, TypeScript, Vite, and MediaPipe. Players watch a new gesture appear at each level, remember the full sequence, and repeat it with their hand in front of the camera.

## Features

- Webcam-based hand detection and gesture recognition
- Progressive memory gameplay with increasing sequence length
- Tutorial flow for learning supported gestures
- Score, lives, and high-score tracking
- Responsive UI built with React and Tailwind-style components
- Firebase integration scaffold for future persistence or leaderboard features

## Supported gestures

- Open palm: ✋
- Fist: ✊
- Peace: ✌️
- Thumbs up: 👍
- OK: 👌

## Tech stack

- React 19
- TypeScript
- Vite
- MediaPipe Tasks Vision
- Firebase
- Lucide React

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open the local URL shown by Vite in your browser.

## Available scripts

- `npm run dev` — start the development server
- `npm run build` — build the app for production
- `npm run preview` — preview the production build locally
- `npm run lint` — run the linter

## Browser requirements

- A modern browser with webcam access
- Camera permissions enabled for local development
- A reliable local device camera for gesture recognition

## Environment variables

The app uses Firebase configuration values from environment variables such as:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`

If these are not set, the app will fall back to placeholder values in the Firebase setup file.

## Project structure

- `src/screens/` — main app screens such as home, tutorial, gameplay, and results
- `src/components/` — reusable UI components
- `src/context/` — game state and navigation logic
- `src/camera/` — webcam and hand tracking integration
- `src/gestures/` — gesture recognition rules and classification logic
- `src/game/` — gameplay managers for score, lives, sequences, and timers

## Notes

This project is currently in active development. The core gameplay loop and gesture recognition flow are implemented, and the app can be run locally to test the experience end to end.
