import React, { useCallback, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import useCommonStyles from "@/theme/styles";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import ThemedText, { ThemedTextProps } from "../ui/ThemedText";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Define the prop types for BaseBottomSheet
interface BaseBottomSheetProps {
  /**
   * The height of the bottom sheet.
   */
  height: number;

  /**
   * A reference to the bottom sheet instance.
   */
  reference: any;

  /**
   * Callback for when the bottom sheet is closed.
   */
  onClose?: () => void;

  /**
   * Callback for when the bottom sheet is opened.
   */
  onOpen?: () => void;

  /**
   * The children elements that will be rendered inside the BottomSheet.
   */
  children?: React.ReactNode;

  /**
   * The title of the bottom sheet.
   */
  title: string;

  /**
   * Additional props for the title.
   */
  titleProps?: ThemedTextProps;
}

/**
 * BaseBottomSheet is a reusable component that renders a bottom sheet using the `react-native-raw-bottom-sheet` package.
 * It allows content to be displayed in a sliding modal, and can be configured with snap points and initial index.
 *
 * @param {BaseBottomSheetProps} props - The props for configuring the bottom sheet, including snap points, initial index, and children.
 */
const BaseBottomSheet: React.FC<BaseBottomSheetProps> = ({
  height,
  onClose = () => {},
  onOpen = () => {},
  children,
  title,
  titleProps,
  reference,
}: BaseBottomSheetProps) => {
  const { styles, theme } = useStyles(stylesheet);
  const { bottom } = useSafeAreaInsets();

  // Render the BottomSheet component with dynamic snap points and children content
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ position: "absolute" }}
    >
      <RBSheet
        ref={reference} // Ref to control the BottomSheet instance
        height={height + bottom} // Use the last snap point as the initial height
        closeOnPressMask // Close the bottom sheet when the mask is pressed
        onClose={onClose} // Callback when the bottom sheet is closed
        onOpen={onOpen} // Callback when the bottom sheet is opened
        draggable
        customStyles={{
          container: styles.container,
          draggableIcon: styles.indicator,
        }}
      >
        <View style={styles.container}>
          {title && (
            <ThemedText
              type="bold"
              fontSize="xxl"
              style={styles.titleStyle}
              color="primary"
              {...titleProps}
            >
              {title}
            </ThemedText>
          )}
          {children}
        </View>
      </RBSheet>
    </KeyboardAvoidingView>
  );
};

// Styles for the BottomSheet content and container
const stylesheet = createStyleSheet((theme) => ({
  container: {
    padding: theme.padding.sm,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
  },
  indicator: {
    backgroundColor: theme.colors.primary,
  },
  titleStyle: {
    marginBottom: theme.spacing.md,
  },
}));

export default BaseBottomSheet;
