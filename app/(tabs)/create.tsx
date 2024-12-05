import React from "react";

// Styles
import { createStyleSheet, useStyles } from "react-native-unistyles";

// Components
import ThemedView from "@/components/ui/ThemedView";
import GroupForm from "@/components/form/GroupForm";
import { useGroupForm } from "@/hooks/useGroupForm";

export default function CreateGroupScreen() {
  const { styles, theme } = useStyles(stylesheet);

  const { handleSaveGroup } = useGroupForm({ groupDetails: null });

  return (
    <ThemedView
      title="Create Group"
      scrollable
      style={styles.container}
      statusBarHeaderStyle={styles.statusBarHeader}
      contentContainerStyle={styles.contentContainer}
    >
      <GroupForm groupDetails={null} onSave={handleSaveGroup} />
    </ThemedView>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    padding: theme.padding.none,
  },
  contentContainer: {
    gap: theme.spacing.xl,
    paddingVertical: theme.padding.xl,
  },
  statusBarHeader: {
    backgroundColor: theme.colors.surface2,
  },
}));
