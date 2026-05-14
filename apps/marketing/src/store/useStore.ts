import { create } from 'zustand';

interface AppState {
  scrollY: number;
  scrollVelocity: number;
  heroHeight: number;
  videoReady: boolean;
  setScrollY: (y: number) => void;
  setScrollVelocity: (v: number) => void;
  setHeroHeight: (h: number) => void;
  setVideoReady: (ready: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  scrollY: 0,
  scrollVelocity: 0,
  heroHeight: 0,
  videoReady: false,
  setScrollY: (y) => set({ scrollY: y }),
  setScrollVelocity: (v) => set({ scrollVelocity: v }),
  setHeroHeight: (h) => set({ heroHeight: h }),
  setVideoReady: (ready) => set({ videoReady: ready }),
}));
