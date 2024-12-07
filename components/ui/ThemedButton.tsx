import { BorderRadius, FontSize } from "@/theme/types";
import React from "react";
import {
  TouchableOpacity,
  StyleProp,
  TouchableOpacityProps,
  ViewStyle,
  ActivityIndicator, // Import the ActivityIndicator for loading state
} from "react-native";
import ThemedText from "./ThemedText";
import { useThemeContext } from "@/context/ThemeContext";

interface ThemedButtonProps extends TouchableOpacityProps {
  /** The text to display on the button */
  title?: string;
  /** Additional styles for the button container */
  buttonStyle?: StyleProp<ViewStyle>;
  /** Variant of the button */
  variant?: "primary" | "secondary" | "outline" | "text" | "dashed-outline";
  /** Custom border radius */
  borderRadius?: keyof BorderRadius;
  /** Font size for the button label */
  fontSize?: keyof FontSize;
  /** Whether the button is in a loading state */
  loading?: boolean;
}

const ThemedButton: React.FC<ThemedButtonProps> = ({
  title,
  buttonStyle,
  variant = "primary",
  borderRadius = "md",
  fontSize = "md",
  loading = false, // Default loading is false
  ...props
}) => {
  const { commonStyles, theme } = useThemeContext();

  // Get dynamic styles based on the variant
  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case "primary":
        return { backgroundColor: theme.colors.primary };
      case "secondary":
        return { backgroundColor: theme.colors.secondary };
      case "outline":
        return {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: theme.colors.primary,
        };
      case "text":
        return { backgroundColor: "transparent" };
      case "dashed-outline":
        return {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: theme.colors.primary,
          borderStyle: "dashed",
        };
      default:
        return { backgroundColor: theme.colors.primary };
    }
  };

  return (
    <TouchableOpacity
      style={[
        commonStyles.paddingMd,
        commonStyles.center,
        getVariantStyles(),
        { borderRadius: theme.borderRadius[borderRadius] },
        buttonStyle,
      ]}
      disabled={loading} // Disable the button when loading is true
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.onPrimary} />
      ) : (
        title && (
          <ThemedText
            type="bold"
            style={[
              { fontSize: theme.fontSize[fontSize] },
              variant === "text" ||
              variant === "outline" ||
              variant === "dashed-outline"
                ? { color: theme.colors.primary }
                : { color: theme.colors.onPrimary },
            ]}
          >
            {title}
          </ThemedText>
        )
      )}
      {props.children}
    </TouchableOpacity>
  );
};

export default ThemedButton;
