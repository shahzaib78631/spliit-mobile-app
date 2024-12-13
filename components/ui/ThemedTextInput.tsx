import { getColorWithAlpha } from "@/utils/colors";
import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import ThemedText from "./ThemedText";
import useCommonStyles from "@/theme/styles";
import { useThemeContext } from "@/context/ThemeContext";

/**
 * Props interface for ThemedTextInput component
 */
interface ThemedTextInputProps extends TextInputProps {
  label?: string;
  isLabelVisible?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  prepend?: React.ReactNode;
  append?: React.ReactNode;
}

/**
 * Themed text input component with customizable label and addons
 *
 * @component
 * @param {ThemedTextInputProps} props - Component configuration
 * @returns {React.ReactElement} Styled text input with optional label and addons
 */
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
}: ThemedTextInputProps): React.ReactElement => {
  const { commonStyles } = useThemeContext();
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
          commonStyles.gapHorizontalMd,
          prepend || append ? commonStyles.paddingHorizontalNone : null,
        ]}
      >
        {prepend && <View style={[commonStyles.center]}>{prepend}</View>}

        <TextInput
          style={[styles.input, commonStyles.flex1, inputStyle]}
          placeholderTextColor={getColorWithAlpha(theme.colors.onSurface, 0.5)}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
        {append && <View style={[commonStyles.center]}>{append}</View>}
      </View>
    </View>
  );
};

/**
 * Stylesheet for ThemedTextInput using theme-based styling
 *
 * @param {Object} theme - The current application theme
 * @returns {Object} Styled object for themed text input components
 */
const stylesheet = createStyleSheet((theme) => ({
  container: {
    flexGrow: 1,
    marginVertical: theme.spacing.sm,
    gap: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.primaryOutline,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.padding.lg,
    backgroundColor: theme.colors.surface2,
    paddingVertical: theme.spacing.sm,
    overflow: "hidden",
    height: 48,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface2,
    position: "relative",
  },
  input: {
    color: theme.colors.onSurface,
  },
}));

export default ThemedTextInput;
