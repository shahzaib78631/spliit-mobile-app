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

const GroupLayout: React.FC = () => {
  const { activeGroup } = useGroupContext();
  const { styles } = useStyles(stylesheet);
  const { handleSaveGroup } = useGroupForm({ groupDetails: activeGroup });

  if (!activeGroup) {
    return <ThemedActivityIndicator />;
  }

  return (
    <ThemedView
      scrollable
      title={activeGroup?.name}
      statusBarHeaderStyle={styles.statusBarHeader}
      contentContainerStyle={styles.contentContainer}
    >
      <GroupForm groupDetails={activeGroup} onSave={handleSaveGroup} />
    </ThemedView>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  contentContainer: {
    gap: theme.spacing.xl,
    paddingVertical: theme.padding.xl,
  },
  statusBarHeader: {
    backgroundColor: theme.colors.surface2,
  },
}));

export default GroupLayout;
