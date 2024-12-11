import { z } from "zod";
import { getStorageData, setStorageData, isWeb } from "./mmkv";

const ARCHIVED_GROUPS_STORAGE_KEY = "archived-groups";

export const archivedGroupsSchema = z.array(z.string());

/**
 * Get the list of archived groups.
 *
 * @returns A list of archived group IDs.
 */
export function getArchivedGroups(): string[] {
  return getStorageData(
    ARCHIVED_GROUPS_STORAGE_KEY,
    archivedGroupsSchema,
    isWeb() ? "localStorage" : "mmkv"
  );
}

/**
 * Archive a group.
 *
 * @param groupId - The group ID to archive.
 */
export function archiveGroup(groupId: string): void {
  const archivedGroups = getArchivedGroups();
  setStorageData(
    ARCHIVED_GROUPS_STORAGE_KEY,
    [...archivedGroups, groupId],
    isWeb() ? "localStorage" : "mmkv"
  );
}

/**
 * Unarchive a group.
 *
 * @param groupId - The group ID to unarchive.
 */
export function unarchiveGroup(groupId: string): void {
  const archivedGroups = getArchivedGroups();
  setStorageData(
    ARCHIVED_GROUPS_STORAGE_KEY,
    archivedGroups.filter((g) => g !== groupId),
    isWeb() ? "localStorage" : "mmkv"
  );
}
