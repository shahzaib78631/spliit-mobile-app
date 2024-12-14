import { useCommonStyles } from "@/theme/styles";
import {
  changeNavigationBarColor,
  setStatusBarColor,
} from "@/theme/utils/setBarColor";
import React, { createContext, ReactNode, useEffect } from "react";
import Color from "color";
import { UnistylesTheme } from "react-native-unistyles/lib/typescript/src/types";
import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";

// Define the shape of the context data
interface ThemeContextType {
  commonStyles: ReturnType<typeof useCommonStyles>;
  theme: UnistylesTheme;
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define the props for the ThemeProvider component
interface ThemeProviderProps {
  children: ReactNode;
}

// Create the ThemeProvider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const commonStyles = useCommonStyles();
  const theme: UnistylesTheme = UnistylesRuntime.getTheme();

  useEffect(() => {
    const timer = setTimeout(async () => {
      setStatusBarColor(theme.colors);
      changeNavigationBarColor(
        Color(theme.colors.surface2).hex(),
        theme.colors.isDark
      );
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ commonStyles, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useThemeContext = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
