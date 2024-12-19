import { getGroupedExpensesByDate } from "@/utils/expenses";
import { trpc } from "@/utils/trpc";
import { match } from "ts-pattern";

/**
 * Parameters for fetching group details
 */
interface Params {
  /** Unique identifier for the group */
  groupId: string;
}

const PAGE_SIZE = 20;

/**
 * Hook to retrieve and manage group expenses.
 *
 * @param params - Group identification parameters.
 * @returns Group expenses, utilities for mutation, and refetching.
 *
 * @example
 * ```typescript
 * const { data, deleteExpense, refetch } = useGroupExpenses({ groupId: 'group123' });
 * ```
 */
export function useGroupExpenses({ groupId }: Params) {
  // Fetch group expenses via TRPC query
  const {
    data: queryData,
    fetchNextPage,
    refetch,
  } = trpc.groups.expenses.list.useInfiniteQuery(
    { groupId, limit: PAGE_SIZE },
    { getNextPageParam: ({ nextCursor }) => nextCursor }
  );

  // Expense deletion mutation
  const { mutateAsync: deleteExpenseAsync } =
    trpc.groups.expenses.delete.useMutation();

  // Extract and flatten expense data from pages
  const expenses = queryData?.pages.flatMap((page) => page.expenses) ?? [];
  const hasMore = queryData?.pages.at(-1)?.hasMore ?? false;

  // Group expenses by date
  const groupedExpenses = getGroupedExpensesByDate(expenses);

  function transformData(data: typeof groupedExpenses) {
    const result = [];

    // Iterate over each time period in the input object
    for (const [timePeriod, entries] of Object.entries(data)) {
      // Add the time period label
      result.push(timePeriod);
      result.push(...entries);
    }

    return result;
  }

  // Map grouped expenses into sections with readable titles
  //   const sections = transformData(groupedExpenses);

  const sections = Object.entries(groupedExpenses).map(([id, expenses]) => ({
    title: id,
    data: expenses,
  }));

  return {
    expenses,
    sections,
    hasMore,
    fetchNextPage,
    deleteExpense: deleteExpenseAsync,
    refetch,
  };
}

/**
 * Map group key to a readable section title.
 *
 * @param key - Group identifier key.
 * @returns Readable title.
 */
function mapGroupKeyToTitle(key: string): string {
  return match(key)
    .with("upcoming", () => "Upcoming")
    .with("thisWeek", () => "This Week")
    .with("earlierThisMonth", () => "Earlier This Month")
    .with("lastMonth", () => "Last Month")
    .with("earlierThisYear", () => "Earlier This Year")
    .with("lastYear", () => "Last Year")
    .with("older", () => "Older")
    .otherwise(() => key);
}
