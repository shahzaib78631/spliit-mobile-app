import React, { useEffect } from "react";
import {
  View,
  TouchableOpacity,
  ViewProps,
  ScrollViewProps,
} from "react-native";
import { useRouter } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Colors } from "@/theme/types";
import ThemedText from "@/components/ui/ThemedText";
import { useThemeContext } from "@/context/ThemeContext";
import { StyleSheet, withUnistyles } from "react-native-unistyles";
import { ThemedMaterialIcons } from "@/components/ui/ThemedIcons";
import ThemedButton from "../ThemedButton";

/**
 * Props interface for ThemedView component
 */
interface ThemedViewProps extends ViewProps, ScrollViewProps {
  statusBarHeaderStyle?: ViewProps["style"];
  style?: ViewProps["style"];
  children?: React.ReactNode;
  title?: string;
  statusbarBackgroundColor?: keyof Colors;
  scrollEnabled?: boolean;
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
  statusBarHeaderStyle,
  title,
  scrollEnabled = false,
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
      <View
        style={[
          styles.statusBarStyle,
          commonStyles.backgroundColor(statusbarBackgroundColor),
        ]}
      />

      {/* Header */}
      {title && (
        <View
          style={[
            styles.header,
            commonStyles.rowJustifySpaceBetween,
            commonStyles.alignCenter,
            commonStyles.paddingLg,
            commonStyles.backgroundColor(statusbarBackgroundColor),
          ]}
        >
          {canGoBack && goBackEnabled && (
            <ThemedButton
              style={[
                commonStyles.paddingMd,
                commonStyles.absolute,
                commonStyles.borderRadiusXl,
                { left: 10 },
              ]}
              onPress={() => router.dismiss()}
            >
              <ThemedMaterialIcons
                name="arrow-back"
                size={18}
                color="onSurface"
              />
            </ThemedButton>
          )}
          <View
            style={[
              commonStyles.flex1,
              commonStyles.justifyCenter,
              commonStyles.alignCenter,
            ]}
          >
            <ThemedText type="regular" fontSize="xl" color="onSurface">
              {title}
            </ThemedText>
          </View>
        </View>
      )}

      {scrollEnabled && (
        <ThemedKeyboardAwareScrollView
          style={commonStyles.container}
          {...props}
          contentContainerStyle={styles.contentContainer}
          bottomOffset={20}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ThemedKeyboardAwareScrollView>
      )}
      {!scrollEnabled && (
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
  header: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primaryOutline,
  },
  statusBarStyle: {
    height: rt.insets.top,
    paddingHorizontal: theme.padding.lg,
  },
  container: {
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    gap: theme.spacing.md,
    paddingVertical: theme.padding.lg,
  },
}));

export default ThemedView;
