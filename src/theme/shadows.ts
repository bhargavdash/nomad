import { ViewStyle } from 'react-native';

export const shadows: Record<string, ViewStyle> = {
  cardResting: {
    shadowColor: '#1B2B4B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  cardPressed: {
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
  activeTripCard: {
    shadowColor: '#1B2B4B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 32,
    elevation: 8,
  },
  contextMenu: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.45,
    shadowRadius: 40,
    elevation: 12,
  },
  accentButtonHover: {
    shadowColor: '#C4623A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 28,
    elevation: 8,
  },
} as const;
