import React from "react";
import {
  View,
  TouchableOpacity,
  ViewProps,
  ScrollViewProps,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Colors } from "@/theme/types";
import ThemedText from "./ThemedText";
import { useThemeContext } from "@/context/ThemeContext";
import { StyleSheet } from "react-native-unistyles";

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
  const { commonStyles, theme } = useThemeContext();
  const { top } = useSafeAreaInsets();
  const router = useRouter();

  const Container = scrollable ? KeyboardAwareScrollView : View;
  const canGoBack = router?.canGoBack();

  /**
   * Retrieves theme color for status bar background
   * @returns {string} Color value from theme
   */
  const getColor = (): string => {
    const themeColors = theme.colors as Colors;
    return themeColors[statusbarBackgroundColor] || themeColors.background;
  };

  return (
    <View style={[commonStyles.flex1]}>
      {/* Status bar spacer */}
      <View
        style={[
          { height: top, backgroundColor: getColor() },
          commonStyles.paddingHorizontalLg,
          statusBarHeaderStyle,
        ]}
      />

      {/* Header */}
      {title && (
        <View
          style={[
            { backgroundColor: getColor() },
            commonStyles.rowJustifySpaceBetween,
            commonStyles.alignCenter,
            commonStyles.paddingLg,
            styles.header,
          ]}
        >
          {canGoBack && goBackEnabled && (
            <TouchableOpacity
              onPress={router.back}
              style={[commonStyles.absolute, commonStyles.paddingLg]}
            >
              <AntDesign
                name="arrowleft"
                size={18}
                color={theme.colors.onSurface}
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

      {/* Main content */}
      <Container
        style={[
          commonStyles.container,
          !scrollable && commonStyles.paddingVerticalXl,
          style,
        ]}
        {...props}
        contentContainerStyle={[
          commonStyles.gapXl,
          commonStyles.paddingVerticalXl,
          props.contentContainerStyle,
        ]}
        bottomOffset={20}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </Container>
    </View>
  );
};

/**
 * Stylesheet for ThemedView using theme-based styling
 *
 * @param {Object} theme - The current application theme
 * @returns {Object} Styled object for themed view components
 */
const styles = StyleSheet.create((theme) => ({
  header: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primaryOutline,
  },
}));

export default ThemedView;
