import React from "react";

// Styles
import { createStyleSheet, useStyles } from "react-native-unistyles";

// Context
import { useGroupContext } from "@/context/GroupContext";

// Hooks
import { useGroupForm } from "@/hooks/useGroupForm";

// Components
import ThemedView from "@/components/ui/ThemedView";
import GroupForm from "@/components/form/GroupForm";
import ThemedActivityIndicator from "@/components/ui/ThemedActivityIndicator";
import { GroupFormValues } from "spliit-api/src/lib/schemas";

/**
 * Group Layout Component
 * Renders group editing form for the active group
 *
 * @component
 * @returns Themed view with group form or loading indicator
 */
const GroupLayout: React.FC = () => {
  /** Access active group from context */
  const { activeGroup } = useGroupContext();

  /** Apply component-specific styles */
  const { styles } = useStyles(stylesheet);

  /** Hook for group update functionality */
  const { handleUpdateGroup } = useGroupForm({ groupDetails: activeGroup });

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
      <GroupForm
        groupDetails={activeGroup}
        onSave={(groupDetails: GroupFormValues) =>
          handleUpdateGroup(activeGroup.id, groupDetails)
        }
      />
    </ThemedView>
  );
};

/**
 * Stylesheet for component
 * Currently empty, reserved for future styling
 */
const stylesheet = createStyleSheet((theme) => ({}));

export default GroupLayout;
