# Memory Moves - Design Document
## UI/UX Design Specification

**Version:** 1.0  
**Project:** Memory Moves  
**Client:** Nutri Delight  
**Platform:** Web Application (Desktop/Laptop)  
**Primary Input:** Webcam Hand Gestures  
**Design Philosophy:** Minimal • Playful • Fast • Exhibition Friendly • Brand Focused

---

# 1. Design Vision

Memory Moves is an interactive hand gesture memory game designed for the **Nutri Delight exhibition stall**. The interface should instantly attract visitors, require almost no explanation, and encourage repeat play.

The visual language should reflect Nutri Delight's identity:

- Fresh
- Healthy
- Natural
- Colorful
- Fun
- Family-friendly

The UI should feel premium yet extremely simple.

---

# 2. Design Principles

## 1. Simplicity

The player should understand every screen within **3 seconds**.

Avoid clutter.

Large buttons.

Minimal text.

---

## 2. Immediate Feedback

Every user action should receive instant feedback.

Examples

✔ Correct Gesture

❌ Wrong Gesture

❤️ Lost Life

🎉 Level Complete

---

## 3. Exhibition Friendly

People may play while standing.

Therefore

- Large UI elements
- Bold typography
- Bright colors
- High contrast
- Easily readable from 2–3 meters

---

## 4. Consistency

Every screen follows the same design language.

- Same button style
- Same spacing
- Same colors
- Same icons
- Same typography

---

# 3. Brand Identity

The interface should use Nutri Delight branding naturally without overwhelming gameplay.

Brand inspiration:

- Fruit juices
- Fresh vegetables
- Natural ingredients
- Green leaves
- Wooden textures
- Juice bottles
- Healthy lifestyle

The game should feel like it belongs to the Nutri Delight stall rather than a generic mobile game.

---

# 4. Color Palette

## Primary

Nutri Green

```
#138A36
```

Used for

- Primary buttons
- Headers
- Progress bars
- Success states

---

## Secondary

Fresh Red

```
#E63946
```

Used for

- Hearts
- Errors
- Game Over
- Alerts

---

## Accent

Juice Orange

```
#F77F00
```

Used for

- Score
- Highlights
- Rewards

---

## Background

Cream White

```
#FFFDF7
```

---

## Surface

Pure White

```
#FFFFFF
```

---

## Text

Dark Charcoal

```
#1F2937
```

---

## Success

```
#22C55E
```

---

## Warning

```
#FACC15
```

---

# 5. Typography

Font Family

## Poppins

Reason

- Modern
- Friendly
- Excellent readability
- Professional

---

Heading

32px

Bold

---

Subheading

22px

SemiBold

---

Body

16px

Regular

---

Button Text

18px

SemiBold

---

Score

28px

Bold

---

# 6. Layout Guidelines

Desktop-first responsive design.

Maximum content width

```
1440px
```

Game Area

Centered

Camera Feed

16:9

Side Panel

Optional

Top Navigation

Fixed

Bottom

Reserved for branding

---

Spacing

Small

8px

Medium

16px

Large

24px

Extra Large

40px

---

Corner Radius

Cards

20px

Buttons

18px

Camera Frame

24px

---

Shadow

Soft

Blur

20px

Opacity

10%

---

# 7. Iconography

Style

Rounded

Outlined

Friendly

Use consistent icon family.

Recommended

Lucide React

Icons

🏠 Home

🎮 Play

❤️ Lives

🏆 Trophy

⭐ Score

📷 Camera

✋ Hand

⏳ Timer

🎉 Success

❌ Error

---

# 8. Screen Designs

---

# Screen 1

## Welcome Screen

Purpose

Introduce the game immediately.

Layout

```
------------------------------------------------

Nutri Delight Logo

Memory Moves

Tagline

Healthy themed illustration

Short Instructions

START GAME

HOW TO PLAY

------------------------------------------------
```

Background

- Soft fruit illustration
- Leaf decorations
- Juice bottles along the bottom
- White background with green accents

Primary CTA

Green button

Secondary CTA

Outlined button

---

# Screen 2

## Hand Detection

Layout

```
-------------------------------------

Header

Camera Feed

Green Detection Box

Status

Place your hand

Loading Animation

-------------------------------------
```

When no hand detected

Gray border

When detected

Green border

Animated pulse

