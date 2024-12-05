import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

import { useStyles } from "react-native-unistyles";

const ThemedActivityIndicator = () => {
  const { theme } = useStyles();

  return (
    <View style={[styles.container]}>
      <ActivityIndicator size={"small"} color={theme.colors.onBackground} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ThemedActivityIndicator;
