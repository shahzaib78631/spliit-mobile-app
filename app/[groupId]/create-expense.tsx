import React from "react";

// Components
import { ThemedView } from "@/components/ui";
import { ExpenseForm } from "@/components/forms";
import { useAppContext } from "@/context/AppContext";

/**
 * Screen for creating a new expense
 *
 * @component
 * @returns {React.ReactElement} Renders the group creation form within a themed view
 */
export default function CreateExpenseScreen(): React.ReactElement {
  const { activeGroup } = useAppContext();

  return (
    <ThemedView
      title={activeGroup?.name}
      scrollEnabled
      statusbarBackgroundColor="surface2"
    >
      <ExpenseForm expense={null} group={activeGroup} />
    </ThemedView>
  );
}
