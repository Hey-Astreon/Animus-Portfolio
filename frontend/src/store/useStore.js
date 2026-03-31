import { create } from 'zustand';

// Theme store for managing light/dark mode
const useThemeStore = create((set) => ({
  theme: 'light', // 'light' | 'dark'
  isTransitioning: false,
  
  toggleTheme: () => set((state) => ({
    theme: state.theme === 'light' ? 'dark' : 'light',
    isTransitioning: true,
  })),
  
  setTheme: (theme) => set({ theme, isTransitioning: true }),
  
  finishTransition: () => set({ isTransitioning: false }),
}));

// System stats store
const useSystemStore = create((set) => ({
  fps: 60,
  performance: 100,
  loadTime: 0,
  systemStatus: 'initializing',
  currentSection: 'hero',
  target: 'SYSTEM_IDLE',
  focusStatus: 'SCANNING',
  
  setFps: (fps) => set({ fps }),
  setPerformance: (performance) => set({ performance }),
  setLoadTime: (loadTime) => set({ loadTime }),
  setSystemStatus: (systemStatus) => set({ systemStatus }),
  setCurrentSection: (currentSection) => set({ currentSection }),
  setTarget: (target) => set({ target }),
  setFocusStatus: (focusStatus) => set({ focusStatus }),
}));

export { useThemeStore, useSystemStore };
