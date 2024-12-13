import { UnistylesRegistry } from "react-native-unistyles";
import Themes from "./md3";
import { Theme, ThemeColors } from "./types";
import { baseTheme } from "./baseTheme";
import { getColorWithAlpha, getElevationColor } from "@/utils/colors";

// define app themes
type AppThemes = {
  defaultLight: Theme;
  defaultDark: Theme;
  tabbieLight: Theme;
  tabbieDark: Theme;
  strawberryDaiquiriLight: Theme;
  strawberryDaiquiriDark: Theme;
  takoLight: Theme;
  takoDark: Theme;
  tealTurquoiseLight: Theme;
  tealTurquoiseDark: Theme;
  yotsubaLight: Theme;
  yotsubaDark: Theme;
};

// override library types
declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
}

const extendThemes = (colors: ThemeColors) => {
  return {
    primaryOutline: getColorWithAlpha(colors.primary, 0.2),
    primaryOutlineVariant: getColorWithAlpha(colors.primary, 0.5),
    surface2: getElevationColor(colors, 0.08),
    rippleColor: getColorWithAlpha(colors.primary, 0.12),
    surfaceReader: getColorWithAlpha(colors.surface, 0.9),
    overlay: getColorWithAlpha("rgb(0,0,0)", 0.1),
    ...colors,
  };
};

// List of themes to add
UnistylesRegistry.addThemes({
  defaultLight: {
    ...baseTheme,
    colors: extendThemes(Themes.defaultTheme.light),
  },
  defaultDark: {
    ...baseTheme,
    colors: extendThemes(Themes.defaultTheme.dark),
  },
  tabbieLight: {
    ...baseTheme,
    colors: extendThemes(Themes.tabbieTheme.light),
  },
  tabbieDark: {
    ...baseTheme,
    colors: extendThemes(Themes.tabbieTheme.dark),
  },
  strawberryDaiquiriLight: {
    ...baseTheme,
    colors: extendThemes(Themes.strawberryDaiquiriTheme.light),
  },
  strawberryDaiquiriDark: {
    ...baseTheme,
    colors: extendThemes(Themes.strawberryDaiquiriTheme.dark),
  },
  takoLight: {
    ...baseTheme,
    colors: extendThemes(Themes.takoTheme.light),
  },
  takoDark: {
    ...baseTheme,
    colors: extendThemes(Themes.takoTheme.dark),
  },
  tealTurquoiseLight: {
    ...baseTheme,
    colors: extendThemes(Themes.tealTurquoiseTheme.light),
  },
  tealTurquoiseDark: {
    ...baseTheme,
    colors: extendThemes(Themes.tealTurquoiseTheme.dark),
  },
  yotsubaLight: {
    ...baseTheme,
    colors: extendThemes(Themes.yotsubaTheme.light),
  },
  yotsubaDark: {
    ...baseTheme,
    colors: extendThemes(Themes.yotsubaTheme.dark),
  },
}).addConfig({
  adaptiveThemes: true,
  initialTheme: "yotsubaLight",
});
