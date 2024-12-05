import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ViewProps,
  ScrollViewProps,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { AntDesign } from "@expo/vector-icons";
import { getColorWithAlpha } from "@/utils/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

interface ThemedViewProps extends ViewProps, ScrollViewProps {
  statusBarHeaderStyle?: ViewProps["style"];
  style?: ViewProps["style"];
  children?: React.ReactNode;
  scrollable?: boolean; // New scrollable prop
  title?: string; // Title prop
}

const ThemedView: React.FC<ThemedViewProps> = ({
  children,
  style,
  scrollable = false,
  statusBarHeaderStyle,
  title,
  ...props
}) => {
  const { styles, theme } = useStyles(stylesheet);
  const { top } = useSafeAreaInsets();
  const router = useRouter();

  const Container = scrollable ? KeyboardAwareScrollView : View;

  const canGoBack = router.canGoBack(); // Determine if the user can go back

  return (
    <>
      {/* Status bar spacer */}
      <View
        style={[
          { height: top },
          styles.container,
          statusBarHeaderStyle,
          { flex: 0 },
        ]}
      />

      {/* Header */}
      {title && (
        <View style={styles.header}>
          {canGoBack && (
            <TouchableOpacity onPress={router.back} style={styles.backButton}>
              <AntDesign
                name="arrowleft"
                size={18}
                color={theme.colors.onSurface}
              />
            </TouchableOpacity>
          )}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>
      )}

      {/* Main content */}
      <Container
        style={[styles.container, style]}
        {...props}
        bottomOffset={20}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </Container>
    </>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.padding.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.padding.lg,
    backgroundColor: theme.colors.surface2,
    paddingVertical: theme.padding.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primaryOutline,
  },
  backButton: {
    position: "absolute",
    padding: theme.padding.lg,
  },
  backText: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.md,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: "bold",
    color: theme.colors.onSurface,
  },
}));

export default ThemedView;
