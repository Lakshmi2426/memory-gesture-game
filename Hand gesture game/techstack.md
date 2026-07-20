# Tech Stack
## Memory Moves – Hand Gesture Memory Game

**Version:** 1.0  
**Project:** Memory Moves  
**Role Perspective:** Senior Full Stack Developer  
**Primary Goal:** Build a real-time, low-latency, browser-based hand gesture memory game using computer vision.

---

# 1. Tech Stack Overview

| Layer | Technology | Purpose |
|--------|------------|---------|
| Frontend | React + Vite | Fast and responsive UI |
| Styling | Tailwind CSS | Modern, responsive styling |
| State Management | React Context API | Manage game state |
| Computer Vision | OpenCV.js | Webcam access and image preprocessing |
| Hand Tracking | MediaPipe Hands | Real-time hand landmark detection |
| Gesture Recognition | Custom Gesture Classifier | Convert landmarks into gestures |
| Backend | Firebase | Authentication & database |
| Database | Cloud Firestore | High scores and game statistics |
| Hosting | Firebase Hosting | Deploy frontend |
| Storage | Firebase Storage (Optional) | Assets and future media |
| Analytics | Firebase Analytics (Optional) | Track gameplay metrics |
| Version Control | Git + GitHub | Source code management |

---

# 2. Architecture

```
                   Browser
                      │
         ┌────────────┴────────────┐
         │                         │
         ▼                         ▼
   React + Vite UI          OpenCV.js
         │                         │
         └────────────┬────────────┘
                      ▼
              MediaPipe Hands
                      │
                      ▼
            Gesture Classifier
                      │
                      ▼
               Game Engine Logic
                      │
        ┌─────────────┴─────────────┐
        ▼                           ▼
 React UI Updates            Firebase Services
                                   │
                         Cloud Firestore
```

---

# 3. Frontend

## Framework

**React 19**

Reason

- Component-based architecture
- Fast rendering
- Easy state management
- Excellent MediaPipe integration

---

## Build Tool

**Vite**

Reason

- Extremely fast startup
- Hot Module Reload
- Optimized production build
- Lightweight

---

## Styling

**Tailwind CSS**

Reason

- Rapid UI development
- Utility-first CSS
- Responsive by default
- Easy animations

---

## Icons

Recommended

- Lucide React

Alternative

- Heroicons

---

# 4. Computer Vision

## OpenCV.js

Purpose

- Webcam access
- Frame capture
- Frame preprocessing
- Canvas rendering
- Camera overlays

Responsibilities

- Read webcam frames
- Convert image formats
- Resize frames
- Draw landmarks
- FPS optimization

---

## MediaPipe Hands

Purpose

Detect hand landmarks.

Outputs

- 21 hand landmarks
- Finger positions
- Hand orientation
- Tracking confidence

Why MediaPipe?

- Fast
- Lightweight
- Runs inside browser
- No server inference required
- Very accurate

---

# 5. Gesture Recognition

A custom classifier will be built using MediaPipe landmarks.

Supported gestures

- ✋ Open Palm
- ✊ Fist
- 👍 Thumbs Up
- ✌ Peace
- 👌 OK

Classification approach

```
MediaPipe Landmarks

↓

Finger State Detection

↓

Gesture Mapping

↓

Confidence Score

↓

Validated Gesture
```

Gesture recognition should include:

- Confidence threshold
- Stability over multiple frames
- Cooldown to avoid duplicate detections

---

# 6. Game Engine

The game engine manages all gameplay logic.

Responsibilities

- Level generation
- Random gesture selection
- Sequence storage
- Sequence validation
- Score calculation
- Lives management
- Difficulty progression
- Timer handling
- Game over logic

Suggested structure

```
Game Engine

├── Sequence Manager
├── Score Manager
├── Lives Manager
├── Timer Manager
├── Level Manager
└── Gesture Validator
```

---

# 7. State Management

Use React Context API.

Global state

```
Current Level

Current Score

Lives

Current Sequence

Expected Gesture Index

Game Status

Timer

Camera Status

Recognition Status
```

