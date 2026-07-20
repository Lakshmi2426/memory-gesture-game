Product Requirements Document (PRD)
Memory Moves – Hand Gesture Memory Game

Version: 1.0
Project Name: Memory Moves
Platform: Web/Desktop (Webcam-Based)
Technology Stack: OpenCV + MediaPipe + Modern Web Frontend

1. Project Overview
Project Summary

Memory Moves is a webcam-based gesture memory game where players must remember an increasingly long sequence of hand gestures.

Unlike traditional memory games that replay the full sequence every round, Memory Moves only displays the newly added gesture. Players must recall every previous gesture from memory and perform the complete sequence using hand gestures recognized through OpenCV and MediaPipe.

The game is designed for quick, engaging gameplay suitable for exhibitions, public events, and interactive kiosks such as the Nutri Delight stall.

2. Objective

Create a fun, beginner-friendly gesture recognition game that:

Uses real-time hand tracking
Encourages memory skills
Requires no physical controller
Provides instant visual feedback
Works smoothly with minimal latency
Can be completed in short sessions (2–5 minutes)
3. Target Users
Exhibition visitors
School students
College students
Families
First-time users of gesture-controlled games

No gaming experience should be required.

4. Core Gameplay

Players observe a newly introduced gesture every level.

Instead of replaying the entire sequence, the game only displays the latest gesture.

Players must remember every previous gesture and perform the complete sequence in the correct order.

Example:

Level 1

Game shows:

✋

Player performs:

✋

Level 2

Game shows:

👍

Player performs:

✋ → 👍

Level 3

Game shows:

✌️

Player performs:

✋ → 👍 → ✌️

Level 4

Game shows:

👌

Player performs:

✋ → 👍 → ✌️ → 👌

The sequence continues until all lives are lost.

5. Goals
Primary Goals
Accurate gesture recognition
Very low detection latency
Simple gameplay
High replay value
Easy for first-time players
Secondary Goals
Attractive animations
Score tracking
High score tracking
Smooth transitions
Exhibition-friendly interface
6. Supported Hand Gestures

The first version supports five gestures.

Gesture	Emoji
Open Palm	✋
Fist	✊
Peace	✌️
Thumbs Up	👍
OK	👌

Future gestures can be added without changing gameplay.

7. Functional Requirements
FR-1 Welcome Screen

Display:

Game title
Background graphics
Start button
Short instructions

Instruction:

Watch the new gesture. Remember all previous gestures. Repeat the complete sequence.

Optional:

High Score
FR-2 Hand Detection

When Start is pressed:

Webcam opens
Camera initializes
MediaPipe starts tracking

If no hand is detected:

Display:

Please place your hand in front of the camera.

The game automatically continues once a hand is detected.

FR-3 Tutorial

Display each available gesture.

Sequence:

✋

↓

✊

↓

👍

↓

✌️

↓

👌

Each gesture remains visible for approximately one second.

After all gestures are shown:

Display

"Let's Begin!"

FR-4 Game Initialization

At game start:

Lives = 3

Score = 0

Level = 1

Sequence = Empty

Randomly choose the first gesture.

FR-5 Level Flow

Every level follows the same process.

Step 1

Generate one random gesture.

Append it to the sequence.

Example

Previous:

✋ → 👍

New:

✌️

Current sequence:

✋ → 👍 → ✌️

Step 2

Display only the new gesture.

Duration:

Approximately 1 second.

Step 3

Hide gesture.

Display:

"Your Turn"

Step 4

Player performs gestures.

System validates:

Correct gesture
Correct order
Step 5

If correct:

Display

"Level Complete"

Increase score.

Proceed to next level.

Step 6

If incorrect:

Lose one life.

Retry the current level.

8. Gesture Recognition

MediaPipe detects:

21 hand landmarks
Finger positions
Hand orientation

OpenCV processes:

Webcam frames
Image conversion
Camera feed
Display rendering

Recognition must support:

