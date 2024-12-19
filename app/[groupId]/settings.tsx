import React from "react";

// Context
import { useAppContext } from "@/context/AppContext";

// Components
import { ThemedActivityIndicator, ThemedView } from "@/components/ui";
import { GroupForm } from "@/components/forms";

/**
 * Group Layout Component
 * Renders group editing form for the active group
 *
 * @component
 * @returns Themed view with group form or loading indicator
 */
const EditGroup: React.FC = () => {
  /** Access active group from context */
  const { activeGroup, activeGroupDetails } = useAppContext();

  /** Show loading indicator if no active group */
  if (!activeGroup) {
    return <ThemedActivityIndicator />;
  }

  return (
    <ThemedView
      scrollEnabled
      statusbarBackgroundColor="surface2"
      title={activeGroup?.name}
    >
      <GroupForm
        participantWithExpenses={activeGroupDetails?.participantsWithExpenses}
        group={activeGroup}
        isEditing={true}
      />
    </ThemedView>
  );
};

export default EditGroup;
