import React, { useEffect } from "react";
import {
  View,
  TouchableOpacity,
  ViewProps,
  ScrollViewProps,
  ViewStyle,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Colors, ThemeColors } from "@/theme/types";
import ThemedText from "./ThemedText";
import { useThemeContext } from "@/context/ThemeContext";
import { StyleSheet, withUnistyles } from "react-native-unistyles";
import { ThemedMaterialIcons } from "./ThemedIcons";

/**
 * Props interface for ThemedView component
 */
interface ThemedViewProps extends ViewProps, ScrollViewProps {
  statusBarHeaderStyle?: ViewProps["style"];
  style?: ViewProps["style"];
  children?: React.ReactNode;
  scrollable?: boolean;
  title?: string;
  statusbarBackgroundColor?: keyof Colors;
  goBackEnabled?: boolean;
}

const ThemedKeyboardAwareScrollView = withUnistyles(KeyboardAwareScrollView);

/**
 * Reusable themed view component with optional scrolling and header
 *
 * @component
 * @param {ThemedViewProps} props - Component configuration
 * @returns {React.ReactElement} Themed view with optional header and scrolling
 */
const ThemedView: React.FC<ThemedViewProps> = ({
  children,
  style,
  scrollable = false,
  statusBarHeaderStyle,
  title,
  goBackEnabled = true,
  statusbarBackgroundColor = "background",
  ...props
}: ThemedViewProps): React.ReactElement => {
  const { commonStyles } = useThemeContext();
  const router = useRouter();

  const canGoBack = router?.canGoBack();

  return (
    <View style={[commonStyles.flex1]}>
      {/* Status bar spacer */}
      <View style={styles.statusBarStyle(statusbarBackgroundColor)} />

      {/* Header */}
      {title && (
        <View
          style={[
            styles.header(statusbarBackgroundColor),
            commonStyles.rowJustifySpaceBetween,
            commonStyles.alignCenter,
            commonStyles.paddingLg,
          ]}
        >
          {canGoBack && goBackEnabled && (
            <TouchableOpacity
              onPress={router.back}
              style={[commonStyles.absolute, commonStyles.paddingLg]}
            >
              <ThemedMaterialIcons
                name="arrow-back"
                size={18}
                uniProps={(theme) => ({
                  color: theme.colors.onSurface,
                })}
              />
            </TouchableOpacity>
          )}
          <View
            style={[
              commonStyles.flex1,
              commonStyles.justifyCenter,
              commonStyles.alignCenter,
            ]}
          >
            <ThemedText type="bold" fontSize="lg" color="onSurface">
              {title}
            </ThemedText>
          </View>
        </View>
      )}

      {scrollable && (
        <KeyboardAwareScrollView
          {...props}
          style={commonStyles.container}
          contentContainerStyle={commonStyles.gapMd}
          bottomOffset={20}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </KeyboardAwareScrollView>
      )}
      {!scrollable && (
        <View
          style={[
            commonStyles.container,
            commonStyles.paddingVerticalXl,
            style,
          ]}
        >
          {children}
        </View>
      )}
    </View>
  );
};

/**
 * Stylesheet for ThemedView using theme-based styling
 *
 * @param {Object} theme - The current application theme
 * @returns {Object} Styled object for themed view components
 */
const styles = StyleSheet.create((theme, rt) => ({
  header: (color: keyof Colors) => ({
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primaryOutline,
    backgroundColor: theme.colors[color],
  }),
  statusBarStyle: (color: keyof Colors) => ({
    backgroundColor: theme.colors[color],
    height: rt.insets.top,
    paddingHorizontal: theme.padding.lg,
  }),
  container: {
    backgroundColor: theme.colors.background,
  },
}));

export default ThemedView;
