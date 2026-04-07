import { createContext, ReactNode, useEffect, useState } from 'react';

export type ThemeType = 'light' | 'dark' | 'auto';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  isDark: boolean;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>('auto');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Load saved theme preference from localStorage
    const saved = localStorage.getItem('theme') as ThemeType | null;
    const initialTheme = saved || 'auto';
    setThemeState(initialTheme);

    // Apply theme on mount
    applyTheme(initialTheme);
  }, []);

  useEffect(() => {
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (theme === 'auto') {
        setIsDark(e.matches);
        document.documentElement.classList.toggle('dark', e.matches);
      }
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [theme]);

  const applyTheme = (selectedTheme: ThemeType) => {
    let shouldBeDark = false;

    if (selectedTheme === 'dark') {
      shouldBeDark = true;
    } else if (selectedTheme === 'light') {
      shouldBeDark = false;
    } else {
      // auto - check system preference
      shouldBeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);

    // Add transition class for smooth color transitions
    document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  };

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}
