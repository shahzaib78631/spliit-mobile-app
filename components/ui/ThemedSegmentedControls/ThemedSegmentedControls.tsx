import React from "react";
import SegmentedControl, {
  SegmentedControlProps,
} from "@react-native-segmented-control/segmented-control";
import { StyleSheet, withUnistyles } from "react-native-unistyles";

const UniSegmentedControl = withUnistyles(SegmentedControl, (theme) => ({
  backgroundColor: theme.colors.surface2,
  tintColor: theme.colors.primary,
  activeFontStyle: {
    color: theme.colors.onPrimary,
  },
  fontStyle: {
    color: theme.colors.outline,
    fontSize: theme.fontSize.md,
  },
}));

interface ThemedSegmentedControlsProps
  extends Omit<SegmentedControlProps, "style"> {
  values: SegmentedControlProps["values"];
  selectedIndex: SegmentedControlProps["selectedIndex"];
}

const ThemedSegmentedControls = ({
  values,
  selectedIndex,
  ...props
}: ThemedSegmentedControlsProps) => {
  return (
    <UniSegmentedControl
      values={values}
      style={styles.segmentedControl}
      selectedIndex={selectedIndex}
      {...props}
    />
  );
};

export default ThemedSegmentedControls;

const styles = StyleSheet.create((theme) => ({
  segmentedControl: {
    marginBottom: theme.margin.md,
    borderWidth: 1,
    borderRadius: 9,
    borderColor: theme.colors.primaryOutline,
  },
}));
