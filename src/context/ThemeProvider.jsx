import { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext();

/**
 * Locks the app to dark mode permanently.
 * The toggle has been removed — this provider just ensures
 * data-theme="dark" is always set on the document root.
 */
export function ThemeProvider({ children }) {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.removeItem('zico_theme');
  }, []);

  return (
    <ThemeContext.Provider value={{}}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
