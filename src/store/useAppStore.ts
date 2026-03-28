import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  avatarUrl?: string;
}

interface AppState {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

export const useAppStore = create<AppState>(set => ({
  currentUser: {
    id: '1',
    name: 'Jane Doe',
  },
  setCurrentUser: user => set({ currentUser: user }),
}));
