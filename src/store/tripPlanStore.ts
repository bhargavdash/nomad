import { create } from 'zustand';

// --- Types ---

export type TravelerCount = '1' | '2' | '3+' | 'large';

export type AccommodationType =
  | 'Boutique Villa'
  | 'Luxury Hotel'
  | 'Eco Lodge'
  | 'Homestay'
  | 'Airbnb'
  | 'Hostel'
  | 'Custom Stay';

export type PaceType = 'Slow & Soulful' | 'Balanced' | 'Action-Packed';

export type BudgetTier = '$' | '$$' | '$$$' | '$$$$';

export interface DateRange {
  from: string | null;
  to: string | null;
}

interface TripPlanState {
  destination: string;
  dates: DateRange;
  travelers: TravelerCount | null;
  selectedVibes: string[];
  accommodation: AccommodationType | null;
  pace: PaceType | null;
  budget: BudgetTier | null;
}

interface TripPlanActions {
  setDestination: (value: string) => void;
  setDates: (dates: DateRange) => void;
  setTravelers: (value: TravelerCount) => void;
  toggleVibe: (vibe: string) => void;
  setAccommodation: (value: AccommodationType) => void;
  setPace: (value: PaceType) => void;
  setBudget: (value: BudgetTier) => void;
  reset: () => void;
}

const INITIAL_STATE: TripPlanState = {
  destination: '',
  dates: { from: null, to: null },
  travelers: null,
  selectedVibes: [],
  accommodation: null,
  pace: null,
  budget: null,
};

export const useTripPlanStore = create<TripPlanState & TripPlanActions>()((set) => ({
  ...INITIAL_STATE,

  setDestination: (value) => set({ destination: value }),

  setDates: (dates) => set({ dates }),

  setTravelers: (value) => set({ travelers: value }),

  toggleVibe: (vibe) =>
    set((state) => ({
      selectedVibes: state.selectedVibes.includes(vibe)
        ? state.selectedVibes.filter((v) => v !== vibe)
        : [...state.selectedVibes, vibe],
    })),

  setAccommodation: (value) => set({ accommodation: value }),

  setPace: (value) => set({ pace: value }),

  setBudget: (value) => set({ budget: value }),

  reset: () => set(INITIAL_STATE),
}));
