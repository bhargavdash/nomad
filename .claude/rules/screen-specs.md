---
paths:
  - 'src/screens/**'
  - 'src/navigation/**'
---

# Nomad V2 — Screen Specs

> Screen-specific build details: layouts, navigation, and interaction specs.
> For token values, see `design-tokens.md`. For component specs, see `component-specs.md`.

---

## Bottom Navigation

```ts
// 5 tabs layout
tabs: [
  { key: 'home',       icon: 'home',       label: 'Home',       screen: 'Home' },
  { key: 'adventures', icon: 'map',        label: 'Adventures', screen: 'Adventures' },
  { key: 'plan',       icon: '+',          label: 'Plan',       isFAB: true },   // no screen — opens modal
  { key: 'today',      icon: 'map-pin',    label: 'Today',      screen: 'InTripCompanion' },
  { key: 'profile',    icon: 'user',       label: 'Profile',    screen: 'Profile' },
]

// FAB spec
FAB: {
  size: 52,
  background: colours.ember,
  border: '3px solid colours.cream',
  marginTop: -20,           // lifts above tab bar
  shadow: shadows.fab,
}

// Tab bar spec
tabBar: {
  height: 82,               // includes 28px safe area bottom
  background: 'rgba(245,240,232,0.97)',
  backdropFilter: 'blur(16px)',
  borderTop: '1px solid colours.border',
  activeLabel: colours.ember,
  inactiveLabel: colours.muted,
  activeDot: { size: 4, color: colours.ember, bottom: -4 },
}
```

---

## Itinerary Screen Layout (most complex)

Dark background (`#111820`), postcard layout:

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

---

## Interaction Specs

### Context Menu (itinerary)

- Trigger: tap any postcard card
- Dismiss: tap backdrop overlay
- Items: Lock | Swap | Move | Remove (Remove = red text)
- Lock: toggles card border (ember) + bg (emberLight) + locked label visible
- Swap: card animates left (translateX -60, opacity 0) then resets (0.3s)
- Remove: card fades (opacity 0, translateY 10) then unmounts (0.3s)

### Onboarding Slides

- Advance: tap slide body OR tap CTA button
- Dot indicator: active = 20×6px ember pill; inactive = 6px grey circle
- Slide transition: opacity + translateX (exit -40px, enter +40px→0), 450ms

### Input Validation (sign in)

- Bad email: shake animation (translateX sequence), red border, 3px glow
- Short password: same

### Keyword Chips

- Tap: toggle active state, update count badge on CTA button immediately
- Count badge: ember bg when >0, grey when 0
