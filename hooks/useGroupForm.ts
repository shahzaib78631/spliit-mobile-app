import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Group, GroupDetails, trpc } from "@/utils/trpc";
import { groupFormSchema, GroupFormValues } from "spliit-api/src/lib/schemas";
import { addRecentGroup, updateRecentGroup } from "@/services/recentGroups";
import { useRouter } from "expo-router";

/**
 * Parameters for initializing the group form hook
 * @typeparam Params - Configuration options for the form
 */
interface Params {
  /** Optional existing group details for editing */
  groupDetails?: GroupDetails | null;
}

/**
 * Default initial values for a new group form
 */
const defaultValues: GroupFormValues = {
  name: "",
  information: "",
  currency: "",
  participants: [{ name: "John" }, { name: "Jane" }, { name: "Jack" }],
};

/**
 * Custom hook for managing group creation and update form logic
 *
 * @param params - Configuration for the form
 * @returns Form control, submission handlers, and form state
 *
 * @example
 * ```typescript
 * const { control, errors, isSubmitting, handleSubmit, handleSaveGroup, handleUpdateGroup, } = useGroupForm({});
 * ```
 */
export function useGroupForm({ groupDetails }: Params) {
  const router = useRouter();
  const utils = trpc.useUtils();

  /** Mutation for creating a new group */
  const { mutateAsync: createGroup } = trpc.groups.create.useMutation();

  /** Mutation for updating an existing group */
  const { mutateAsync: updateGroup } = trpc.groups.update.useMutation();

  /**
   * Form controller with dynamic initial values and Zod validation
   */
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GroupFormValues>({
    /**
     * Set initial values based on existing group or defaults
     */
    defaultValues: groupDetails
      ? {
          name: groupDetails.name,
          information: groupDetails.information ?? "",
          currency: groupDetails.currency,
          participants: groupDetails.participants,
        }
      : defaultValues,

    /** Use Zod schema for form validation */
    resolver: zodResolver(groupFormSchema),
  });

  /**
   * Handles creation of a new group
   *
   * @param groupFormValues - Validated form data
   * @throws {Error} If group creation fails
   */
  const handleSaveGroup = async (groupFormValues: GroupFormValues) => {
    const { groupId } = await createGroup({ groupFormValues });
    await utils.groups.invalidate();
    await addRecentGroup({
      groupId,
      groupName: groupFormValues.name,
    });
    router.back();
  };

  /**
   * Handles updating an existing group
   *
   * @param groupId - Unique identifier of the group
   * @param groupFormValues - Updated group form data
   * @throws {Error} If group update fails
   */
  const handleUpdateGroup = async (
    groupId: string,
    groupFormValues: GroupFormValues
  ) => {
    await updateGroup({
      groupId,
      groupFormValues: groupFormValues,
    });
    await updateRecentGroup({
      id: groupId,
      name: groupFormValues.name,
    } as Group);
    await utils.groups.invalidate();
    router.back();
  };

  /**
   * Return form-related methods and state for component use
   */
  return {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    handleSaveGroup,
    handleUpdateGroup,
  };
}
