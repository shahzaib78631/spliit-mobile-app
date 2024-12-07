import { trpc } from "@/utils/trpc";

/**
 * Parameters for fetching group details
 */
interface Params {
  /** Unique identifier for the group */
  groupId: string;
}

/**
 * Hook to retrieve group details
 *
 * @param params - Group identification parameters
 * @returns Group details and refetch method
 *
 * @example
 * ```typescript
 * const { data, refetch } = useGroupDetails({ groupId: 'group123' });
 * ```
 */
export function useGroupDetails({ groupId }: Params) {
  /** Fetch group details via TRPC query */
  const { data, refetch } = trpc.groups.get.useQuery({
    groupId: groupId,
  });

  /** Return group details and refetch method */
  return {
    data: data?.group,
    refetch,
  };
}