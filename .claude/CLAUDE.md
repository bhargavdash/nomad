# Nomad — Claude Code Development Guide

## What this app is
Nomad is a mobile-first AI travel planning app for Gen Z travellers. It replaces manual research (YouTube, Reddit, travel blogs, Google) with an agentic AI that builds a personalised, day-by-day itinerary based on user-selected "vibe keywords".

## Figma design file
**Primary design reference:** https://www.figma.com/design/QYrQnWYO9ZI6yjMgLGPphC/Untitled
**Design spec document:** `/docs/nomad_design_spec.html` (open in browser for full annotated spec)
**Prototype reference:** `/docs/nomad_complete_prototype.html` (live clickable prototype)

**Design system rules:** `.claude/rules/azure-horizon-design-system.md` (complete V2 token reference)
**Skills:** `.claude/skills/build-component.md`, `build-screen.md`, `nomad-stitch-workflow.md`

When implementing any screen or component, always check the design system rules file first.
When in doubt about spacing, colour, or typography — the HTML spec document is the source of truth.
Priority order: HTML spec > design system rules > this CLAUDE.md file.

---

## Tech stack
- **Framework:** React Native (Expo) — build for iOS and Android simultaneously
- **Navigation:** React Navigation v6 (stack + bottom tabs)
- **State management:** Zustand
- **Styling:** StyleSheet (React Native) — do NOT use web CSS
- **Fonts:** expo-google-fonts — Playfair Display + DM Sans + DM Mono
- **Animations:** React Native Reanimated v3
- **Backend (placeholder):** Supabase (auth + trip storage)
- **AI layer (placeholder):** Claude API via Anthropic SDK

---

## Design system — tokens

### Colours (use these exact values, no approximations)
```ts
// src/theme/colours.ts
export const colours = {
  // Terracotta accent
  ember:        '#C4623A',
  emberDim:     '#A84E2A',
  emberLight:   '#F5E8E0',

  // Warm peach secondary
  peach:        '#E8A87C',
  peachLight:   '#FDF0E8',

  // Deep navy — primary dark
  navy:         '#1B2B4B',
  navy2:        '#162340',
  navy3:        '#111820',   // itinerary dark bg (was #0F1A30 in earlier draft — HTML spec corrects to #111820)
  cardDark:     '#1C2634',

  // Warm cream backgrounds
  cream:        '#F5F0E8',
  cream2:       '#E8E0D0',
  warmWhite:    '#FDFAF5',

  // Text
  ink:          '#2A2520',
  muted:        '#8A8070',

  // Borders
  border:       '#DDD8CC',

  // Functional
  sage:         '#2A7A56',
  sageLight:    '#E0F0E8',
  sky:          '#2E6FAA',
  skyLight:     '#E0EEF8',

  // Source badge colours
  youtube:      '#E8593C',
  reddit:       '#FF4500',
  blog:         '#2A7A56',
  maps:         '#2E6FAA',

  // Transparent overlays
  darkOverlay8:  'rgba(255,255,255,0.08)',
  darkOverlay13: 'rgba(255,255,255,0.13)',
  darkOverlay22: 'rgba(255,255,255,0.22)',
}
```

