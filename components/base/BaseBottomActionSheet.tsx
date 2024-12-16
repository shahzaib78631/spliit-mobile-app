import { Text, View } from "react-native";
import React from "react";
import ActionSheet, {
  ActionSheetProps,
  ActionSheetRef,
} from "react-native-actions-sheet";
import ThemedText, { ThemedTextProps } from "../ui/ThemedText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { withUnistyles } from "react-native-unistyles";
import { commonStyles } from "@/theme/styles";

const ThemedActionSheet = withUnistyles(ActionSheet, (theme) => ({
  indicatorStyle: {
    marginVertical: theme.margin.md,
    backgroundColor: theme.colors.primary,
  },
  containerStyle: {
    paddingHorizontal: theme.padding.lg,
    backgroundColor: theme.colors.background,
  },
}));

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
    <ThemedActionSheet
      ref={reference}
      snapPoints={snapPoints}
      headerAlwaysVisible
      gestureEnabled
      safeAreaInsets={insets}
      useBottomSafeAreaPadding
      overdrawEnabled={false}
    >
      {title && (
        <ThemedText
          type="bold"
          fontSize="xxl"
          style={commonStyles.marginBottomMd}
          color="primary"
          {...titleProps}
        >
          {title}
        </ThemedText>
      )}
      {children}
    </ThemedActionSheet>
  );
};

export default BaseBottomActionSheet;
