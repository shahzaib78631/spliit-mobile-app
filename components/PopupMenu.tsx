import React, { useRef } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import BasePopupMenu, { BaseMenuOptions } from "./base/BasePopupMenu";
import ThemedText from "./ui/ThemedText";
import { useRouter } from "expo-router";
import ShareGroupByUrlSheet from "./sheets/ShareGroupUrlSheet";
import { removeRecentGroup } from "@/services/recentGroups";
import { useAppContext } from "@/context/AppContext";
import { getString } from "@/strings/translations";
import { useThemeContext } from "@/context/ThemeContext";
import { SheetManager } from "react-native-actions-sheet";
import { ThemedMaterialCommunityIcons } from "./ui/ThemedIcons";

interface PopupMenuProps {
  groupId: string;
}

const PopupMenu: React.FC<PopupMenuProps> = ({ groupId }) => {
  const { fetchGroups, archiveGroup, unarchiveGroup, isGroupArchived } =
    useAppContext();

  const router = useRouter();

  const archived = isGroupArchived(groupId);

  const menuOptions: BaseMenuOptions = [
    {
      label: "Edit",
      value: "edit",
      render: (
        <View style={styles.customOptionContainer}>
          <ThemedText type="regular" fontSize="md" color="onSurface">
            Edit
          </ThemedText>
          <ThemedMaterialCommunityIcons
            name="pencil-outline"
            size={20}
            uniProps={(theme) => ({
              color: theme.colors.onSurface,
            })}
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
          <ThemedMaterialCommunityIcons
            name="share-variant-outline"
            size={20}
            uniProps={(theme) => ({
              color: theme.colors.onSurface,
            })}
          />
        </View>
      ),
      handle: () =>
        SheetManager.show("ShareGroupByUrlSheet", {
          payload: {
            groupId,
          },
        }),
    },
    {
      label: archived
        ? getString("common.recent")
        : getString("common.archive"),
      value: "archive",
      render: (
        <View style={styles.customOptionContainer}>
          <ThemedText type="regular" fontSize="md" color="onSurface">
            {archived
              ? getString("common.recent")
              : getString("common.archive")}
          </ThemedText>
          <ThemedMaterialCommunityIcons
            name="archive-outline"
            size={20}
            uniProps={(theme) => ({
              color: theme.colors.onSurface,
            })}
          />
        </View>
      ),
      handle: () =>
        archived ? unarchiveGroup(groupId) : archiveGroup(groupId),
    },
    {
      label: "Delete",
      value: "delete",
      render: (
        <View style={styles.customOptionContainer}>
          <ThemedText type="regular" fontSize="md" color="danger">
            Delete
          </ThemedText>
          <ThemedMaterialCommunityIcons
            name="delete"
            size={20}
            uniProps={(theme) => ({
              color: theme.colors.danger,
            })}
          />
        </View>
      ),
      handle: () => removeRecentGroup(groupId).then(() => fetchGroups()),
    },
  ];

  return <BasePopupMenu menuOptions={menuOptions} />;
};

const styles = StyleSheet.create((theme) => ({
  customOptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: 100,
  },
}));

export default PopupMenu;
