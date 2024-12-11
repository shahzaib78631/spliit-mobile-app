import { z } from "zod";
import { getStorageData, setStorageData, isWeb } from "./mmkv";

const STARRED_GROUPS_STORAGE_KEY = "starred-groups";

export const starredGroupsSchema = z.array(z.string());

/**
 * Get the list of starred groups.
 * Uses MMKV (React Native) or localStorage (Web) for storage.
 *
 * @returns A list of starred group IDs.
 */
export function getStarredGroups(): string[] {
  return getStorageData(
    STARRED_GROUPS_STORAGE_KEY,
    starredGroupsSchema,
    isWeb() ? "localStorage" : "mmkv"
  );
}

/**
 * Add a group to the starred list.
 *
 * @param groupId - The group ID to star.
 */
export function starGroup(groupId: string): void {
  const starredGroups = getStarredGroups();
  setStorageData(
    STARRED_GROUPS_STORAGE_KEY,
    [...starredGroups, groupId],
    isWeb() ? "localStorage" : "mmkv"
  );
}

/**
 * Remove a group from the starred list.
 *
 * @param groupId - The group ID to unstar.
 */
export function unstarGroup(groupId: string): void {
  const starredGroups = getStarredGroups();
  setStorageData(
    STARRED_GROUPS_STORAGE_KEY,
    starredGroups.filter((g) => g !== groupId),
    isWeb() ? "localStorage" : "mmkv"
  );
}
