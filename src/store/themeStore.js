import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useThemeStore = create(
  persist(
    (set) => ({
      colorScheme: 'light',
      toggleColorScheme: () =>
        set((state) => ({
          colorScheme: state.colorScheme === 'light' ? 'dark' : 'light'
        })),
      setColorScheme: (scheme) => set({ colorScheme: scheme })
    }),
    {
      name: 'theme-storage'
    }
  )
);