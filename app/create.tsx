import React from "react";

// Components
import { ThemedView } from "@/components/ui";
import { GroupForm } from "@/components/forms";
import { getString } from "@/strings/translations";

/**
 * Screen for creating a new group
 *
 * @component
 * @returns {React.ReactElement} Renders the group creation form within a themed view
 */
function CreateGroupScreen(): React.ReactElement {
  return (
    <ThemedView
      title={getString("groups.create")}
      scrollEnabled
      statusbarBackgroundColor="surface2"
    >
      <GroupForm groupDetails={null} isEditing={false} />
    </ThemedView>
  );
}

export default CreateGroupScreen;
