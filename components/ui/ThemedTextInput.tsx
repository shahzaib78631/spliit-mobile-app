import { getColorWithAlpha } from "@/utils/colors";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import ThemedText from "./ThemedText";

interface ThemedTextInputProps extends TextInputProps {
  label?: string; // Optional label text
  isLabelVisible?: boolean; // Control whether the label is visible
  containerStyle?: StyleProp<ViewStyle>; // Additional styles for the container
  inputStyle?: StyleProp<TextStyle>; // Additional styles for the TextInput
  labelStyle?: StyleProp<TextStyle>; // Additional styles for the label
  prepend?: React.ReactNode; // Content to be displayed before the TextInput
  append?: React.ReactNode; // Content to be displayed after the TextInput
}

const ThemedTextInput: React.FC<ThemedTextInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  containerStyle,
  inputStyle,
  labelStyle,
  isLabelVisible = true,
  prepend,
  append,
  ...rest
}) => {
  const { styles, theme } = useStyles(stylesheet);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        styles.container,
        containerStyle,
        isFocused && { borderColor: theme.colors.primary, borderWidth: 1 },
      ]}
    >
      {isLabelVisible && label && (
        <ThemedText fontSize="sm" style={[labelStyle]}>
          {label}
        </ThemedText>
      )}

      <View
        style={[
          styles.inputContainer,
          prepend || append ? styles.inputWithAddon : null,
        ]}
      >
        {prepend && <View style={styles.prepend}>{prepend}</View>}

        <TextInput
          style={[styles.input, inputStyle]}
          placeholderTextColor={getColorWithAlpha(theme.colors.onSurface, 0.5)}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest} // Spread remaining TextInputProps
        />
        {append && <View style={styles.append}>{append}</View>}
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    marginVertical: theme.spacing.sm,
    gap: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.primaryOutline,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.padding.lg,
    backgroundColor: theme.colors.surface2,
    paddingVertical: theme.spacing.sm,
    overflow: "hidden",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface2,
    position: "relative",
  },
  inputWithAddon: {
    paddingHorizontal: theme.padding.none, // Avoid padding if prepend/append are present
  },
  input: {
    minHeight: 25,
    flex: 1, // Allow input to take up available space
    color: theme.colors.onSurface,
  },
  prepend: {
    paddingRight: theme.spacing.md,
    justifyContent: "center",
    alignItems: "center",
  },
  append: {
    paddingLeft: theme.spacing.md,
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default ThemedTextInput;
