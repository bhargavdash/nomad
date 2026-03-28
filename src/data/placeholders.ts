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
    source: 'youtube' as const,
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
    source: 'reddit' as const,
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
    source: 'blog' as const,
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
    source: 'youtube' as const,
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
    source: 'maps' as const,
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
    bg: ['#1a1a2e', '#16213e'] as const,
  },
  {
    id: 't2',
    name: 'Bali',
    country: 'Indonesia',
    duration: '7–14 days',
    signal: '🔥 4.2k trips planned',
    emoji: '🌴',
    bg: ['#134e5e', '#71b280'] as const,
  },
  {
    id: 't3',
    name: 'Morocco',
    country: 'Africa',
    duration: '8–12 days',
    signal: '⬆ Up 34% this month',
    emoji: '🕌',
    bg: ['#c94b4b', '#4b134f'] as const,
  },
  {
    id: 't4',
    name: 'Kyoto',
    country: 'Japan',
    duration: '4–7 days',
    signal: '🌸 Cherry blossom',
    emoji: '⛩️',
    bg: ['#2c3e50', '#4ca1af'] as const,
  },
  {
    id: 't5',
    name: 'Colombia',
    country: 'South America',
    duration: '10–14 days',
    signal: '✦ Hidden gem pick',
    emoji: '☕',
    bg: ['#1c6758', '#d4c483'] as const,
  },
];

export const SOURCE_BADGE_COLORS = {
  youtube: { bg: '#E8593C', text: '#fff', label: '▶ YouTube' },
  reddit: { bg: '#FF4500', text: '#fff', label: 'R Reddit' },
  blog: { bg: '#2A7A56', text: '#fff', label: '✍ Blog' },
  maps: { bg: '#2E6FAA', text: '#fff', label: '📍 Maps' },
} as const;

// --- Plan Your Trip data ---

export const VIBE_CATEGORIES = [
  {
    label: 'Food + Drink',
    vibes: ['Local cuisines', 'Street food', 'Chai stops', 'Fine dining'],
  },
  {
    label: 'Explore',
    vibes: ['Photo spots', 'Heritage walks', 'Handicrafts', 'Hidden gems', 'Sunrise spots'],
  },
  {
    label: 'Shopping',
    vibes: ['Local Markets', 'Luxury Boutiques', 'Artisan Crafts', 'Souvenirs'],
  },
];

export const ACCOMMODATION_OPTIONS = [
  { icon: '🏡', label: 'Boutique Villa', desc: 'Private, curated, intimate' },
  { icon: '🏨', label: 'Luxury Hotel', desc: 'Full-service, high-end amenities' },
  { icon: '🌿', label: 'Eco Lodge', desc: 'Sustainable, close to nature' },
  { icon: '🏠', label: 'Homestay', desc: 'Authentic, local living experiences' },
  { icon: '🛋', label: 'Airbnb', desc: 'Unique stays in local neighborhoods' },
  { icon: '🛏', label: 'Hostel', desc: 'Social, budget-friendly for solo travelers' },
  { icon: '✨', label: 'Custom Stay', desc: 'Request specific lodging' },
];

export const PACE_OPTIONS = ['Slow & Soulful', 'Balanced', 'Action-Packed'] as const;

export const BUDGET_TIERS = ['$', '$$', '$$$', '$$$$'] as const;

export const TRAVELER_OPTIONS = [
  { value: '1' as const, label: '1 Person' },
  { value: '2' as const, label: '2 People' },
  { value: '3+' as const, label: '3+ People' },
  { value: 'large' as const, label: 'Large Group' },
];

// --- Research Ticker data ---

export type ResearchPhase = {
  id: number;
  trigger: number;
  source: string;
  progress: number;
  message: string;
  stats: { places: number; tips: number; photoStops: number };
};

export const RESEARCH_TICKER_PHASES: ResearchPhase[] = [
  {
    id: 1,
    trigger: 0,
    source: 'youtube',
    progress: 22,
    message: 'SCANNING YOUTUBE VLOGS...',
    stats: { places: 4, tips: 6, photoStops: 2 },
  },
  {
    id: 2,
    trigger: 2000,
    source: 'reddit',
    progress: 44,
    message: 'READING REDDIT THREADS...',
    stats: { places: 12, tips: 14, photoStops: 5 },
  },
  {
    id: 3,
    trigger: 3800,
    source: 'google',
    progress: 66,
    message: 'PARSING GOOGLE RESULTS...',
    stats: { places: 22, tips: 22, photoStops: 10 },
  },
  {
    id: 4,
    trigger: 5600,
    source: 'blog',
    progress: 85,
    message: 'ANALYZING TRAVEL BLOGS...',
    stats: { places: 30, tips: 28, photoStops: 14 },
  },
  {
    id: 5,
    trigger: 7400,
    source: 'building',
    progress: 97,
    message: 'BUILDING YOUR ITINERARY...',
    stats: { places: 38, tips: 34, photoStops: 17 },
  },
];

