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
import { StyleSheet } from "react-native-unistyles";
import ThemedActivityIndicator from "./ThemedActivityIndicator";

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
  /** Color for the loading indicator */
  indicatorColor?: string;
}

const ThemedButton: React.FC<ThemedButtonProps> = ({
  title,
  buttonStyle,
  variant = "primary",
  borderRadius = "md",
  fontSize = "md",
  loading = false, // Default loading is false
  indicatorColor,
  ...props
}) => {
  const { commonStyles } = useThemeContext();

  styles.useVariants({
    type: variant,
  });

  return (
    <TouchableOpacity
      style={[
        styles.container,
        commonStyles.borderRadius(borderRadius),
        commonStyles.paddingMd,
        commonStyles.center,
        buttonStyle,
      ]}
      disabled={loading} // Disable the button when loading is true
      {...props}
    >
      {loading ? (
        <ThemedActivityIndicator
          uniProps={(theme) => ({
            color: indicatorColor || theme.colors.onPrimary,
          })}
        />
      ) : (
        title && (
          <ThemedText type={"bold"} fontSize={fontSize} style={styles.title}>
            {title}
          </ThemedText>
        )
      )}
      {props.children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create((theme) => ({
  borderRadius: (radius: keyof BorderRadius) => ({
    borderRadius: theme.borderRadius[radius],
  }),
  container: {
    variants: {
      type: {
        primary: { backgroundColor: theme.colors.primary },
        secondary: { backgroundColor: theme.colors.secondary },
        outline: {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: theme.colors.primary,
        },
        text: { backgroundColor: "transparent" },
        "dashed-outline": {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: theme.colors.primary,
          borderStyle: "dashed",
        },
      },
    },
  },
  title: {
    variants: {
      type: {
        primary: { color: theme.colors.onPrimary },
        secondary: { color: theme.colors.onSecondary },
        text: { color: theme.colors.primary },
        outline: { color: theme.colors.primary },
        "dashed-outline": { color: theme.colors.primary },
      },
    },
  },
  activityIndicator: {
    color: theme.colors.onPrimary,
  },
}));

export default ThemedButton;
