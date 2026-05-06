import { Session, User } from '@supabase/supabase-js';
import { create } from 'zustand';

import { api } from '../lib/api';
import { supabase } from '../lib/supabase';

export type ApiProfile = {
  id: string;
  email: string | null;
  displayName: string | null;
  avatarUrl: string | null;
};

type AuthState = {
  session: Session | null;
  user: User | null;
  accessToken: string | null;
  profile: ApiProfile | null;
  loading: boolean;
  initialized: boolean;
  setSession: (session: Session | null) => void;
  setInitialized: () => void;
  fetchProfile: () => Promise<void>;
  updateDisplayName: (name: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  user: null,
  accessToken: null,
  profile: null,
  loading: false,
  initialized: false,

  setSession: (session) =>
    set({
      session,
      user: session?.user ?? null,
      accessToken: session?.access_token ?? null,
    }),

  setInitialized: () => set({ initialized: true }),

  fetchProfile: async () => {
    try {
      const res = await api.get<{ profile: ApiProfile }>('/auth/me');
      set({ profile: res.data.profile });
    } catch {
      // silently ignore — UI falls back to user_metadata
    }
  },

  updateDisplayName: async (name: string) => {
    const res = await api.patch<{ profile: ApiProfile }>('/profile', { display_name: name });
    set({ profile: res.data.profile });
  },

  signOut: async () => {
    set({ loading: true });
    await supabase.auth.signOut();
    set({ session: null, user: null, accessToken: null, profile: null, loading: false });
  },
}));
