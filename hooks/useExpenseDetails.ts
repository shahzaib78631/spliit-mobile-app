import { ExpenseDetails, trpc } from "@/utils/trpc";

/**
 * Parameters for fetching expense details
 */
interface Params {
  /** Unique identifier for the group */
  groupId: string;
  /** Unique identifier for the expense */
  expenseId: string;
}

/**
 * Hook to retrieve expense details
 *
 * @param params - Expense identification parameters
 * @returns Expense details and refetch method
 *
 * @example
 * ```typescript
 * const { data, refetch } = useExpenseDetails({ expenseId: 'expense123' });
 * ```
 */
export function useExpenseDetails({ expenseId, groupId }: Params) {
  /** Fetch expense details via TRPC query */
  const { data, refetch, isLoading, isFetching, isRefetching } =
    trpc.groups.expenses.get.useQuery({
      groupId: groupId,
      expenseId: expenseId,
    });

  /** Return expense details and refetch method */
  return {
    data: data?.expense,
    refetch,
    isLoading,
    isFetching,
    isRefetching,
  };
}
