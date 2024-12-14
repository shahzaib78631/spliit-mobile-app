import React from "react";
import { ActivityIndicator, View } from "react-native";
import ThemedView from "./ThemedView";
import { useThemeContext } from "@/context/ThemeContext";

const ThemedActivityIndicator = () => {
  const { commonStyles, theme } = useThemeContext();

  return (
    <ThemedView style={[commonStyles.flex1, commonStyles.center]}>
      <ActivityIndicator size={"small"} color={theme.colors.onBackground} />
    </ThemedView>
  );
};

export default ThemedActivityIndicator;