Status

✔ Hand Detected

Automatically continue

---

# Screen 3

## Tutorial

Cards displayed vertically.

Each card

Gesture icon

↓

Gesture name

↓

Simple description

Example

✋

Open Palm

Show your open hand.

---

Bottom Button

LET'S BEGIN

---

# Screen 4

## Gameplay Screen

Main Layout

```
-----------------------------------------

Top Bar

Level

Score

Lives

-----------------------------------------

New Gesture Area

Large gesture illustration

Countdown

-----------------------------------------

Camera Feed

Live webcam

Gesture overlay

-----------------------------------------

Bottom

Sequence Progress

-----------------------------------------
```

The player's attention should naturally move:

Top

↓

Gesture

↓

Camera

↓

Progress

---

# Camera Section

Live webcam

Rounded corners

Thin green border

MediaPipe landmarks visible

Recognition animation

Green flash when correct

Red flash when wrong

---

# Gesture Display

Large

Centered

Animated

Scale

Fade

Bounce

Only the newest gesture appears.

---

# Score Area

Top right

Large

Animated increment

Example

120

↓

130

---

# Lives

Top left

❤️ ❤️ ❤️

Lose life animation

Heart shrinks

Fades

Turns gray

---

# Progress Indicator

Example

```
●────●────●────○────○
```

Current level highlighted.

---

# Screen 5

## Correct Gesture

Overlay

✔ Correct

Green glow

Small particle animation

Automatically continue

---

# Screen 6

## Wrong Gesture

Overlay

❌ Wrong Gesture

Red border

Camera shakes slightly

Lose one heart

Retry message

---

# Screen 7

## Level Complete

Center card

```
Amazing!

Level Complete

+10 Points

Bonus

Next Level

```

Confetti animation

Progress updates

---

# Screen 8

## Game Over

Large illustration

Broken heart

Display

Final Score

Highest Level

Longest Sequence

Accuracy

Buttons

PLAY AGAIN

HOME

---

# 9. Animations

Animations should be subtle and smooth.

Do not overuse.

Recommended duration

```
250–350ms
```

---

Button Hover

Scale

1.03

---

Button Click

Scale

0.96

---

Correct Gesture

Green glow

Checkmark animation

---

Wrong Gesture

Shake

Small vibration effect

---

Level Complete

Confetti

Fade-in

---

Game Over

Fade

Broken heart animation

---

Gesture Appearance

Scale

Fade

Bounce

---

Heart Lost

Shrink

Fade

Gray transition

---

# 10. Sound Design (Optional)

Correct

Soft pop

---

Wrong

Short buzzer

---

Level Complete

Celebration

---

Game Over

Gentle ending sound

---

Button Click

Soft tap

---

# 11. Accessibility

Minimum text size

16px

High contrast

Keyboard navigation for menus

Color should never be the only indicator

Icons + text together

---

# 12. Responsive Behavior

Desktop (Primary)

1920px

1600px

1440px

1366px

Laptop

1280px

Tablet

Optional support

Mobile

Not required in Version 1

---

# 13. Empty States

Camera unavailable

Show illustration

"Camera access is required to play."

Retry Button

---

No Hand Detected

Animated hand outline

"Place your hand inside the frame."

---

Loading

Circular spinner

Green

---

# 14. Microinteractions

- Buttons slightly scale on hover
- Hearts animate when lost
- Score counts upward instead of changing instantly
- Gesture icons gently bounce when displayed
- Camera border glows when a gesture is recognized
- Confetti appears after every completed level
- Progress bar smoothly advances between levels

---

# 15. Visual Assets

Required assets

- Nutri Delight Logo
- Juice bottle illustrations
- Fruit and vegetable graphics
- Leaf decorations
- Hand gesture illustrations
- Trophy icon
- Heart icons
- Camera icons
- Success and error icons

---

# 16. Overall User Experience

The player journey should feel effortless:

**Welcome → Hand Detection → Learn → Play → Succeed → Challenge → Repeat**

Every screen should reinforce three ideas:

- **Fresh** (Nutri Delight branding)
- **Fun** (interactive gameplay)
- **Fast** (instant feedback with minimal latency)

The final design should create a memorable exhibition experience where visitors are encouraged to replay the game, compete with friends, and associate the enjoyable interaction with the Nutri Delight brand.