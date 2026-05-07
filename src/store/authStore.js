import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      login: (email, password) => {
        // Фейковая авторизация
        if (email && password) {
          set({
            isAuthenticated: true,
            user: { email, name: email.split('@')[0] },
            token: 'fake-jwt-token-' + Date.now()
          });
          return true;
        }
        return false;
      },
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null
        });
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);