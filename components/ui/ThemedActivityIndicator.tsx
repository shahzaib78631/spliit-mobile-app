import useCommonStyles from "@/theme/styles";
import React from "react";
import { ActivityIndicator, View } from "react-native";

const ThemedActivityIndicator = () => {
  const { styles, theme } = useCommonStyles();

  return (
    <View style={[styles.flex1, styles.center]}>
      <ActivityIndicator size={"small"} color={theme.colors.onBackground} />
    </View>
  );
};

export default ThemedActivityIndicator;
