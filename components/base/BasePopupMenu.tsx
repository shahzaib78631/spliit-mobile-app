import React, { ReactNode } from "react";
import { View } from "react-native";
import {
  MenuProvider,
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
  renderers,
  MenuOptionsProps,
} from "react-native-popup-menu";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, withUnistyles } from "react-native-unistyles";
import { useThemeContext } from "@/context/ThemeContext";

const { Popover } = renderers;

// const ThemedMaterialCommunityIcons = withUnistyles(
//   MaterialCommunityIcons,
//   (theme) => ({
//     color: theme.colors.onBackground,
//   })
// );

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
  triggerIconColor?: string;
  menuOptionsCustomStyles?: MenuOptionsProps["customStyles"];
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
  triggerIconColor,
  menuOptionsCustomStyles,
}: BasePopupMenuProps): React.ReactElement => {
  return (
    <Menu renderer={Popover} rendererProps={{ preferredPlacement: "bottom" }}>
      <MenuTrigger>
        <MaterialCommunityIcons
          name="dots-vertical"
          size={24}
          color={triggerIconColor}
        />
      </MenuTrigger>
      <MenuOptions customStyles={menuOptionsCustomStyles}>
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
  divider: {
    marginVertical: 5,
    marginHorizontal: 2,
    borderBottomWidth: 1,
    borderColor: theme.colors.outline,
  },
}));

export default withUnistyles(BasePopupMenu, (theme) => ({
  triggerIconColor: theme.colors.onBackground,
  menuOptionsCustomStyles: {
    optionsContainer: {
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
      backgroundColor: theme.colors.surfaceReader,
    },
  },
}));
