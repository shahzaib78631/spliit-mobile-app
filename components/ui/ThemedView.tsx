import React from "react";
import { View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface ThemedViewProps extends ViewProps {
  style?: ViewProps["style"];
  children: React.ReactNode;
}

const ThemedView: React.FC<ThemedViewProps> = ({
  children,
  style,
  ...props
}) => {
  const { styles } = useStyles(stylesheet);
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: top }, style]} {...props}>
      {children}
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.padding.lg,
  },
}));

export default ThemedView;
