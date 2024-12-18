import { ThemeType } from "../types";

export const tealTurquoiseTheme: ThemeType = {
  light: {
    id: 8,
    name: "Teal", // getString('appearanceScreen.theme.teal') will return this string
    isDark: false,
    code: "tealTurquoise",
    primary: "rgb(0, 106, 106)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(111, 247, 246)",
    onPrimaryContainer: "rgb(0, 32, 32)",
    secondary: "rgb(74, 99, 99)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(204, 232, 231)",
    onSecondaryContainer: "rgb(5, 31, 31)",
    tertiary: "rgb(75, 96, 124)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(211, 228, 255)",
    onTertiaryContainer: "rgb(4, 28, 53)",
    background: "rgb(250, 253, 252)",
    onBackground: "rgb(25, 28, 28)",
    surface: "rgb(250, 253, 252)",
    onSurface: "rgb(25, 28, 28)",
    onSurfaceVariant: "rgb(63, 73, 72)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    outline: "rgb(111, 121, 121)",
    inverseSurface: "rgb(45, 49, 49)",
    inverseOnSurface: "rgb(239, 241, 240)",
    inversePrimary: "rgb(76, 218, 218)",
    danger: "#ff4444", // Add any additional danger color here if necessary
  },
  dark: {
    id: 9,
    name: "Turquoise", // getString('appearanceScreen.theme.turquoise') will return this string
    isDark: true,
    code: "tealTurquoise",
    primary: "rgb(76, 218, 218)",
    onPrimary: "rgb(0, 55, 55)",
    primaryContainer: "rgb(0, 79, 79)",
    onPrimaryContainer: "rgb(111, 247, 246)",
    secondary: "rgb(176, 204, 203)",
    onSecondary: "rgb(27, 53, 52)",
    secondaryContainer: "rgb(50, 75, 75)",
    onSecondaryContainer: "rgb(204, 232, 231)",
    tertiary: "rgb(179, 200, 232)",
    onTertiary: "rgb(28, 49, 75)",
    tertiaryContainer: "rgb(51, 72, 99)",
    onTertiaryContainer: "rgb(211, 228, 255)",
    background: "rgb(25, 28, 28)",
    onBackground: "rgb(224, 227, 226)",
    surface: "rgb(25, 28, 28)",
    onSurface: "rgb(224, 227, 226)",
    onSurfaceVariant: "rgb(190, 201, 200)",
    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",
    outline: "rgb(136, 147, 146)",
    inverseSurface: "rgb(224, 227, 226)",
    inverseOnSurface: "rgb(45, 49, 49)",
    inversePrimary: "rgb(0, 106, 106)",
    danger: "#ff4444", // Add any additional danger color here if necessary
  },
};
