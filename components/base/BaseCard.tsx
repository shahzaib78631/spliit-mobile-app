import { BorderRadius, Colors, ThemeColors } from "@/theme/types";
import React from "react";
import { View, ViewStyle } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

// Define prop types for the component to make it reusable
interface BaseCardProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  color?: keyof Colors | undefined;
  borderRadius?: keyof BorderRadius; // Add the borderRadius prop
}

const BaseCard: React.FC<BaseCardProps> = ({
  children,
  style,
  color = "surface2",
  borderRadius = "lg",
}: BaseCardProps) => {
  const { styles, theme } = useStyles(stylesheet);

  // Retrieve the borderRadius value from the theme or the prop
  const cardBorderRadius = theme.borderRadius[borderRadius];

  /**
   * Retrieves theme color for status bar background
   * @returns {string} Color value from theme
   */
  const getColor = (): string => {
    const themeColors = theme.colors as Colors;
    return themeColors[color] || themeColors.background;
  };

  return (
    <View
      style={[
        styles.cardContainer,
        { borderRadius: cardBorderRadius, backgroundColor: getColor() },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  cardContainer: {
    backgroundColor: theme.colors.surface2,
    padding: theme.margin.xl,
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.primaryOutline,
  },
}));

export default BaseCard;
