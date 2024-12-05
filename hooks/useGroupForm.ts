import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GroupDetails, trpc } from "@/utils/trpc";
import { groupFormSchema, GroupFormValues } from "spliit-api/src/lib/schemas";
import { addRecentGroup } from "@/services/recentGroups";
import { useRouter } from "expo-router";

interface Params {
  groupDetails?: GroupDetails | null;
}

const defaultValues: GroupFormValues = {
  name: "",
  information: "",
  currency: "",
  participants: [{ name: "John" }, { name: "Jane" }, { name: "Jack" }],
};

export function useGroupForm({ groupDetails }: Params) {
  const router = useRouter();
  const utils = trpc.useUtils();
  const { mutateAsync } = trpc.groups.create.useMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GroupFormValues>({
    defaultValues: groupDetails
      ? {
          name: groupDetails.name,
          information: groupDetails.information ?? "",
          currency: groupDetails.currency,
          participants: groupDetails.participants,
        }
      : defaultValues,
    resolver: zodResolver(groupFormSchema),
  });

  const handleSaveGroup = async (groupFormValues: GroupFormValues) => {
    const { groupId } = await mutateAsync({ groupFormValues });
    await utils.groups.invalidate();
    await addRecentGroup({
      groupId,
      groupName: groupFormValues.name,
    });
    router.back();

    console.log("Saving group", groupFormValues);
  };

  return {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    handleSaveGroup,
  };
}
