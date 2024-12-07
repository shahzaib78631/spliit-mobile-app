import React, { useEffect } from "react";
import { Stack, useLocalSearchParams } from "expo-router";

// Icons
import { AntDesign } from "@expo/vector-icons";

// Translation
import { useGroupDetails } from "@/hooks/useGroupDetails";
import { useGroupContext } from "@/context/GroupContext";
import { GroupDetails } from "@/utils/trpc";

/**
 * Layout component for group-related screens
 * Manages active group state and defines stack navigation
 *
 * @component
 * @returns {React.ReactElement} Expo router stack with group-specific configuration
 */
const GroupLayout: React.FC = () => {
  // Extract groupId from route parameters
  const { groupId } = useLocalSearchParams<{ groupId: string }>();

  // Fetch group details based on groupId
  const { data } = useGroupDetails({ groupId });

  // Context method to set active group
  const { setActiveGroup } = useGroupContext();

  // Update active group when data changes
  useEffect(() => {
    // Set active group if data matches current groupId, otherwise clear
    if (data?.id === groupId) {
      setActiveGroup(data as GroupDetails);
    } else {
      setActiveGroup(null);
    }
  }, [data, groupId, setActiveGroup]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="edit" />
    </Stack>
  );
};

export default GroupLayout;