export type ResearchDiscovery = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  source: 'youtube' | 'reddit' | 'blog' | 'maps';
};

export const RESEARCH_DISCOVERIES: ResearchDiscovery[] = [
  {
    id: 'rd1',
    title: 'Found a hidden chai stall inside Jaisalmer Fort walls.',
    body: 'Multiple Reddit threads mention "Mama\'s Chai" has the best view of the sunset without the tourist crowds. Adding to your "Golden Hour" plan.',
    tags: ['#LocalFind', '#CuratedSpot'],
    source: 'reddit',
  },
  {
    id: 'rd2',
    title: 'Skip Nahargarh at noon — sunset is 10x better.',
    body: 'A vlogger with 2M subs says the light at 5 PM turns the walls gold. We moved it to your evening slot.',
    tags: ['#ProTip', '#GoldenHour'],
    source: 'youtube',
  },
  {
    id: 'rd3',
    title: '6 rooftop cafes with Mehrangarh Fort views mapped.',
    body: 'A travel blog ranked every rooftop in Jodhpur by vibe, Wi-Fi, and filter coffee quality. Top 3 added to your list.',
    tags: ['#CafeHop', '#FortViews'],
    source: 'blog',
  },
  {
    id: 'rd4',
    title: 'Secret textile market behind Johari Bazaar unlocked.',
    body: 'Google reviews reveal a back-alley block printing workshop that lets you make your own scarves. Locals only — no signage.',
    tags: ['#Handicrafts', '#HiddenGem'],
    source: 'maps',
  },
  {
    id: 'rd5',
    title: 'Assembling your perfect 7-day desert route.',
    body: 'Cross-referencing 142 sources to lock in timing, travel distances, and rest days. Almost there...',
    tags: ['#Itinerary', '#AlmostReady'],
    source: 'blog',
  },
];

export const RESEARCH_SOURCES = [
  { key: 'youtube' as const, label: 'YouTube vlogs', color: '#E8593C' },
  { key: 'reddit' as const, label: 'Reddit: r/travel', color: '#FF4500' },
  { key: 'google' as const, label: 'Google Search', color: '#2E6FAA' },
  { key: 'blog' as const, label: 'Travel blogs', color: '#2A7A56' },
];

// --- Itinerary Reveal data ---

export const ITINERARY_DAYS = [
  {
    day: 1,
    city: 'Jaipur',
    title: 'Jaipur — The Pink City',
    desc: 'Amber Fort at sunrise, Hawa Mahal, Johari Bazaar for handicrafts.',
    highlights: ['Amber Fort', 'Hawa Mahal', 'Johari Bazaar'],
    stops: 5,
  },
  {
    day: 2,
    city: 'Jaipur',
    title: 'Jaipur — Hidden Gems',
    desc: 'Nahargarh Fort sunset, Bapu Bazaar, rooftop dinner with city views.',
    highlights: ['Nahargarh Fort', 'Bapu Bazaar'],
    stops: 4,
  },
  {
    day: 3,
    city: 'Jodhpur',
    title: 'Jodhpur — The Blue City',
    desc: 'Mehrangarh Fort, spice markets, blue-washed old town lanes.',
    highlights: ['Mehrangarh Fort', 'Spice Market', 'Clock Tower'],
    stops: 5,
  },
  {
    day: 4,
    city: 'Jodhpur → Jaisalmer',
    title: 'Road to the Golden City',
    desc: 'Scenic desert drive, Osian temples stop, arrive Jaisalmer by sunset.',
    highlights: ['Osian Temples', 'Desert Drive'],
    stops: 3,
  },
  {
    day: 5,
    city: 'Jaisalmer',
    title: 'Jaisalmer — Fort & Dunes',
    desc: 'Living fort exploration, haveli carvings, camel ride at Sam Sand Dunes.',
    highlights: ['Jaisalmer Fort', 'Sam Sand Dunes', 'Patwon Haveli'],
    stops: 5,
  },
  {
    day: 6,
    city: 'Jaisalmer',
    title: 'Jaisalmer — Desert Slow Day',
    desc: 'Desert sunrise, chai stall hidden in fort walls, kulhad lassi, stargazing.',
    highlights: ['Desert Sunrise', 'Hidden Chai Stall'],
    stops: 4,
  },
  {
    day: 7,
    city: 'Jaipur',
    title: 'Jaipur — Final Day',
    desc: 'Last-minute shopping, City Palace museum, farewell rooftop dinner.',
    highlights: ['City Palace', 'Shopping'],
    stops: 3,
  },
];

export const ITINERARY_HIGHLIGHTS = {
  guideTips: 34,
  photoStops: 17,
};
