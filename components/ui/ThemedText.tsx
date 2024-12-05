import { FontSize, MD3ThemeType, ThemeColors } from "@/theme/types";
import React from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type Colors = Omit<ThemeColors, "id" | "name" | "isDark">;

interface ThemedTextProps extends TextProps {
  /** Content of the text */
  children: React.ReactNode;
  /** Font type to apply */
  type?: "regular" | "bold" | "thin" | "ultraLight" | "light" | "medium";
  /** Font size to apply */
  fontSize?: keyof FontSize;
  /** Text color to apply from theme */
  color?: keyof Colors;
  /** Text alignment */
  textAlign?: TextStyle["textAlign"];
}

const ThemedText: React.FC<ThemedTextProps> = ({
  children,
  style,
  type = "light",
  fontSize = "md",
  color = "onSurface", // Default color
  textAlign = "auto", // Default alignment
  ...otherProps
}) => {
  const { theme } = useStyles();

  /**
   * Determines the font family based on the "type" prop
   * @returns Font family string
   */
  const getFontFamily = (): string => {
    switch (type) {
      case "medium":
        return "e-Ukraine-Medium";
      case "regular":
        return "e-Ukraine-Regular";
      case "light":
        return "e-Ukraine-Light";
      case "bold":
        return "e-Ukraine-Bold";
      case "thin":
        return "e-Ukraine-Thin";
      case "ultraLight":
        return "e-Ukraine-ultraLight";
      default:
        return "e-Ukraine-Regular";
    }
  };

  /**
   * Retrieves the font size based on the `fontSize` prop
   */
  const getFontSize = (): number => {
    const fontSizes: FontSize = theme.fontSize;
    return fontSizes[fontSize] || fontSizes.md;
  };

  /**
   * Retrieves the color based on the `color` prop
   */
  const getColor = (): string => {
    const themeColors = theme.colors as Colors;
    return themeColors[color] || themeColors.onSurface; // Default to `onSurface`
  };

  return (
    <Text
      style={[
        {
          fontFamily: getFontFamily(),
          fontSize: getFontSize(),
          color: getColor(),
          textAlign, // Apply textAlign prop here
        },
        style,
      ]}
      {...otherProps}
    >
      {children}
    </Text>
  );
};

export default ThemedText;
