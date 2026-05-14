import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
}

interface Organization {
  id: string;
  name: string;
  slug: string;
  role: 'OWNER' | 'ADMIN' | 'MEMBER';
}

interface AuthState {
  user: User | null;
  token: string | null;
  currentOrg: Organization | null;
  isAuthenticated: boolean;
  
  setAuth: (user: User, token: string) => void;
  setOrg: (org: Organization) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      currentOrg: null,
      isAuthenticated: false,

      setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
      setOrg: (currentOrg) => set({ currentOrg }),
      logout: () => set({ user: null, token: null, currentOrg: null, isAuthenticated: false }),
    }),
    {
      name: 'insight-ai-auth',
    }
  )
);
