import { useThemeContext } from "@/context/ThemeContext";
import { BorderRadius, Colors } from "@/theme/types";
import React from "react";
import { View, ViewStyle } from "react-native";
import { StyleSheet } from "react-native-unistyles";

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
  const { commonStyles } = useThemeContext();

  return (
    <View
      style={[
        styles.cardContainer,
        commonStyles.borderRadius(borderRadius),
        commonStyles.backgroundColor(color),
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
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
