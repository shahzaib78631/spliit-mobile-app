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
};

// override library types
declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
}

const extendThemes = (colors: ThemeColors) => {
  return {
    ...colors,
    surface2: getElevationColor(colors, 0.08),
    rippleColor: getColorWithAlpha(colors.primary, 0.12),
    surfaceReader: getColorWithAlpha(colors.surface, 0.9),
  };
};

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
}).addConfig({
  adaptiveThemes: true,
  initialTheme: "defaultDark",
});
