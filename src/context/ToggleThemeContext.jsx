import { createContext, useState, useContext } from "react";

const toggleThemeContext = createContext();

export const useToggle = () => {
  return useContext(toggleThemeContext);
};
export const ToggleThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };
  return (
    <toggleThemeContext.Provider value={{ toggleTheme, theme }}>
      {children}
    </toggleThemeContext.Provider>
  );
};
