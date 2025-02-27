import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MusicState {
  isPlaying: boolean;
  togglePlay: () => void;
}

const useMusicStore = create(
  persist<MusicState>(
    (set, get) => ({
      isPlaying: true,
      togglePlay: () => set({ isPlaying: !get().isPlaying }),
    }),
    {
      name: "music-storage",
    }
  )
);

export default useMusicStore;
