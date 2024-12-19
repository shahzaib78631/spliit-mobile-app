import React from "react";

// Components
import { ThemedView } from "@/components/ui";
import { ExpenseForm } from "@/components/forms";
import { useAppContext } from "@/context/AppContext";
import { useLocalSearchParams } from "expo-router";

/**
 * Screen for creating a new expense
 *
 * @component
 * @returns {React.ReactElement} Renders the group creation form within a themed view
 */
export default function CreateExpenseScreen(): React.ReactElement {
  const { activeGroup } = useAppContext();
  const params = useLocalSearchParams();

  let reimbursementParams = undefined;

  // Check if the expense is a reimbursement
  if (params.isReimbursement) {
    reimbursementParams = {
      title: params.title as string,
      paidBy: params.paidBy as string,
      paidFor: params.paidFor as string,
      amount: Number(params.amount),
    };
  }

  return (
    <ThemedView
      title={activeGroup?.name}
      scrollEnabled
      statusbarBackgroundColor="surface2"
    >
      <ExpenseForm
        isEditing={false}
        expense={null}
        group={activeGroup}
        reimbursementParams={reimbursementParams}
      />
    </ThemedView>
  );
}
