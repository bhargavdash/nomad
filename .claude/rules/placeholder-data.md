---
paths:
  - 'src/data/**'
  - 'src/screens/**'
---

# Nomad V2 — Placeholder Data

> Demo data for development. Place in `src/data/placeholders.ts`.

```ts
export const DEMO_TRIP = {
  destination: 'Rajasthan, India',
  dates: { from: 'Mar 28', to: 'Apr 4' },
  duration: 7,
  vibes: ['Photo spots', 'Local food', 'Handicrafts', 'Slow travel'],
  stats: { places: 38, tips: 34, photoStops: 17 },
  days: ['Jaipur', 'Jaipur', 'Jodhpur', 'Jodhpur → Jaisalmer', 'Jaisalmer', 'Jaisalmer', 'Jaipur'],
};

export const DEMO_STOPS_DAY1 = [
  {
    id: 'pc1',
    time: '7:00',
    ampm: 'AM',
    duration: '2 hrs',
    name: 'Amber Fort — sunrise',
    desc: 'Empty fort, golden light. Go before 9 AM to beat crowds.',
    source: 'youtube',
    tags: ['📸 Photo stop', '🏛️ Heritage', 'Trending'],
    locked: true,
  },
  {
    id: 'pc2',
    time: '9:30',
    ampm: 'AM',
    duration: '45 min',
    name: 'Lassiwala — Old City',
    desc: 'Legendary lassi stall. Open from 8 AM, queue fast.',
    source: 'reddit',
    tags: ['🍜 Street food', "Locals' choice"],
    locked: false,
  },
  {
    id: 'pc3',
    time: '11:00',
    ampm: 'AM',
    duration: '1.5 hrs',
    name: 'Johari Bazaar walk',
    desc: 'Main handicrafts street. Back alleys have better prices.',
    source: 'blog',
    tags: ['🧵 Handicrafts', 'Shopping'],
    locked: false,
  },
  {
    id: 'pc4',
    time: '1:30',
    ampm: 'PM',
    duration: '1 hr',
    name: 'Hawa Mahal exterior',
    desc: 'Best shot from the cafe across the street. Avoid noon heat.',
    source: 'youtube',
    tags: ['📸 Photo stop', 'Trending'],
    locked: false,
  },
  {
    id: 'pc5',
    time: '3:30',
    ampm: 'PM',
    duration: '1 hr',
    name: 'City Palace museum',
    desc: 'Avoid weekends. Audio guide worth it, get the good one.',
    source: 'maps',
    tags: ['🏛️ Heritage', 'Museum'],
    locked: false,
  },
];

export const TRENDING_DESTINATIONS = [
  {
    id: 't1',
    name: 'Tokyo',
    country: 'Japan',
    duration: '5–10 days',
    signal: '🔥 Trending this week',
    emoji: '🗼',
    bg: ['#1a1a2e', '#16213e'],
  },
  {
    id: 't2',
    name: 'Bali',
    country: 'Indonesia',
    duration: '7–14 days',
    signal: '🔥 4.2k trips planned',
    emoji: '🌴',
    bg: ['#134e5e', '#71b280'],
  },
  {
    id: 't3',
    name: 'Morocco',
    country: 'Africa',
    duration: '8–12 days',
    signal: '⬆ Up 34% this month',
    emoji: '🕌',
    bg: ['#c94b4b', '#4b134f'],
  },
  {
    id: 't4',
    name: 'Kyoto',
    country: 'Japan',
    duration: '4–7 days',
    signal: '🌸 Cherry blossom',
    emoji: '⛩️',
    bg: ['#2c3e50', '#4ca1af'],
  },
  {
    id: 't5',
    name: 'Colombia',
    country: 'South America',
    duration: '10–14 days',
    signal: '✦ Hidden gem pick',
    emoji: '☕',
    bg: ['#1c6758', '#d4c483'],
  },
];

export const SOURCE_BADGE_COLOURS = {
  youtube: { bg: '#E8593C', text: '#fff', label: '▶ YouTube' },
  reddit: { bg: '#FF4500', text: '#fff', label: 'R Reddit' },
  blog: { bg: '#2A7A56', text: '#fff', label: '✍ Blog' },
  maps: { bg: '#2E6FAA', text: '#fff', label: '📍 Maps' },
};
```
