import React from "react";

// Components
import ThemedView from "@/components/ui/ThemedView";
import ExpenseForm from "@/components/form/ExpenseForm";
import { useAppContext } from "@/context/AppContext";

/**
 * Screen for creating a new expense
 *
 * @component
 * @returns {React.ReactElement} Renders the group creation form within a themed view
 */
export default function CreateExpenseScreen(): React.ReactElement {
  const { activeGroup } = useAppContext();
  const handleSaveExpense = async () => {};

  return (
    <ThemedView
      title={activeGroup?.name}
      scrollable
      statusbarBackgroundColor="surface2"
    >
      <ExpenseForm expense={null} group={activeGroup} />
    </ThemedView>
  );
}
