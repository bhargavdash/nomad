# Nomad

**AI-powered travel planning for Gen Z travellers.**

Nomad replaces hours of manual research across YouTube, Reddit, travel blogs, and Google with an agentic AI that builds a personalised, day-by-day itinerary based on your travel vibe.

Tell Nomad where you want to go, pick your vibes (street food, photo spots, hidden gems...), and get a curated itinerary sourced from real traveller content — in seconds.

## Features

- **Vibe-based planning** — Select keywords that match your travel style; the AI tailors every recommendation
- **Multi-source intelligence** — Aggregates insights from YouTube, Reddit, travel blogs, and Google Maps
- **Postcard itineraries** — Beautiful, card-based day-by-day plans with photos, tips, and time estimates
- **Lock & customise** — Lock stops you love, swap out ones you don't, reorder your day
- **In-trip companion** — Real-time "Today" view with your current day's plan
- **Trip library** — Save, revisit, and manage all your planned adventures

## Tech Stack

| Layer      | Technology                                               |
| ---------- | -------------------------------------------------------- |
| Framework  | React Native (Expo SDK 55)                               |
| Language   | TypeScript (strict mode)                                 |
| Navigation | React Navigation v6 (stack + bottom tabs)                |
| State      | Zustand                                                  |
| Styling    | React Native StyleSheet                                  |
| Fonts      | Playfair Display + DM Sans + DM Mono (expo-google-fonts) |
| Animations | React Native Reanimated v3                               |
| Backend    | Supabase (auth + storage)                                |
| AI         | Claude API via Anthropic SDK                             |

## Getting Started

### Prerequisites

- **Node.js** 24.x (see [.nvmrc](.nvmrc))
- **npm** 10+
- **Expo CLI** — installed globally or via `npx`
- **iOS Simulator** (macOS) or **Android Emulator** or **Expo Go** on a physical device

### Installation

```bash
# Clone the repository
git clone https://github.com/bhargavdash/nomad.git
cd nomad

# Install dependencies
npm install

# Start the development server
npm start
```

### Running on Devices

```bash
# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Web (development only)
npm run web

# Scan QR code with Expo Go
npm start
```

## Project Structure

```
nomad/
├── App.tsx                      # Root app component
├── index.ts                     # Expo entry point
├── app.json                     # Expo configuration
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # TypeScript configuration
├── eslint.config.mjs            # ESLint flat config
├── .prettierrc                  # Prettier formatting rules
├── commitlint.config.js         # Conventional commit enforcement
├── .editorconfig                # Cross-editor consistency
├── .husky/                      # Git hooks (pre-commit, commit-msg)
├── docs/
│   └── nomad_design_spec.html   # Annotated design specification
├── src/
│   ├── theme/                   # Design tokens (colours, typography, spacing, radius, shadows)
│   ├── components/              # Reusable UI components
│   │   ├── Button/              # PrimaryButton, AccentButton, GhostButton, FAB
│   │   ├── Cards/               # PostcardCard, TripCard, ActiveTripCard, etc.
│   │   ├── Chips/               # KeywordChip, VibePill, SourceBadge, FilterTab
│   │   ├── Forms/               # TextInput, DateRangePicker, CustomKeywordInput
│   │   ├── Navigation/          # BottomTabBar, DayTabBar
│   │   └── Misc/                # ContextMenu, Toast, StepDots, ProgressBar
│   ├── screens/                 # Screen components
│   │   ├── Splash.tsx           # Onboarding (4 slides)
│   │   ├── SignIn.tsx           # Authentication
│   │   ├── Home.tsx             # Post-auth home feed
│   │   ├── Adventures.tsx       # Trip library
│   │   ├── Quiz.tsx             # Travel preference quiz
│   │   ├── Destination.tsx      # Destination + keyword selection
│   │   ├── ResearchTicker.tsx   # AI research loading animation
│   │   ├── ItineraryReveal.tsx  # Postcard itinerary view
│   │   └── InTripCompanion.tsx  # Today/in-trip view
│   ├── navigation/              # React Navigation setup
│   ├── data/                    # Placeholder/mock data
│   ├── store/                   # Zustand state stores
│   ├── hooks/                   # Custom React hooks
│   └── utils/                   # Shared utilities & animation presets
└── assets/                      # App icons & splash images
```

## Available Scripts

| Command                | Description                      |
| ---------------------- | -------------------------------- |
| `npm start`            | Start Expo development server    |
| `npm run ios`          | Run on iOS Simulator             |
| `npm run android`      | Run on Android Emulator          |
| `npm run web`          | Run in web browser               |
| `npm run lint`         | Check code for lint errors       |
| `npm run lint:fix`     | Auto-fix lint errors             |
| `npm run format`       | Format all files with Prettier   |
| `npm run format:check` | Check formatting without writing |
| `npm run typecheck`    | Run TypeScript type checking     |

## Development Workflow

### Branching Strategy

- `main` — stable, deployable code
- `feat/*` — new features
- `fix/*` — bug fixes
- `chore/*` — tooling, dependencies, config

### Commit Convention

This project enforces [Conventional Commits](https://www.conventionalcommits.org/) via commitlint + Husky.

```
feat: add keyword chip component
fix: correct postcard card shadow on Android
docs: update README with new scripts
style: format destination screen
refactor: extract animation presets to utils
chore: update expo SDK
```

Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`, `build`, `revert`

### Pre-commit Hooks

Every commit automatically runs:

1. **ESLint** — catches code quality issues and auto-fixes where possible
2. **Prettier** — ensures consistent formatting

These run only on staged files via lint-staged, so commits stay fast.

### Code Quality

- **TypeScript strict mode** — no implicit any, strict null checks
- **ESLint** with Expo rules — React, React Hooks, TypeScript, and import rules
- **eslint-plugin-sonarjs** — cognitive complexity limits, duplicate detection, code smell analysis
- **Prettier** — consistent formatting (single quotes, trailing commas, 100 char width)

## Design System

Nomad uses the **Azure Horizon** design system with carefully defined tokens:

- **Colours**: Terracotta/ember accents, navy darks, warm cream backgrounds
- **Typography**: Playfair Display (headings), DM Sans (body), DM Mono (numbers)
- **Spacing**: 4px base unit scale (4, 8, 12, 16, 20, 24, 32, 48)
- **Radius**: Pill buttons (100px), cards (18-20px), inputs (13-14px)

Full design token reference: [`.claude/rules/azure-horizon-design-system.md`](.claude/rules/azure-horizon-design-system.md)
Annotated design spec: [`docs/nomad_design_spec.html`](docs/nomad_design_spec.html) (open in browser)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Write your code following the existing patterns and design tokens
4. Ensure all checks pass: `npm run lint && npm run format:check && npm run typecheck`
5. Commit with a conventional commit message (`git commit -m 'feat: add amazing feature'`)
6. Push to your branch (`git push origin feat/amazing-feature`)
7. Open a Pull Request

## License

This project is proprietary. All rights reserved.
