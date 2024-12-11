import useCommonStyles from "@/theme/styles";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import ThemedView from "./ThemedView";

const ThemedActivityIndicator = () => {
  const { styles, theme } = useCommonStyles();

  return (
    <ThemedView style={[styles.flex1, styles.center]}>
      <ActivityIndicator size={"small"} color={theme.colors.onBackground} />
    </ThemedView>
  );
};

export default ThemedActivityIndicator;
