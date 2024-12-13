import { Category, trpc } from "@/utils/trpc";

/**
 * Custom hook for fetching categories list
 *
 * @param params - Configuration for retrieving categories
 * @returns Categories list data and refetch method
 *
 * @example
 * ```typescript
 * const { categoriesList, refetch } = useCategoriesList();
 * ```
 */
export function useCategoriesList() {
  /**
   * Fetch categories list via TRPC query
   */
  const { data: categoriesData, refetch } = trpc.categories.list.useQuery();

  /**
   * Return
   */
  return {
    refetch,
    categoriesList: categoriesData?.categories as Category[],
  };
}
