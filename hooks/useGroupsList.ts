import { getRecentGroups, RecentGroup } from "@/services/recentGroups";
import { GroupList, trpc } from "@/utils/trpc";
import { useCallback, useEffect, useState } from "react";

/**
 * Custom hook for fetching groups list
 *
 * @param params - Configuration for retrieving group stats
 * @returns Groups list data and refetch method
 *
 * @example
 * ```typescript
 * const { recentGroupsList, fetchGroups, recentGroups, refetch } = useGroupsList();
 * ```
 */
export function useGroupsList() {
  /** State to manage recent groups */
  const [recentGroups, setRecentGroups] = useState<RecentGroup[] | null>(null);

  /**
   * Fetch groups list via TRPC query
   */
  const { data, refetch } = trpc.groups.list.useQuery({
    groupIds: recentGroups?.map(({ groupId }) => groupId) ?? [],
  });

  const fetchGroups = useCallback(() => {
    getRecentGroups().then((recentGroups) => {
      setRecentGroups(recentGroups);
      refetch();
    });
  }, [refetch]);

  /**
   * Fetch recent groups on initial render
   */
  useEffect(() => {
    fetchGroups();
  }, [fetchGroups, refetch]);

  /**
   * Return
   */
  return {
    refetch,
    fetchGroups,
    recentGroups,
    recentGroupsList: (data as GroupList) || { groups: [] },
  };
}
