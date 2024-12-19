import { trpc } from "@/utils/trpc";

/**
 * Parameters for fetching group
 */
interface Params {
  /** Unique identifier for the group */
  groupId: string;
}

/**
 * Hook to retrieve group detail
 *
 * @param params - Group identification parameters
 * @returns Group details and refetch method
 *
 * @example
 * ```typescript
 * const { data, refetch } = useGroup({ groupId: 'group123' });
 * ```
 */
export function useGroup({ groupId }: Params) {
  /** Fetch group via TRPC query */
  const { data, refetch } = trpc.groups.get.useQuery({
    groupId: groupId,
  });

  /** Return group and refetch method */
  return {
    data: data?.group,
    refetch,
  };
}
