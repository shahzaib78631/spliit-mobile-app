import { MaterialCommunityIcons } from "@expo/vector-icons";
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

interface PopupMenuProps {
  groupId: string;
}

const PopupMenu: React.FC<PopupMenuProps> = ({ groupId }) => {
  const { fetchGroups, archiveGroup, unarchiveGroup, isGroupArchived } =
    useAppContext();

  const { theme } = useThemeContext();

  /** Reference to the shareGroupSheetRef */
  const shareGroupSheetRef = useRef({
    open: () => {},
    close: () => {},
  });

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
      handle: () => shareGroupSheetRef.current.open(),
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
          <MaterialCommunityIcons
            name="archive-outline"
            size={20}
            color={theme.colors.onSurface}
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
          <MaterialCommunityIcons
            name="delete"
            size={20}
            color={theme.colors.danger}
          />
        </View>
      ),
      handle: () => removeRecentGroup(groupId).then(() => fetchGroups()),
    },
  ];

  return (
    <>
      <BasePopupMenu menuOptions={menuOptions} />
      <ShareGroupByUrlSheet groupId={groupId} reference={shareGroupSheetRef} />
    </>
  );
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
