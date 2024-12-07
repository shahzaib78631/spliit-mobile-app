import React from "react";

// Styles
import { createStyleSheet, useStyles } from "react-native-unistyles";

// Components
import ThemedView from "@/components/ui/ThemedView";
import GroupForm from "@/components/form/GroupForm";
import { useGroupForm } from "@/hooks/useGroupForm";

/**
 * Screen for creating a new group
 *
 * @component
 * @returns {React.ReactElement} Renders the group creation form within a themed view
 */
export default function CreateGroupScreen(): React.ReactElement {
  // Hook to handle group saving logic
  const { handleSaveGroup } = useGroupForm({ groupDetails: null });

  return (
    <ThemedView
      title="Create Group"
      scrollable
      statusbarBackgroundColor="surface2"
    >
      <GroupForm groupDetails={null} onSave={handleSaveGroup} />
    </ThemedView>
  );
}
