import { BorderRadius, FontSize } from "@/theme/types";
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleProp,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
  ActivityIndicator, // Import the ActivityIndicator for loading state
} from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

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
  const { styles, theme } = useStyles(stylesheet);

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
        styles.button,
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
          <Text
            style={[
              styles.title,
              { fontSize: theme.fontSize[fontSize] },
              variant === "text" ||
              variant === "outline" ||
              variant === "dashed-outline"
                ? { color: theme.colors.primary }
                : { color: theme.colors.onPrimary },
            ]}
          >
            {title}
          </Text>
        )
      )}
      {props.children}
    </TouchableOpacity>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  button: {
    padding: theme.spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
  },
}));

export default ThemedButton;
