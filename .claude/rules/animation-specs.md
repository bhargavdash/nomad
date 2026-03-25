---
paths:
  - 'src/screens/**'
  - 'src/components/**'
  - 'src/utils/**'
  - 'src/hooks/**'
---

# Nomad V2 — Animation Specs

> All animation timings and easing values. Use `react-native-reanimated` v3, not RN core `Animated`.

---

## Animation Table

| Animation                | Property                                     | Duration / Easing                          |
| ------------------------ | -------------------------------------------- | ------------------------------------------ |
| Screen entrance          | opacity 0→1, translateY 16→0                 | 550ms ease, stagger 0/50/120/190/260/330ms |
| Splash slide transition  | opacity + translateX (exit -40, enter +40→0) | 450ms ease                                 |
| Orb pulse (ticker)       | scale 1→1.06→1                               | 2000ms ease-in-out infinite                |
| Orb ring (ticker)        | scale 1→1.6, opacity 0.6→0                   | 2000ms ease-in-out infinite                |
| Progress bar fill        | width 0→N%                                   | 800ms ease                                 |
| Insight text reveal      | opacity 0→1                                  | 350ms ease                                 |
| Found counter            | number increments                            | 55ms interval x 10 steps                   |
| Card entrance (postcard) | opacity 0→1, translateY 14→0                 | 550ms ease, staggered                      |
| Lock toggle              | border-color + bg-color                      | 200ms ease                                 |
| Swap (card exit)         | opacity 0, translateX -60, scale 0.95        | 300ms ease                                 |
| Remove (card exit)       | opacity 0, translateY 10                     | 300ms ease                                 |
| Input shake (error)      | translateX 0→-6→+6→-4→+4→0                   | 400ms ease                                 |
| Button active press      | scale 0.98                                   | 150ms ease                                 |
| Toast appear/dismiss     | opacity 0<->1                                | 250ms ease                                 |
| Postcard hover           | translateY -2, box-shadow increase           | 200ms ease                                 |
| Active trip card press   | scale 0.985                                  | 200ms ease                                 |

---

## Research Ticker Phases

| Phase | Trigger | Source Active              | Progress |
| ----- | ------- | -------------------------- | -------- |
| 1     | 0ms     | YouTube                    | 22%      |
| 2     | 2000ms  | Reddit                     | 44%      |
| 3     | 3800ms  | Google                     | 66%      |
| 4     | 5600ms  | Blog                       | 85%      |
| 5     | 7400ms  | Building                   | 97%      |
| Nav   | 9600ms  | Auto-navigate to Itinerary | --       |
