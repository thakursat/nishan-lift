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
    ink: string;
    inkSoft: string;
    steel: string;
  };
  gradients: {
    hero: string;
    accent: string;
  };
}

export const elevatorTheme: ElevatorTheme = {
  colors: {
    background: '#f4f2ee',
    surface: '#ffffff',
    textPrimary: '#0d0d12',
    textMuted: '#5f5f6b',
    accent: '#c40000',
    accentStrong: '#e01414',
    border: '#e2ded8',
    highlight: '#ff4d4d',
    ink: '#0b0b0f',
    inkSoft: '#16161d',
    steel: '#a7adb4',
  },
  gradients: {
    hero: 'linear-gradient(180deg, rgba(11, 11, 15, 0.2), rgba(11, 11, 15, 0.92))',
    accent:
      'linear-gradient(135deg, rgba(196, 0, 0, 0.95), rgba(224, 20, 20, 0.85), rgba(255, 77, 77, 0.6))',
  },
};