### Typography
```ts
// src/theme/typography.ts
// Display / headings: Playfair Display
// Body / UI: DM Sans
// Numbers / mono: DM Mono

export const typography = {
  displayXL:  { fontFamily: 'PlayfairDisplay_800ExtraBold', fontSize: 30, lineHeight: 34 },
  displayL:   { fontFamily: 'PlayfairDisplay_800ExtraBold', fontSize: 26, lineHeight: 30 },
  displayM:   { fontFamily: 'PlayfairDisplay_700Bold',      fontSize: 22, lineHeight: 26 },
  displayS:   { fontFamily: 'PlayfairDisplay_700Bold',      fontSize: 18, lineHeight: 22 },
  cardTitle:  { fontFamily: 'PlayfairDisplay_700Bold',      fontSize: 17, lineHeight: 22 },
  cardTitleS: { fontFamily: 'PlayfairDisplay_700Bold',      fontSize: 14, lineHeight: 18 },

  bodyL:      { fontFamily: 'DMSans_400Regular',   fontSize: 15, lineHeight: 24 },
  bodyM:      { fontFamily: 'DMSans_400Regular',   fontSize: 14, lineHeight: 22 },
  bodyS:      { fontFamily: 'DMSans_400Regular',   fontSize: 13, lineHeight: 20 },
  bodyXS:     { fontFamily: 'DMSans_400Regular',   fontSize: 12, lineHeight: 18 },

  labelM:     { fontFamily: 'DMSans_500Medium',    fontSize: 13, lineHeight: 18 },
  labelS:     { fontFamily: 'DMSans_500Medium',    fontSize: 12, lineHeight: 16 },
  labelXS:    { fontFamily: 'DMSans_500Medium',    fontSize: 10, lineHeight: 14, letterSpacing: 0.8, textTransform: 'uppercase' },

  monoM:      { fontFamily: 'DMSans_400Regular',   fontSize: 13, lineHeight: 18 },
  monoS:      { fontFamily: 'DMSans_400Regular',   fontSize: 11, lineHeight: 16 },
  monoXS:     { fontFamily: 'DMSans_400Regular',   fontSize: 10, lineHeight: 14 },
}
// Note: Replace DMSans with DMMono for monoM/monoS/monoXS once DM Mono is loaded
```

### Spacing
```ts
// src/theme/spacing.ts
export const spacing = {
  xs:   4,
  sm:   8,
  md:   12,
  lg:   16,
  xl:   20,
  xxl:  24,
  xxxl: 32,
  huge: 48,
}
// Screen horizontal padding: 20px (ALL V2 screens) — V1 used 24px
// Card gap: 8–12px
// Section gap: 18–24px
```

### Border radius
```ts
// src/theme/radius.ts
export const radius = {
  pill:     100,   // buttons, chips, badges
  cardL:    20,    // trip cards, active trip card
  cardM:    18,    // postcard, adventure trip card
  cardS:    16,    // V1 place cards, new trip button
  input:    14,    // text inputs
  inputS:   12,    // date picker fields
  badge:    100,   // source badges, filter tabs
  icon:     10,    // icon boxes in components
  fab:      100,   // FAB button (circle)
}
```

### Shadows
```ts
// src/theme/shadows.ts
// React Native shadow syntax
export const shadows = {
  card: {
    shadowColor: '#1B2B4B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  cardHover: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 6,
  },
  postcard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 8,
  },
  fab: {
    shadowColor: '#1C1917',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
}
```

---

## Screen inventory & navigation

### Navigation structure
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

### All screens
| Screen | File path | Dark/Light | Notes |
|---|---|---|---|
| Splash | `src/screens/Splash.tsx` | Dark | 4-slide pagination |
| SignIn | `src/screens/SignIn.tsx` | Dark | Google + Apple SSO |
| Home | `src/screens/Home.tsx` | Light cream | Post-auth entry |
| Adventures | `src/screens/Adventures.tsx` | Light cream | Trip library |
| Quiz | `src/screens/Quiz.tsx` | Light cream | 4 questions |
| Destination | `src/screens/Destination.tsx` | Light cream | Keywords + dates |
| ResearchTicker | `src/screens/ResearchTicker.tsx` | Light cream | Animated AI loader |
| ItineraryReveal | `src/screens/ItineraryReveal.tsx` | **Dark #111820** | Postcard format |
| InTripCompanion | `src/screens/InTripCompanion.tsx` | Light cream | Today view |
| Profile | `src/screens/Profile.tsx` | Light cream | TBD |

---

## Component library

Build these as reusable components in `src/components/`:

