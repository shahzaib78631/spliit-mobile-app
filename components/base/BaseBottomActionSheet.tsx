import { Text, View } from "react-native";
import React from "react";
import ActionSheet, {
  ActionSheetProps,
  ActionSheetRef,
} from "react-native-actions-sheet";
import ThemedText, { ThemedTextProps } from "../ui/ThemedText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";

interface BaseBottomActionSheetProps extends ActionSheetProps {
  /**
   * The height of the bottom sheet.
   */
  snapPoints?: number[];

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

  reference?: React.RefObject<ActionSheetRef> | null;
}

const BaseBottomActionSheet = ({
  snapPoints,
  children,
  title,
  titleProps,
  reference,
}: BaseBottomActionSheetProps) => {
  const insets = useSafeAreaInsets();

  return (
    <ActionSheet
      ref={reference}
      snapPoints={snapPoints}
      headerAlwaysVisible
      gestureEnabled
      safeAreaInsets={insets}
      useBottomSafeAreaPadding
      indicatorStyle={styles.indicator}
      overdrawEnabled={false}
      containerStyle={styles.container}
    >
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
    </ActionSheet>
  );
};

export default BaseBottomActionSheet;

// Styles for the BottomSheet content and container
const styles = StyleSheet.create((theme) => ({
  container: {
    padding: theme.padding.sm,
    backgroundColor: theme.colors.background,
  },
  indicator: {
    marginVertical: theme.margin.md,
    backgroundColor: theme.colors.primary,
  },
  titleStyle: {
    marginBottom: theme.spacing.md,
  },
}));
