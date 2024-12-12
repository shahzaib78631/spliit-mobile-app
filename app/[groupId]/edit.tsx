import React from "react";

// Styles
import { createStyleSheet, useStyles } from "react-native-unistyles";

// Context
import { useGroupContext } from "@/context/GroupContext";

// Components
import ThemedView from "@/components/ui/ThemedView";
import GroupForm from "@/components/form/GroupForm";
import ThemedActivityIndicator from "@/components/ui/ThemedActivityIndicator";
import { useRouter } from "expo-router";
import ThemedButton from "@/components/ui/ThemedButton";

/**
 * Group Layout Component
 * Renders group editing form for the active group
 *
 * @component
 * @returns Themed view with group form or loading indicator
 */
const EditGroup: React.FC = () => {
  /** Access active group from context */
  const { activeGroup } = useGroupContext();

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

/**
 * Stylesheet for component
 * Currently empty, reserved for future styling
 */
const stylesheet = createStyleSheet((theme) => ({}));

export default EditGroup;
