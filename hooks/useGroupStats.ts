import { GroupDetails, trpc } from "@/utils/trpc";

/**
 * Parameters for initializing the group stats hook
 */
interface Params {
  /** Unique identifier for the group */
  groupId: string;
}

/**
 * Custom hook for fetching group statistics
 *
 * @param params - Configuration for retrieving group stats
 * @returns Group statistics data and refetch method
 *
 * @example
 * ```typescript
 * const { data, refetch } = useGroupStats({ groupId: 'group123' });
 * ```
 */
export function useGroupStats({ groupId }: Params) {
  /**
   * Fetch group statistics via TRPC query
   */
  const { data, refetch } = trpc.groups.stats.get.useQuery({
    groupId: groupId,
  });

  /**
   * Return statistics data and refetch method
   */
  return {
    data,
    refetch,
  };
}
