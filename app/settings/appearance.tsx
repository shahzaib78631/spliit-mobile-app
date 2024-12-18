import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useMemo, useState } from "react";
import { ThemedList, ThemedText, ThemedView } from "@/components/ui";
import { getString } from "@/strings/translations";
import ThemePicker from "@/components/ThemePicker";
import { darkThemes, lightThemes } from "@/theme/md3";
import { UnistylesRuntime, UnistylesThemes } from "react-native-unistyles";
import { useThemeContext } from "@/context/ThemeContext";
import { ThemeColors } from "@/theme/types";
import { AppThemeName } from "react-native-unistyles/lib/typescript/src/specs/types";
import { setCurrentTheme } from "@/services/theme";

const AppearanceSettings = () => {
  const [currenThemeName, setCurrentThemeName] = useState<
    keyof UnistylesThemes | undefined
  >(UnistylesRuntime.themeName);
  const { setTheme, commonStyles } = useThemeContext();

  console.log("currenThemeName", currenThemeName);

  return (
    <ThemedView
      goBackEnabled={true}
      statusbarBackgroundColor="surface2"
      style={{ paddingHorizontal: 0 }}
      title={getString("settings.appearance")}
    >
      <ScrollView>
        <ThemedText
          color="primary"
          fontSize="xxl"
          type="medium"
          style={[
            commonStyles.paddingHorizontalXl,
            commonStyles.paddingVerticalMd,
          ]}
        >
          {getString("appearance.app_theme")}
        </ThemedText>
        <ThemedText
          color="onSurface"
          fontSize="md"
          type="regular"
          style={[
            commonStyles.paddingHorizontalXl,
            commonStyles.paddingVerticalMd,
          ]}
        >
          {getString("appearance.light_theme")}
        </ThemedText>
        <ThemedList
          type="flashlist"
          data={lightThemes}
          extraData={currenThemeName}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }: { item: ThemeColors }) => (
            <ThemePicker
              key={item.id}
              selected={
                currenThemeName ===
                `${item.code}${item.isDark ? "-dark" : "-light"}`
              }
              theme={item}
              onPress={() => {
                const themeName: any = `${item.code}${
                  item.isDark ? "-dark" : "-light"
                }`;
                setTheme(themeName);
                setCurrentThemeName(themeName);
                setCurrentTheme({
                  name: item.code,
                  isDark: item.isDark,
                });
              }}
            />
          )}
          estimatedItemSize={123}
          horizontal={true}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
          showsHorizontalScrollIndicator={false}
        />
        <ThemedText
          color="onSurface"
          fontSize="md"
          type="regular"
          style={[
            commonStyles.paddingHorizontalXl,
            commonStyles.paddingVerticalMd,
          ]}
        >
          {getString("appearance.dark_theme")}
        </ThemedText>
        <ThemedList
          type="flatlist"
          data={darkThemes}
          extraData={currenThemeName}
          renderItem={({ item }: { item: ThemeColors }) => (
            <ThemePicker
              key={item.id}
              theme={item}
              selected={
                currenThemeName ===
                `${item.code}${item.isDark ? "-dark" : "-light"}`
              }
              onPress={() => {
                const themeName: any = `${item.code}${
                  item.isDark ? "-dark" : "-light"
                }`;
                setTheme(themeName);
                setCurrentThemeName(themeName);
                setCurrentTheme({
                  name: item.code,
                  isDark: item.isDark,
                });
              }}
            />
          )}
          estimatedItemSize={123}
          horizontal={true}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </ThemedView>
  );
};

export default AppearanceSettings;

const styles = StyleSheet.create({});
