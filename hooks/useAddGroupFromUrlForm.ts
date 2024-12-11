import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trpc } from "@/utils/trpc";
import { addRecentGroup } from "@/services/recentGroups";
import { useState } from "react";

/**
 * Schema for validating the group form parameters
 */
export const ParamsSchema = z.object({
  url: z
    .string()
    .url("invalidUrlFormat") // Ensure it's a valid URL
    .refine(
      (url) => {
        const groupId = extractGroupId(url);
        return groupId !== undefined; // If groupId is null, it's invalid
      },
      {
        message: "groupNotFound",
      }
    ),
});

function extractGroupId(urlString: string) {
  try {
    const url = new URL(urlString);
    const [, groupId] = url.pathname.match(/^\/groups\/([^/]*)/) ?? [];
    return groupId;
  } catch {
    return null;
  }
}

export type AddGroupFromUrlFormParams = {
  /** Optional URL for the group to be created or updated */
  url?: string;
};

/**
 * Custom hook for managing group creation and update form logic
 *
 * @param params - Configuration for the form
 * @returns Form control, submission handlers, and form state
 */
export function useAddGroupFromUrlForm({ url }: AddGroupFromUrlFormParams) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const utils = trpc.useUtils();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddGroupFromUrlFormParams>({
    defaultValues: url ? { url } : { url: "" },
    resolver: zodResolver(ParamsSchema),
  });

  const handleAddGroupFromUrl = async (data: AddGroupFromUrlFormParams) => {
    setIsSubmitting(true);
    // Extract group ID from the URL
    const groupId = extractGroupId(data.url ?? "");

    if (groupId) {
      const { group } = await utils.groups.get.fetch({ groupId });
      if (group) {
        await addRecentGroup({
          groupId: group.id,
          groupName: group.name,
        });
      }
    }

    setIsSubmitting(false);
  };

  return {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    handleAddGroupFromUrl,
  };
}
