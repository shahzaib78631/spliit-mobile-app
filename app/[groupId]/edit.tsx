import React from "react";

// Styles
import { StyleSheet } from "react-native-unistyles";

// Context
import { useAppContext } from "@/context/AppContext";

// Components
import ThemedView from "@/components/ui/ThemedView";
import GroupForm from "@/components/form/GroupForm";
import ThemedActivityIndicator from "@/components/ui/ThemedActivityIndicator";

/**
 * Group Layout Component
 * Renders group editing form for the active group
 *
 * @component
 * @returns Themed view with group form or loading indicator
 */
const EditGroup: React.FC = () => {
  /** Access active group from context */
  const { activeGroup } = useAppContext();

  /** Show loading indicator if no active group */
  if (!activeGroup) {
    return <ThemedActivityIndicator />;
  }

  return (
    <ThemedView
      scrollable
      statusbarBackgroundColor="surface2"
      title={activeGroup?.name}
    >
      <GroupForm groupDetails={activeGroup} isEditing={true} />
    </ThemedView>
  );
};

export default EditGroup;
