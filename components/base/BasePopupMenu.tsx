import React, { ReactNode } from "react";
import { View } from "react-native";
import {
  MenuProvider,
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
  renderers,
} from "react-native-popup-menu";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native-unistyles";
import { useThemeContext } from "@/context/ThemeContext";

const { Popover } = renderers;

/**
 * Base menu option type definition
 */
export type BaseMenuOptions = Array<{
  label: string;
  value: string;
  render?: ReactNode;
  handle: () => void;
}>;

/**
 * Props interface for BasePopupMenu component
 */
interface BasePopupMenuProps {
  menuOptions?: BaseMenuOptions;
}

/**
 * Reusable popup menu component with configurable options
 *
 * @component
 * @param {BasePopupMenuProps} props - Menu configuration options
 * @returns {React.ReactElement} Popup menu with vertical dots trigger
 */
const BasePopupMenu: React.FC<BasePopupMenuProps> = ({
  menuOptions = [],
}: BasePopupMenuProps): React.ReactElement => {
  // Get the theme
  const { theme } = useThemeContext();

  return (
    <Menu renderer={Popover} rendererProps={{ preferredPlacement: "bottom" }}>
      <MenuTrigger>
        <MaterialCommunityIcons
          name="dots-vertical"
          size={24}
          color={theme.colors.onBackground}
        />
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionText: styles.optionText,
          optionsContainer: styles.optionsContainer,
        }}
      >
        {menuOptions.map((option, index) =>
          option.render ? (
            <View key={option.value}>
              {index !== 0 && <View style={styles.divider} />}
              <MenuOption
                onSelect={() => option.handle()}
                children={option.render}
              />
            </View>
          ) : (
            <View key={option.value}>
              {index !== 0 && <View style={styles.divider} />}
              <MenuOption
                onSelect={() => option.handle()}
                text={option.label}
              />
            </View>
          )
        )}
      </MenuOptions>
    </Menu>
  );
};

/**
 * Stylesheet for BasePopupMenu using theme-based styling
 *
 * @param {Object} theme - The current application theme
 * @returns {Object} Styled object for popup menu components
 */
const styles = StyleSheet.create((theme) => ({
  triggerText: {
    fontSize: 18,
    color: "blue",
  },
  customOption: {
    fontSize: 16,
    color: "green",
  },
  optionText: {
    fontSize: theme.fontSize.md,
    fontFamily: theme.fontFamily.regular,
  },
  optionsContainer: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.surfaceReader,
  },
  divider: {
    marginVertical: 5,
    marginHorizontal: 2,
    borderBottomWidth: 1,
    borderColor: theme.colors.outline,
  },
}));

export default BasePopupMenu;
