import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import BasePopupMenu, { BaseMenuOptions } from "./BasePopupMenu";
import ThemedText from "./ui/ThemedText";
import { GroupDetails } from "@/utils/trpc";
import { useRouter } from "expo-router";

interface PopupMenuProps {
  groupId: string;
}

const PopupMenu: React.FC<PopupMenuProps> = ({ groupId }) => {
  const { styles, theme } = useStyles(stylesheet);

  const router = useRouter();

  const menuOptions: BaseMenuOptions = [
    {
      label: "Edit",
      value: "edit",
      render: (
        <View style={styles.customOptionContainer}>
          <ThemedText type="regular" fontSize="md" color="onSurface">
            Edit
          </ThemedText>
          <MaterialCommunityIcons
            name="pencil-outline"
            size={20}
            color={theme.colors.onSurface}
          />
        </View>
      ),
      handle: () => {
        router.push({
          pathname: `/[groupId]/edit`,
          params: { groupId },
        });
      },
    },
    {
      label: "Share",
      value: "share",
      render: (
        <View style={styles.customOptionContainer}>
          <ThemedText type="regular" fontSize="md" color="onSurface">
            Share
          </ThemedText>
          <MaterialCommunityIcons
            name="share-variant-outline"
            size={20}
            color={theme.colors.onSurface}
          />
        </View>
      ),
      handle: () => {},
    },
    {
      label: "Archive",
      value: "archive",
      render: (
        <View style={styles.customOptionContainer}>
          <ThemedText type="regular" fontSize="md" color="onSurface">
            Archive
          </ThemedText>
          <MaterialCommunityIcons
            name="archive-outline"
            size={20}
            color={theme.colors.onSurface}
          />
        </View>
      ),
      handle: () => {},
    },
    {
      label: "Delete",
      value: "delete",
      render: (
        <View style={styles.customOptionContainer}>
          <ThemedText type="regular" fontSize="md" color="danger">
            Delete
          </ThemedText>
          <MaterialCommunityIcons
            name="delete"
            size={20}
            color={theme.colors.danger}
          />
        </View>
      ),
      handle: () => {},
    },
  ];

  return <BasePopupMenu menuOptions={menuOptions} />;
};

const stylesheet = createStyleSheet((theme) => ({
  triggerText: {
    fontSize: 18,
    color: "blue",
  },
  customOptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: 100,
  },
  optionText: {
    fontSize: theme.fontSize.md,
    fontFamily: theme.fontFamily.regular,
  },
  optionsContainer: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
  },
}));

export default PopupMenu;
