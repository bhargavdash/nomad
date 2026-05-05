import { Session, User } from '@supabase/supabase-js';
import { create } from 'zustand';

import { supabase } from '../lib/supabase';

type AuthState = {
  session: Session | null;
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  initialized: boolean;
  setSession: (session: Session | null) => void;
  setInitialized: () => void;
  signOut: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  accessToken: null,
  loading: false,
  initialized: false,

  setSession: (session) =>
    set({
      session,
      user: session?.user ?? null,
      accessToken: session?.access_token ?? null,
    }),

  setInitialized: () => set({ initialized: true }),

  signOut: async () => {
    set({ loading: true });
    await supabase.auth.signOut();
    set({ session: null, user: null, accessToken: null, loading: false });
  },
}));
