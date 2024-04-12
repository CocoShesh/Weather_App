import { createContext, useState, useContext } from "react";

const toggleThemeContext = createContext();

export const useToggle = () => {
  return useContext(toggleThemeContext);
};
export const ToggleThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(false);

  const toggleTheme = () => {
    setTheme(document.documentElement.classList.toggle("dark"));
  };
  return (
    <toggleThemeContext.Provider value={{ toggleTheme, theme }}>
      {children}
    </toggleThemeContext.Provider>
  );
};
