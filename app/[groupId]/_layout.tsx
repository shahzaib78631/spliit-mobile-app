import React, { useEffect } from "react";
import { Stack, useLocalSearchParams } from "expo-router";

// Icons
import { AntDesign } from "@expo/vector-icons";

// Translation
import { useGroupDetails } from "@/hooks/useGroupDetails";
import { useAppContext } from "@/context/AppContext";
import { GroupDetails } from "@/utils/trpc";

/**
 * Props interface for EditGroup component.
 * There are no props passed explicitly to this component.
 */
interface EditGroupProps {}

/**
 * Layout component for the "Edit Group" screen.
 * This component manages the active group state and defines stack navigation for group-related screens.
 * It ensures that the correct group is set as the active group when navigating between group-specific screens.
 *
 * @component
 * @example
 * ```tsx
 * <EditGroup />
 * ```
 * @returns {React.ReactElement} - Expo router stack with group-specific configuration
 */
const EditGroup: React.FC<EditGroupProps> = () => {
  /**
   * Extracts the groupId from the URL's local search parameters.
   * This is useful for dynamically loading group data for each screen.
   * @type {string | undefined}
   */
  const { groupId } = useLocalSearchParams<{ groupId: string }>();

  /**
   * Fetches group details based on the groupId.
   * This hook returns the details of the group if the groupId is valid.
   * @type {GroupDetails | undefined}
   */
  const { data } = useGroupDetails({ groupId });

  /**
   * Context hook to manage the active group state across screens.
   * Provides methods to set and retrieve the currently active group.
   */
  const { setActiveGroup, activeGroup } = useAppContext();

  /**
   * Effect hook that updates the active group whenever group details are fetched
   * and the groupId changes. If the fetched groupId doesn't match the current active group,
   * the active group is reset.
   */
  useEffect(() => {
    // Set the active group if the current groupId matches the fetched data
    if (activeGroup?.id && activeGroup?.id !== groupId) {
      setActiveGroup(null); // Reset active group if IDs don't match
    } else if (data?.id === groupId) {
      setActiveGroup(data as GroupDetails); // Set active group if IDs match
    }
  }, [data, groupId, activeGroup, setActiveGroup]);

  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide header for this layout
      }}
    >
      <Stack.Screen name="edit" />
      <Stack.Screen name="create-expense" />
    </Stack>
  );
};

export default EditGroup;
