import React from "react";

// Components
import ThemedView from "@/components/ui/ThemedView";
import GroupForm from "@/components/form/GroupForm";

/**
 * Screen for creating a new group
 *
 * @component
 * @returns {React.ReactElement} Renders the group creation form within a themed view
 */
export default function CreateGroupScreen(): React.ReactElement {
  return (
    <ThemedView
      title="Create Group"
      scrollable
      goBackEnabled={false}
      statusbarBackgroundColor="surface2"
    >
      <GroupForm groupDetails={null} isEditing={false} />
    </ThemedView>
  );
}
