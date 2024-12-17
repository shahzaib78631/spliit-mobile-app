import React, { useRef } from "react";
import { View } from "react-native";

// Styles
import { StyleSheet } from "react-native-unistyles";

// Action Sheet Manager
import { SheetManager } from "react-native-actions-sheet";

// Router
import { useRouter } from "expo-router";

// Services
import { removeRecentGroup } from "@/services/recentGroups";

// Context
import { useAppContext } from "@/context/AppContext";

// Translation
import { getString } from "@/strings/translations";

// Components
import { ThemedText } from "@/components/ui";
import { ThemedMaterialCommunityIcons } from "@/components/ui/ThemedIcons";
import BasePopupMenu, {
  BaseMenuOptions,
} from "@/components/base/BasePopupMenu";

/**
 * PopupMenuProps interface defines the props expected by the PopupMenu component.
 *
 * @property groupId - The ID of the group associated with the popup menu actions.
 */
interface PopupMenuProps {
  groupId: string;
}

/**
 * PopupMenu Component
 * A reusable component to display a popup menu for group-related actions such as edit, share, archive, and delete.
 *
 * @param {PopupMenuProps} props - The props object containing the groupId.
 * @returns JSX.Element
 */
const PopupMenu: React.FC<PopupMenuProps> = ({ groupId }) => {
  // Access app-level state and actions
  const { fetchGroups, archiveGroup, unarchiveGroup, isGroupArchived } =
    useAppContext();

  // Router hook for navigation
  const router = useRouter();

  // Check if the group is currently archived
  const archived = isGroupArchived(groupId);

  /**
   * menuOptions defines the list of menu items and their actions.
   * Each menu item has a label, value, custom render, and an associated handler function.
   */
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
            color="onSurface"
          />
        </View>
      ),
      handle: () => {
        // Navigate to the edit page for the specific group
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
            color="onSurface"
          />
        </View>
      ),
      handle: () =>
        // Show the share sheet for sharing the group by URL
        SheetManager.show("ShareGroupUrlSheet", {
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
            color="onSurface"
          />
        </View>
      ),
      handle: () =>
        // Toggle between archiving and unarchiving the group
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
            color="danger"
          />
        </View>
      ),
      handle: () =>
        // Remove the group from recent groups and refresh the list
        removeRecentGroup(groupId).then(() => fetchGroups()),
    },
  ];

  // Render the BasePopupMenu with the configured options
  return <BasePopupMenu menuOptions={menuOptions} />;
};

/**
 * Styles for the PopupMenu component.
 * Uses a theming system to ensure consistency in the app's design.
 */
const styles = StyleSheet.create((theme) => ({
  customOptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: 100,
  },
}));

export default PopupMenu;
