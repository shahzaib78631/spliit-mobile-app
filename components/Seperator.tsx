import React from "react";
import { DimensionValue, View } from "react-native";
import { useStyles } from "react-native-unistyles";

// Define prop types for the component to make it reusable
interface SeperatorProps {
  height?: DimensionValue | undefined;
  width?: DimensionValue | undefined;
  color?: string;
  margin: DimensionValue | undefined;
}

const Seperator: React.FC<SeperatorProps> = ({
  height = 1,
  width = "100%",
  color,
  margin,
}) => {
  const { theme } = useStyles();
  return (
    <View
      style={{
        width,
        height,
        backgroundColor: color || theme.colors.outline,
        marginVertical: margin || theme.margin.xs,
      }}
    />
  );
};

export default Seperator;
