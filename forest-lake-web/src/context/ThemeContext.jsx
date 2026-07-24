import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [compactSidebar, setCompactSidebar] = useState(() => localStorage.getItem('compactSidebar') === 'true');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('compactSidebar', compactSidebar);
  }, [compactSidebar]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleCompactSidebar = () => setCompactSidebar(!compactSidebar);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, compactSidebar, toggleCompactSidebar }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
