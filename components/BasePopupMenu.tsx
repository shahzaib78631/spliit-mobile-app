import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  MenuProvider,
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
  renderers,
  MenuOptionProps,
} from "react-native-popup-menu";
import { createStyleSheet, useStyles } from "react-native-unistyles";

const { Popover } = renderers;

export type BaseMenuOptions = Array<{
  label: string;
  value: string;
  render?: ReactNode;
  handle: Function;
}>;

interface BasePopupMenuProps {
  menuOptions: BaseMenuOptions;
}

const BasePopupMenu: React.FC<BasePopupMenuProps> = ({ menuOptions = [] }) => {
  const { styles, theme } = useStyles(stylesheet);

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

const stylesheet = createStyleSheet((theme) => ({
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
