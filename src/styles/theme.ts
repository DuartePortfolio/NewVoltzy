export const lightTheme = {
  mode: 'light' as const,
  colors: {
    background: '#78B85E',
    backgroundSecondary: '#1E7B45',
    tabBar: '#D9D9D9',
    tabIcon: '#43734C',
    tabIconActive: '#FFFFFF',
    tabIconActiveBg: '#649064',
    text: '#FFFFFF',
    textMuted: 'rgba(255,255,255,0.8)',
    card: 'rgba(255,255,255,0.12)',
    border: 'rgba(255,255,255,0.2)',
    primary: '#78B85E',
  },
  gradient: ['#78B85E', '#1E7B45'],
};

export const darkTheme = {
  mode: 'dark' as const,
  colors: {
    background: '#0F1C14',
    backgroundSecondary: '#0B1A12',
    tabBar: '#141816',
    tabIcon: '#8BAF95',
    tabIconActive: '#FFFFFF',
    tabIconActiveBg: '#1F3A2B',
    text: '#FFFFFF',
    textMuted: 'rgba(255,255,255,0.7)',
    card: 'rgba(255,255,255,0.08)',
    border: 'rgba(255,255,255,0.12)',
    primary: '#2E6B45',
  },
  gradient: ['#0F1C14', '#0B1A12'],
};

export type Theme = typeof lightTheme;
