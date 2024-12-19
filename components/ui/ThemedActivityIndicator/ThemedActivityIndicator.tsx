import React from "react";
import { ActivityIndicator, View } from "react-native";
import { withUnistyles } from "react-native-unistyles";

interface ThemedActivityIndicatorProps {
  color?: string;
}

const ThemedActivityIndicator = ({ color }: ThemedActivityIndicatorProps) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={"small"} />
    </View>
  );
};

export default withUnistyles(ThemedActivityIndicator, (theme) => ({
  color: theme.colors.onBackground,
}));
