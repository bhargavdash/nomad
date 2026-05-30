export type TripStatus = 'researching' | 'ready' | 'active' | 'completed' | 'archived';

export interface TripSummary {
  id: string;
  destination: string;
  dateFrom: string | null;
  dateTo: string | null;
  durationDays: number | null;
  status: TripStatus;
  statsPlaces: number;
  statsTips: number;
  statsPhotoStops: number;
  emoji: string | null;
  createdAt: string;
}
