import { getColorWithAlpha } from "@/utils/colors";
import React, { useMemo, useState } from "react";
import {
  View,
  TextInput,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from "react-native";
import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";
import ThemedText from "./ThemedText";
import { useThemeContext } from "@/context/ThemeContext";
import {
  UnistyleText,
  UnistyleView,
} from "react-native-unistyles/lib/typescript/src/types";

/**
 * Props interface for ThemedTextInput component
 */
interface ThemedTextInputProps extends TextInputProps {
  label?: string;
  isLabelVisible?: boolean;
  containerStyle?: UnistyleView;
  inputStyle?: UnistyleText;
  labelStyle?: UnistyleText;
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
  const { commonStyles, theme } = useThemeContext();
  const [isFocused, setIsFocused] = useState(false);

  styles.useVariants({
    isFocused,
    prepend: !!prepend,
    append: !!append,
  });

  return (
    <View style={[styles.container, containerStyle]}>
      {isLabelVisible && label && (
        <ThemedText fontSize="sm" style={labelStyle}>
          {label}
        </ThemedText>
      )}

      <View style={[styles.inputContainer, commonStyles.gapHorizontalMd]}>
        {prepend && <View style={[commonStyles.center]}>{prepend}</View>}

        <TextInput
          style={[styles.input, commonStyles.flex1, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.onSurface}
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
const styles = StyleSheet.create((theme) => ({
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
    variants: {
      isFocused: {
        true: { borderColor: theme.colors.primary, borderWidth: 1 },
      },
    },
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface2,
    position: "relative",
    variants: {
      prepend: {
        true: {
          paddingHorizontal: theme.padding.none,
        },
      },
      append: {
        true: {
          paddingHorizontal: theme.padding.none,
        },
      },
    },
  },
  input: {
    color: theme.colors.onSurface,
  },
}));

export default ThemedTextInput;
