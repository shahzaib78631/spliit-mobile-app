import { getStorageData, setStorageData, isWeb } from "./mmkv";

const THEME_STORAGE_KEY = "app-theme";

/**
 * Get the current theme.
 *
 * @returns The current theme ("light" or "dark").
 */
export function getStoredTheme(): { name: string; isDark: boolean } {
  const theme: { name: string; isDark: boolean } = getStorageData(
    THEME_STORAGE_KEY,
    undefined,
    isWeb() ? "localStorage" : "mmkv"
  );

  return theme?.name ? theme : { name: "default", isDark: false }; // Default to "light" theme if invalid or unset
}

/**
 * Set a theme.
 *
 * @param theme - The theme to set ("light" or "dark").
 */
export function setCurrentTheme(theme: {
  name: string;
  isDark: boolean;
}): void {
  setStorageData(THEME_STORAGE_KEY, theme, isWeb() ? "localStorage" : "mmkv");
}
