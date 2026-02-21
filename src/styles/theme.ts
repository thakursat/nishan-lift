export interface ElevatorTheme {
  colors: {
    background: string;
    surface: string;
    textPrimary: string;
    textMuted: string;
    accent: string;
    accentStrong: string;
    border: string;
    highlight: string;
  };
  gradients: {
    hero: string;
    accent: string;
  };
}

export const elevatorTheme: ElevatorTheme = {
  colors: {
    background: '#f7f5f1',
    surface: '#ffffff',
    textPrimary: '#0e0e13',
    textMuted: '#6b6b75',
    accent: '#9E0000',
    accentStrong: '#c40000',
    border: '#e4ded7',
    highlight: '#ff6a6a',
  },
  gradients: {
    hero: 'linear-gradient(180deg, rgba(158, 0, 0, 0.25), rgba(255, 255, 255, 0.95))',
    accent:
      'linear-gradient(135deg, rgba(158, 0, 0, 0.95), rgba(196, 0, 0, 0.8), rgba(255, 77, 77, 0.6))',
  },
};
