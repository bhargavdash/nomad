# Nomad — Claude Code Development Guide

## What this app is

Nomad is a mobile-first AI travel planning app for Gen Z travellers. It replaces manual research (YouTube, Reddit, travel blogs, Google) with an agentic AI that builds a personalised, day-by-day itinerary based on user-selected "vibe keywords".

## Design references

- **Figma:** https://www.figma.com/design/QYrQnWYO9ZI6yjMgLGPphC/Untitled
- **HTML spec (source of truth):** `docs/nomad_design_spec.html`
- **Prototype:** `docs/nomad_complete_prototype.html`
- **Design tokens:** `.claude/rules/design-tokens.md` (colours, typography, spacing, radius, shadows, borders)
- **Component specs:** `.claude/rules/component-specs.md` (visual specs for every component)
- **Screen specs:** `.claude/rules/screen-specs.md` (layouts, nav, interactions)
- **Animations:** `.claude/rules/animation-specs.md` (timings, easing, ticker phases)
- **Placeholder data:** `.claude/rules/placeholder-data.md` (demo trips, stops, destinations)

Priority order: HTML spec > design-tokens.md > this file.

---

## Tech stack

- **Framework:** React Native (Expo SDK 55)
- **Navigation:** React Navigation v6 (stack + bottom tabs)
- **State management:** Zustand
- **Styling:** StyleSheet (React Native) — do NOT use web CSS
- **Fonts:** expo-google-fonts — Playfair Display + DM Sans + DM Mono
- **Animations:** React Native Reanimated v3
- **Backend (placeholder):** Supabase (auth + trip storage)
- **AI layer (placeholder):** Claude API via Anthropic SDK

---

## Navigation structure

```
Stack Navigator (root)
├── Splash (onboarding — 4 slides)
├── SignIn
└── MainTabs (Bottom Tab Navigator — post-auth)
    ├── Home
    ├── Adventures
    ├── [Plan — no screen, triggers modal flow]
    ├── Today (InTripCompanion)
    └── Profile

Modal Stack (triggered from Plan tab / FAB)
├── Quiz (4 questions)
├── Destination + Keywords
├── ResearchTicker (AI loading)
└── ItineraryReveal
```

## Screen inventory

| Screen          | File path                         | Dark/Light       | Notes              |
| --------------- | --------------------------------- | ---------------- | ------------------ |
| Splash          | `src/screens/Splash.tsx`          | Dark             | 4-slide pagination |
| SignIn          | `src/screens/SignIn.tsx`          | Dark             | Google + Apple SSO |
| Home            | `src/screens/Home.tsx`            | Light cream      | Post-auth entry    |
| Adventures      | `src/screens/Adventures.tsx`      | Light cream      | Trip library       |
| Quiz            | `src/screens/Quiz.tsx`            | Light cream      | 4 questions        |
| Destination     | `src/screens/Destination.tsx`     | Light cream      | Keywords + dates   |
| ResearchTicker  | `src/screens/ResearchTicker.tsx`  | Light cream      | Animated AI loader |
| ItineraryReveal | `src/screens/ItineraryReveal.tsx` | **Dark #111820** | Postcard format    |
| InTripCompanion | `src/screens/InTripCompanion.tsx` | Light cream      | Today view         |
| Profile         | `src/screens/Profile.tsx`         | Light cream      | TBD                |

---

## Development priorities

### Phase 1 — V1 (build first)

1. Project setup (Expo + navigation + fonts + theme)
2. Splash screen (4 slides with pagination)
3. Sign in (SSO buttons + email form + validation)
4. Quiz (4 questions, single choice, progress)
5. Destination + Keywords (input + chip grid + custom keyword)
6. Research ticker (animated phases, auto-advance)
7. Itinerary reveal (postcard format — hero screen)
8. Adventures (trip library)
9. Home screen
10. Bottom nav wiring

### Phase 2 — V2 (after V1 ships)

- Real AI integration (Claude API)
- Real auth (Supabase/Google OAuth)
- Offline caching (AsyncStorage)
- In-trip companion
- Photo sourcing (replace gradient placeholders)

---

## File structure

```
nomad/
├── .claude/
│   ├── CLAUDE.md                  # ← you are here
│   ├── rules/
│   │   ├── coding-standards.md    # always loaded — universal rules
│   │   ├── design-tokens.md       # path-scoped — colours, typography, spacing, etc.
│   │   ├── component-specs.md     # path-scoped — component visual specs
│   │   ├── screen-specs.md        # path-scoped — screen layouts & interactions
│   │   ├── animation-specs.md     # path-scoped — timings & easing
│   │   └── placeholder-data.md    # path-scoped — demo data
│   └── skills/
│       ├── build-component.md     # /build-component workflow
│       ├── build-screen.md        # /build-screen workflow
│       ├── nomad-design-workflow.md
│       └── nomad-stitch-workflow.md
├── docs/
│   └── nomad_design_spec.html     # annotated design spec (source of truth)
├── src/
│   ├── theme/                     # colours, typography, spacing, radius, shadows
│   ├── components/                # Button/, Chips/, Cards/, Navigation/, Forms/, Misc/
│   ├── screens/                   # all 10 screens
│   ├── navigation/                # RootNavigator, MainTabNavigator, PlanModalNavigator
│   ├── data/                      # placeholders.ts
│   ├── store/                     # tripStore.ts, authStore.ts (Zustand)
│   ├── hooks/                     # useResearchTicker.ts
│   └── utils/                     # animations.ts (shared Reanimated presets)
├── app.json
├── package.json
└── tsconfig.json
```
