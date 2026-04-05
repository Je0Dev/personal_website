import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type Season = 'none' | 'easter' | 'christmas' | 'summer' | 'halloween';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  season: Season;
  setSeason: (season: Season) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [season, setSeason] = useState<Season>('none');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }

    const month = new Date().getMonth();
    let detectedSeason: Season = 'none';
    if (month >= 2 && month <= 4) detectedSeason = 'easter';
    else if (month === 11) detectedSeason = 'christmas';
    else if (month >= 5 && month <= 7) detectedSeason = 'summer';
    else if (month === 9) detectedSeason = 'halloween';
    
    setSeason(detectedSeason);
    document.documentElement.setAttribute('data-season', detectedSeason);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-season', season);
  }, [season]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, season, setSeason }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider(duh...)');
  }
  return context;
}
