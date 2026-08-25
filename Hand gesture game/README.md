# Memory Moves – Hand Gesture Memory Game

A webcam-based gesture memory game powered by **MediaPipe Hand Tracking**. Watch a new gesture each level, remember the growing sequence, and repeat it in order using your hand!

```
Hand gesture game/
├── frontend/      ← React + Vite + TypeScript + TailwindCSS v4
└── backend/       ← Express + Firebase Admin (leaderboard API)
```

---

## 🎮 Gameplay

| Level | Game shows | Player performs |
|---|---|---|
| 1 | ✋ | ✋ |
| 2 | 👍 | ✋ → 👍 |
| 3 | ✌️ | ✋ → 👍 → ✌️ |

- **3 lives** — lose a life on wrong gesture or timeout
- **Scoring**: +10 per level, +5 for perfect run, +5 for fast completion
- **5 gestures**: ✋ ☝️ 👍 ✌️ 👌

---

## 🚀 Quick Start

### Frontend (development)

```bash
cd frontend
npm install
cp .env.example .env          # fill in Firebase values
npm run dev
```

Open http://localhost:5173

### Backend (optional – leaderboard API)

```bash
cd backend
npm install
cp .env.example .env          # fill in Firebase Admin credentials
npm run dev
```

API runs at http://localhost:3001

---

## 📦 Scripts

### Frontend
| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | TypeScript check + production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Lint with oxlint |
| `npm run deploy` | Build + deploy to Firebase Hosting |

### Backend
| Command | Description |
|---|---|
| `npm run dev` | Start with ts-node-dev (hot reload) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled production server |

---

## 🌐 Deployment

### Frontend → Vercel

1. Push `frontend/` to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. **Root Directory**: `frontend`
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. Add all `VITE_*` environment variables from `frontend/.env.example`

The included `frontend/vercel.json` handles:
- SPA client-side routing rewrites
- `Cross-Origin-Embedder-Policy` + `Cross-Origin-Opener-Policy` headers (required by MediaPipe WASM)

### Backend → Render

1. Push `backend/` to GitHub
2. Connect repo in [Render](https://render.com) → New Web Service
3. **Root Directory**: `backend`
4. **Build Command**: `npm install && npm run build`
5. **Start Command**: `npm start`
6. Add environment variables from `backend/.env.example` in the Render dashboard

> **Important**: Firebase private key must be pasted with literal `\n` newlines preserved. In Render's dashboard, paste the key exactly as it appears in the JSON file.

---

## 🔥 Firebase Setup

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Firestore Database** (start in test mode, then lock down rules)
3. Add a **Web App** → copy config into `frontend/.env`
4. Generate a **Service Account** key → use values in `backend/.env`

### Firestore Security Rules (recommended)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /leaderboard/{entry} {
      allow read: if true;
      allow write: if false; // Only backend writes via Admin SDK
    }
  }
}
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | React 19 + TypeScript |
| Build tool | Vite 8 |
| Styling | TailwindCSS v4 + custom CSS |
| Hand tracking | MediaPipe Tasks Vision (WASM) |
| Icons | Lucide React |
| Backend | Express 4 + TypeScript |
| Database | Firebase Firestore |
| Validation | Zod |
| Frontend deploy | Vercel |
| Backend deploy | Render |

---

## 🐛 Bugs Fixed in This Version

| Bug | Fix |
|---|---|
| Lives started at 2 instead of PRD's 3 | Fixed: `MAX_LIVES = 3` constant |
| Timer double-penalized lives | Fixed: timer uses `setLives` functional updater only |
| `ScoreCard.tsx` broken Tailwind classes | Fixed: replaced with inline styles |
| `animate-slide-in-up` CSS class missing | Fixed: added keyframe + class to `index.css` |
| Unused OpenCV.js CDN script in HTML | Fixed: removed |
| Poppins font loaded (app uses Outfit) | Fixed: removed, Outfit loaded correctly |
| Duplicate `src/firebase.js` | Fixed: deleted |
| No Accuracy % on Game Over screen | Fixed: tracked & displayed |
| No Perfect/Fast scoring bonuses | Fixed: +5 perfect, +5 fast per PRD §12 |
