import React, { createContext, useContext } from 'react';

// This context is now neutralized to enforce Light Mode only.
const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  // Always provide false for isDarkMode
  return (
    <DarkModeContext.Provider value={{ isDarkMode: false, toggleDarkMode: () => {} }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  return { isDarkMode: false, toggleDarkMode: () => {} };
};