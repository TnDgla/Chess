import { createContext, useEffect, useState } from 'react';

export type THEME = 'default' | 'bubblegum';

export type THEME_CONTEXT = {
  theme: THEME;
  updateTheme: (theme: THEME) => void;
};

const AVAILABLE_THEMES: THEME[] = ['default', 'bubblegum'];

export const ThemeContext = createContext<THEME_CONTEXT | null>(null);

export function ThemesProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<THEME>(() => {
    const storedTheme = localStorage.getItem('theme') as THEME | null;
    return storedTheme && AVAILABLE_THEMES.includes(storedTheme) ? storedTheme : 'default';
  });

  function updateTheme(newTheme: THEME) {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.querySelector('html')?.setAttribute('data-theme', newTheme);
  }

  useEffect(() => {
    document.querySelector('html')?.setAttribute('data-theme', theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, updateTheme }}>{children}</ThemeContext.Provider>;
}