One hand only
Stable detection
Continuous tracking
9. Sequence Validation

The game validates each gesture immediately.

Checks:

Correct gesture
Correct order

Example

Expected:

✋

Player:

✋

Correct

Expected:

👍

Player:

✊

Incorrect

Life removed.

10. Lives System

Initial lives:

❤️ ❤️ ❤️

Wrong attempt:

❤️ ❤️ 🤍

Second mistake:

❤️ 🤍 🤍

Third mistake:

🤍 🤍 🤍

Game Over

11. Retry Logic

After losing one life:

Player retries the same level.

The game again displays only the newest gesture.

The player must perform the entire sequence again.

12. Scoring System

Suggested scoring:

Action	Points
Complete Level	+10
Perfect Level	+5
Fast Completion	+5

Example

Level Complete

10 points

Perfect

+5

Fast

+5

Total:

20

13. Difficulty Progression

Difficulty increases through:

Longer sequences

Shorter response time

Greater memory challenge

No additional controls

No additional gestures

14. Game Over

Occurs when:

Lives reach zero.

Display:

Game Over

Final Score

Highest Level

Longest Sequence

Accuracy %

Buttons:

Play Again

Home

15. Game Flow Diagram
Welcome Screen
      │
      ▼
Start Game
      │
      ▼
Hand Detection
      │
      ▼
Tutorial
      │
      ▼
Generate New Gesture
      │
      ▼
Show New Gesture
      │
      ▼
Player Repeats Entire Sequence
      │
      ▼
Correct?
   ┌───────┐
 Yes       No
  │         │
  ▼         ▼
Score     Lose Life
  │         │
  ▼         ▼
Next      Lives Left?
Level      │
            ├── Yes → Retry Level
            │
            └── No → Game Over
16. User Interface Screens
Screen 1

Welcome Screen

Components:

Logo
Game title
Instructions
Start button
Screen 2

Hand Detection

Components:

Camera preview
Detection status
Continue automatically
Screen 3

Tutorial

Components:

Gesture cards
Countdown
Skip button (optional)
Screen 4

Gameplay

Components:

Live camera
Current level
Lives
Score
New gesture display
Progress indicator
Screen 5

Level Complete

Components:

Success animation
Score earned
Next Level countdown
Screen 6

Game Over

Components:

Final score
Highest level
Longest sequence
Play Again
Home
17. Non-Functional Requirements
Performance
Webcam startup < 2 seconds
Gesture recognition < 100 ms
UI response < 50 ms
30+ FPS camera feed
Smooth gameplay with no noticeable lag
Reliability
Stable gesture detection
Handle temporary hand loss gracefully
Prevent duplicate gesture detection using cooldown logic
Usability
Large buttons
Clear instructions
High-contrast visuals
Suitable for public exhibition use
18. Technical Requirements
Computer Vision
OpenCV
Webcam access
Frame capture
Image preprocessing
Rendering overlays
MediaPipe Hands
21 hand landmarks
Finger state detection
Hand tracking
Gesture classification
Recognition Pipeline
Webcam
   │
   ▼
OpenCV Frame Capture
   │
   ▼
MediaPipe Hands
   │
   ▼
Landmark Extraction
   │
   ▼
Gesture Classification
   │
   ▼
Sequence Validation
   │
   ▼
Game Engine
   │
   ▼
Score / Lives / UI Update
19. Future Enhancements
Two-player mode
Leaderboard
Timed challenge mode
Additional gestures
Difficulty selection
Sound effects and background music
Gesture animation previews
Firebase integration for storing high scores
QR code to view leaderboard online
20. Success Metrics

The project will be considered successful if it achieves:

Gesture recognition accuracy ≥ 95%
Average recognition latency < 100 ms
Stable 30 FPS camera feed
Players can understand the game without assistance
Average gameplay session of 2–5 minutes
Smooth, responsive interaction suitable for the Nutri Delight exhibition stall