### Buttons
```
Button/             
├── PrimaryButton.tsx      # navy bg, pill, full-width
├── AccentButton.tsx       # ember/terracotta bg, pill  
├── GhostButton.tsx        # transparent, border, pill
└── FABButton.tsx          # 52×52 circle, ember, lifts above nav
```

### Chips & Pills
```
Chips/
├── KeywordChip.tsx        # toggleable, active=navy bg
├── VibePill.tsx           # itinerary matched/unmatched states
├── SourceBadge.tsx        # YT/Reddit/Blog/Maps coloured pill
└── FilterTab.tsx          # Adventures filter: ember active
```

### Cards
```
Cards/
├── PostcardCard.tsx       # V2 itinerary: tall photo + serif title
├── PlaceCard.tsx          # V1 itinerary: flat list card  
├── TripCard.tsx           # Adventures: navy header + stats
├── ActiveTripCard.tsx     # Home: navy + glow + inner CTA
├── DestinationCard.tsx    # Home trending: photo + overlay
└── InsightCard.tsx        # Home feed: icon + title + body
```

### Navigation
```
Navigation/
├── BottomTabBar.tsx       # 5 tabs + FAB bubble
└── DayTabBar.tsx          # itinerary day selector, underline style
```

### Forms
```
Forms/
├── TextInput.tsx          # destination input, email input
├── DateRangePicker.tsx    # from/to date fields + duration pill
└── CustomKeywordInput.tsx # dashed border + + button
```

### Misc
```
Misc/
├── ContextMenu.tsx        # lock/swap/move/remove overlay
├── Toast.tsx              # global notification, 2.3s auto-dismiss
├── StepDots.tsx           # quiz/onboarding progress dots
├── ProgressBar.tsx        # research ticker progress
├── SourceRow.tsx          # research ticker: logo + status pill
└── PostcardRow.tsx        # time-label + postcard card combined
```

---

## Bottom navigation spec

```tsx
// 5 tabs layout
tabs: [
  { key: 'home',       icon: '🏠', label: 'Home',       screen: 'Home' },
  { key: 'adventures', icon: '🗺', label: 'Adventures', screen: 'Adventures' },
  { key: 'plan',       icon: '+',  label: 'Plan',       isFAB: true },   // no screen — opens modal
  { key: 'today',      icon: '📍', label: 'Today',      screen: 'InTripCompanion' },
  { key: 'profile',    icon: '👤', label: 'Profile',    screen: 'Profile' },
]

// FAB spec
FAB: {
  size: 52,
  background: colours.ember,
  border: `3px solid ${colours.cream}`,
  marginTop: -20,           // lifts above tab bar
  shadow: shadows.fab,
}

// Tab bar spec
tabBar: {
  height: 82,               // includes 28px safe area bottom
  background: 'rgba(245,240,232,0.97)',
  backdropFilter: 'blur(16px)',
  borderTop: `1px solid ${colours.border}`,
  activeLabel: colours.ember,
  inactiveLabel: colours.muted,
  activeDot: {              // small indicator dot
    size: 4,
    color: colours.ember,
    position: 'absolute',
    bottom: -4,
  }
}
```

---

## Key screen specs

