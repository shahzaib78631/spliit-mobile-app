import React from "react";
import { ActivityIndicator, View } from "react-native";
import ThemedView from "./ThemedView";
import { useThemeContext } from "@/context/ThemeContext";
import { withUnistyles } from "react-native-unistyles";

interface ThemedActivityIndicatorProps {
  color?: string;
}

const ThemedActivityIndicator = ({ color }: ThemedActivityIndicatorProps) => {
  return <ActivityIndicator size={"small"} color={color} />;
};

export default withUnistyles(ThemedActivityIndicator, (theme) => ({
  color: theme.colors.onBackground,
}));
