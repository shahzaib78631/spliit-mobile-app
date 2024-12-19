import React from "react";

// Components
import { ThemedView } from "@/components/ui";
import { ExpenseForm } from "@/components/forms";
import { useAppContext } from "@/context/AppContext";
import { useGlobalSearchParams } from "expo-router";
import { useGroupExpenses } from "@/hooks/useGroupExpenses";
import { useExpenseDetails } from "@/hooks/useExpenseDetails";
import { ExpenseDetails } from "@/utils/trpc";

/**
 * Screen for creating a new expense
 *
 * @component
 * @returns {React.ReactElement} Renders the group creation form within a themed view
 */
export default function ExpenseInfo(): React.ReactElement {
  const { activeGroup } = useAppContext();

  const { groupId, expenseId } = useGlobalSearchParams<{
    groupId: string;
    expenseId: string;
  }>();

  const { data, isLoading, isFetching, isRefetching } = useExpenseDetails({
    groupId,
    expenseId,
  });

  return (
    <ThemedView
      title={activeGroup?.name}
      scrollEnabled
      statusbarBackgroundColor="surface2"
      loading={isLoading || isFetching || isRefetching}
    >
      {/* Expense form */}
      <ExpenseForm expense={data as ExpenseDetails} group={activeGroup} />
    </ThemedView>
  );
}