### Itinerary screen (most complex)
The itinerary screen uses a dark background (#111820) and a postcard layout:

```
ItineraryReveal layout:
├── HeroBanner (220px tall)
│   ├── Photo background (gradient placeholder until real photos)
│   ├── Dark overlay (gradient bottom→top)
│   ├── StatusBar (dark icons)
│   ├── BackButton + ShareButton (top row)
│   └── TripTitle + AIBadge (bottom of banner)
├── VibesRow (horizontal scroll, dark bg)
├── DayTabBar (underline style, dark bg)
└── ScrollView (padded 0 16px 180px)
    ├── DayHeader (title + regen button)
    └── FlatList of PostcardRow:
        PostcardRow = [TimeLabel] + [PostcardCard]
        PostcardCard:
        ├── PhotoArea (180px, gradient bg + emoji placeholder)
        │   ├── PhotoOverlay (gradient)
        │   ├── SourceBadge (top-right, absolute)
        │   └── LockButton (top-left, absolute, 30×30)
        └── CardBody (14px 16px padding)
            ├── PlaceName (Playfair 700 17px white)
            ├── Description (DM Sans 13px rgba(255,255,255,.55))
            └── Footer row: [TagsRow] + [Duration]
```

### Research ticker animation sequence
```
Phase 1 (0ms):    YouTube active → progress 22%
Phase 2 (2000ms): YouTube done → Reddit active → progress 44%
Phase 3 (3800ms): Reddit done → Google active → progress 66%
Phase 4 (5600ms): Google done → Blog active → progress 85%
Phase 5 (7400ms): Blog done → Building → progress 97%
Auto-navigate (9600ms): → ItineraryReveal
```

---

## Interaction specs (implement these exactly)

### Context menu (itinerary)
- Trigger: tap any postcard card
- Dismiss: tap backdrop overlay
- Items: Lock | Swap | Move | Remove (Remove = red text)
- Lock: toggles card border (ember) + bg (emberLight) + locked label visible
- Swap: card animates left (translateX -60, opacity 0) then resets (0.3s)
- Remove: card fades (opacity 0, translateY 10) then unmounts (0.3s)

### Onboarding slides
- Advance: tap slide body OR tap CTA button
- Dot indicator: active = 20×6px ember pill; inactive = 6px grey circle
- Slide transition: opacity + translateX (exit -40px, enter +40px→0), 450ms

### Input validation (sign in)
- Bad email: shake animation (translateX sequence), red border, 3px glow
- Short password: same

### Keyword chips
- Tap: toggle active state, update count badge on CTA button immediately
- Count badge: ember bg when >0, grey when 0

---

## Placeholder data (for development)

```ts
// src/data/placeholders.ts
export const DEMO_TRIP = {
  destination: 'Rajasthan, India',
  dates: { from: 'Mar 28', to: 'Apr 4' },
  duration: 7,
  vibes: ['Photo spots', 'Local food', 'Handicrafts', 'Slow travel'],
  stats: { places: 38, tips: 34, photoStops: 17 },
  days: ['Jaipur', 'Jaipur', 'Jodhpur', 'Jodhpur → Jaisalmer', 'Jaisalmer', 'Jaisalmer', 'Jaipur'],
}

export const DEMO_STOPS_DAY1 = [
  { id: 'pc1', time: '7:00', ampm: 'AM', duration: '2 hrs', name: 'Amber Fort — sunrise', desc: 'Empty fort, golden light. Go before 9 AM to beat crowds.', source: 'youtube', tags: ['📸 Photo stop', '🏛️ Heritage', 'Trending'], locked: true },
  { id: 'pc2', time: '9:30', ampm: 'AM', duration: '45 min', name: 'Lassiwala — Old City',    desc: 'Legendary lassi stall. Open from 8 AM, queue fast.',    source: 'reddit',  tags: ['🍜 Street food', "Locals' choice"], locked: false },
  { id: 'pc3', time: '11:00', ampm: 'AM', duration: '1.5 hrs', name: 'Johari Bazaar walk',    desc: 'Main handicrafts street. Back alleys have better prices.', source: 'blog', tags: ['🧵 Handicrafts', 'Shopping'],   locked: false },
  { id: 'pc4', time: '1:30', ampm: 'PM', duration: '1 hr',  name: 'Hawa Mahal exterior',      desc: 'Best shot from the café across the street. Avoid noon heat.', source: 'youtube', tags: ['📸 Photo stop', 'Trending'], locked: false },
  { id: 'pc5', time: '3:30', ampm: 'PM', duration: '1 hr',  name: 'City Palace museum',       desc: 'Avoid weekends. Audio guide worth it, get the good one.', source: 'maps', tags: ['🏛️ Heritage', 'Museum'], locked: false },
]

export const TRENDING_DESTINATIONS = [
  { id: 't1', name: 'Tokyo',    country: 'Japan',       duration: '5–10 days', signal: '🔥 Trending this week', emoji: '🗼', bg: ['#1a1a2e', '#16213e'] },
  { id: 't2', name: 'Bali',     country: 'Indonesia',   duration: '7–14 days', signal: '🔥 4.2k trips planned', emoji: '🌴', bg: ['#134e5e', '#71b280'] },
  { id: 't3', name: 'Morocco',  country: 'Africa',      duration: '8–12 days', signal: '⬆ Up 34% this month',  emoji: '🕌', bg: ['#c94b4b', '#4b134f'] },
  { id: 't4', name: 'Kyoto',    country: 'Japan',       duration: '4–7 days',  signal: '🌸 Cherry blossom',    emoji: '⛩️', bg: ['#2c3e50', '#4ca1af'] },
  { id: 't5', name: 'Colombia', country: 'South America', duration: '10–14 days', signal: '✦ Hidden gem pick', emoji: '☕', bg: ['#1c6758', '#d4c483'] },
]

export const SOURCE_BADGE_COLOURS = {
  youtube: { bg: '#E8593C', text: '#fff', label: '▶ YouTube' },
  reddit:  { bg: '#FF4500', text: '#fff', label: 'R Reddit' },
  blog:    { bg: '#2A7A56', text: '#fff', label: '✍ Blog' },
  maps:    { bg: '#2E6FAA', text: '#fff', label: '📍 Maps' },
}
```

---

## Development priorities

### Phase 1 — V1 (build this first, ship to devs)
1. Project setup (Expo + navigation + fonts + theme)
2. Splash screen (4 slides with pagination)
3. Sign in (SSO buttons + email form + validation)
4. Quiz (4 questions, single choice, progress)
5. Destination + Keywords (input + chip grid + custom keyword)
6. Research ticker (animated phases, auto-advance)
7. Itinerary reveal (postcard format — this is the hero screen)
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
├── CLAUDE.md                    # ← you are here
├── docs/
│   ├── nomad_design_spec.html   # full annotated spec
├── src/
│   ├── theme/
│   │   ├── colours.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   ├── radius.ts
│   │   └── shadows.ts
│   ├── components/
│   │   ├── Button/
│   │   ├── Chips/
│   │   ├── Cards/
│   │   ├── Navigation/
│   │   ├── Forms/
│   │   └── Misc/
│   ├── screens/
│   │   ├── Splash.tsx
│   │   ├── SignIn.tsx
│   │   ├── Home.tsx
│   │   ├── Adventures.tsx
│   │   ├── Quiz.tsx
│   │   ├── Destination.tsx
│   │   ├── ResearchTicker.tsx
│   │   ├── ItineraryReveal.tsx
│   │   └── InTripCompanion.tsx
│   ├── navigation/
│   │   ├── RootNavigator.tsx
│   │   ├── MainTabNavigator.tsx
│   │   └── PlanModalNavigator.tsx
│   ├── data/
│   │   └── placeholders.ts
│   ├── store/
│   │   ├── tripStore.ts         # Zustand: active trip, stops, vibes
│   │   └── authStore.ts         # Zustand: user session
│   ├── hooks/
│   │   └── useResearchTicker.ts # animation sequence logic
│   └── utils/
│       └── animations.ts        # shared Reanimated presets
├── app.json
├── package.json
└── tsconfig.json
```

---

## Claude Code prompting tips

When asking Claude Code to build a screen, always reference:
1. The screen name as it appears in this file
2. The Figma file URL with node-id if you've added screens there
3. The relevant component list for that screen
4. The specific token values (don't let Claude Code guess colours)

Example prompt pattern:
> "Build the `ItineraryReveal` screen per CLAUDE.md. Use `PostcardCard` component, `DayTabBar`, and `colours.navy3` (#111820) as the background. Reference the postcard layout in the itinerary spec section."