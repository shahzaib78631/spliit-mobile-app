import { StyleSheet } from "react-native-unistyles";
import Themes from "@/theme/md3";
import { Theme, ThemeColors } from "@/theme/types";
import { baseTheme } from "@/theme/baseTheme";
import { getColorWithAlpha, getElevationColor } from "@/utils/colors";

// Define app themes type
type AppThemes = Record<
  | "light"
  | "dark"
  | "tabbieLight"
  | "tabbieDark"
  | "strawberryDaiquiriLight"
  | "strawberryDaiquiriDark"
  | "takoLight"
  | "takoDark"
  | "tealTurquoiseLight"
  | "tealTurquoiseDark"
  | "yotsubaLight"
  | "yotsubaDark",
  Theme
>;

// Extend library types for themes
declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
}

// Helper function to extend themes with custom colors
const extendThemes = (colors: ThemeColors): ThemeColors => ({
  primaryOutline: getColorWithAlpha(colors.primary, 0.2),
  primaryOutlineVariant: getColorWithAlpha(colors.primary, 0.5),
  surface2: getElevationColor(colors, 0.08),
  rippleColor: getColorWithAlpha(colors.primary, 0.12),
  surfaceReader: getColorWithAlpha(colors.surface, 0.9),
  overlay: getColorWithAlpha("rgb(0,0,0)", 0.1),
  ...colors,
});

// Function to create a theme by extending the base theme and theme-specific colors
const createTheme = (lightOrDarkColors: ThemeColors): Theme => ({
  ...baseTheme,
  colors: extendThemes(lightOrDarkColors),
});

// Configure StyleSheet with themes and settings
StyleSheet.configure({
  themes: {
    light: createTheme(Themes.defaultTheme.light),
    dark: createTheme(Themes.defaultTheme.dark),
    tabbieLight: createTheme(Themes.tabbieTheme.light),
    tabbieDark: createTheme(Themes.tabbieTheme.dark),
    strawberryDaiquiriLight: createTheme(Themes.strawberryDaiquiriTheme.light),
    strawberryDaiquiriDark: createTheme(Themes.strawberryDaiquiriTheme.dark),
    takoLight: createTheme(Themes.takoTheme.light),
    takoDark: createTheme(Themes.takoTheme.dark),
    tealTurquoiseLight: createTheme(Themes.tealTurquoiseTheme.light),
    tealTurquoiseDark: createTheme(Themes.tealTurquoiseTheme.dark),
    yotsubaLight: createTheme(Themes.yotsubaTheme.light),
    yotsubaDark: createTheme(Themes.yotsubaTheme.dark),
  },
  settings: {
    initialTheme: "dark",
  },
});
