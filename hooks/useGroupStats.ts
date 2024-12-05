import { GroupDetails, trpc } from "@/utils/trpc";

interface Params {
  groupId: string;
}

export function useGroupStats({ groupId }: Params) {
  const { data, refetch } = trpc.groups.stats.get.useQuery({
    groupId: groupId,
  });

  return {
    data,
    refetch,
  };
}
