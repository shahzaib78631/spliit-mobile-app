import { trpc } from "@/utils/trpc";

interface Params {
  groupId: string;
}

export function useGroupDetails({ groupId }: Params) {
  const { data, refetch } = trpc.groups.get.useQuery({
    groupId: groupId,
  });

  return {
    data: data?.group,
    refetch,
  };
}