No Redux is required for Version 1.

---

# 8. Backend

## Firebase

Services

### Cloud Firestore

Store

- High Scores
- Player Statistics
- Leaderboard
- Session History

Example

```
players

    playerId

        score

        highestLevel

        longestSequence

        accuracy

        playedAt
```

---

### Firebase Hosting

Deploy

- React Application

Benefits

- HTTPS
- CDN
- Fast deployment

---

### Firebase Analytics (Optional)

Track

- Total games
- Average score
- Most failed level
- Average play time

---

# 9. Folder Structure

```
memory-moves/

│

├── public/

├── src/

│   ├── assets/

│   ├── components/

│   │

│   ├── camera/

│   │      CameraFeed.jsx
│   │      HandTracker.js

│   │

│   ├── gestures/

│   │      classifier.js
│   │      gestureUtils.js

│   │

│   ├── game/

│   │      GameEngine.js
│   │      ScoreManager.js
│   │      LivesManager.js
│   │      SequenceManager.js

│   │

│   ├── screens/

│   │      Home.jsx
│   │      Tutorial.jsx
│   │      Game.jsx
│   │      Result.jsx

│   │

│   ├── context/

│   │      GameContext.jsx

│   │

│   ├── firebase/

│   │      firebase.js

│   │

│   ├── hooks/

│   │

│   ├── utils/

│   │

│   ├── App.jsx

│   └── main.jsx

│

├── package.json

└── vite.config.js
```

---

# 10. Performance Optimization

## Gesture Stabilization

A gesture should be accepted only after it is detected consistently for **5–8 consecutive frames** to avoid false positives.

---

## Recognition Cooldown

After a gesture is accepted, apply a **700–1000 ms cooldown** before accepting another gesture.

---

## Camera Resolution

Recommended

```
640 × 480
```

Provides a good balance between performance and detection accuracy.

---

## Frame Rate

Target

```
30 FPS
```

Minimum acceptable

```
24 FPS
```

---

## Recognition Latency

Target

```
<100 milliseconds
```

---

# 11. Firebase Database Design

```
players

    autoGeneratedId

        playerName

        score

        highestLevel

        longestSequence

        accuracy

        createdAt
```

Future collections

```
leaderboard

sessions

analytics
```

---

# 12. Security

- Firebase Security Rules
- HTTPS only
- No sensitive client-side secrets
- Input validation before Firestore writes

---

# 13. Development Tools

| Tool | Purpose |
|------|---------|
| VS Code | Code editor |
| Git | Version control |
| GitHub | Repository hosting |
| Firebase CLI | Deployment |
| Chrome DevTools | Performance profiling |
| npm | Package management |

---

# 14. Browser Support

Recommended

- Google Chrome (Primary)
- Microsoft Edge
- Brave

Not recommended

- Safari (MediaPipe compatibility may vary)
- Internet Explorer (Unsupported)

---

# 15. Future Scalability

The architecture is designed to support future features without major refactoring:

- Multiplayer mode
- Online leaderboard
- Voice guidance
- AI-generated gesture challenges
- Additional hand gestures
- Difficulty modes
- Progressive Web App (PWA)
- Mobile support
- Admin dashboard
- QR code score sharing

---

# 16. Why This Stack?

| Requirement | Technology |
|------------|------------|
| Fast UI rendering | React + Vite |
| Responsive design | Tailwind CSS |
| Webcam processing | OpenCV.js |
| Real-time hand tracking | MediaPipe Hands |
| Gesture recognition | Custom Classifier |
| Game state | React Context API |
| Backend | Firebase |
| Database | Cloud Firestore |
| Hosting | Firebase Hosting |
| Version control | GitHub |

This stack keeps all gesture processing on the client side, minimizing latency by avoiding server round trips. Firebase is used only for persistence (scores, leaderboards, analytics), making the application fast, scalable, cost-effective, and well-suited for public exhibition environments like the Nutri Delight stall.
