import { z } from "zod";
import { getStorageData, setStorageData, isWeb } from "./mmkv";
import { storage } from "./mmkv";

const RECENT_GROUPS_KEY = "recent-groups";

/**
 * Zod schema for validating recent groups structure
 * Ensures each recent group has a groupId and groupName
 */
const recentGroupsSchema = z.array(
  z.object({
    groupId: z.string(),
    groupName: z.string(),
  })
);

/** Type derived from the recent groups schema */
export type RecentGroups = z.infer<typeof recentGroupsSchema>;
export type RecentGroup = RecentGroups[number];

/**
 * Retrieves the list of recent groups from storage
 *
 * @returns Promise resolving to an array of recent groups
 * @throws {z.ZodError} If stored data is invalid
 */
export async function getRecentGroups(): Promise<RecentGroup[]> {
  try {
    return getStorageData(
      RECENT_GROUPS_KEY,
      recentGroupsSchema,
      isWeb() ? "localStorage" : "mmkv"
    );
  } catch {
    return [];
  }
}

/**
 * Adds a new recent group to the top of the list
 * Removes duplicate entries if group already exists
 *
 * @param recentGroup - Group to add to recent groups
 */
export async function addRecentGroup(recentGroup: RecentGroup): Promise<void> {
  try {
    const recentGroups = await getRecentGroups();
    const updatedRecentGroups = [
      recentGroup,
      ...recentGroups.filter((group) => group.groupId !== recentGroup.groupId),
    ];
    setStorageData(
      RECENT_GROUPS_KEY,
      updatedRecentGroups,
      isWeb() ? "localStorage" : "mmkv"
    );
  } catch (err) {
    console.error(err);
  }
}

/**
 * Updates an existing recent group's information
 * Moves the updated group to the top of the list
 *
 * @param group - Group with updated information
 */
export async function updateRecentGroup(group: RecentGroup): Promise<void> {
  try {
    const recentGroups = await getRecentGroups();
    const updatedRecentGroups = [
      { groupId: group.groupId, groupName: group.groupName },
      ...recentGroups.filter((g) => g.groupId !== group.groupId),
    ];
    setStorageData(
      RECENT_GROUPS_KEY,
      updateRecentGroup,
      isWeb() ? "localStorage" : "mmkv"
    );
  } catch (err) {
    console.error(err);
  }
}

/**
 * Removes a specific group from recent groups
 *
 * @param groupId - Unique identifier of the group to remove
 */
export async function removeRecentGroup(groupId: string): Promise<void> {
  try {
    const recentGroups = await getRecentGroups();
    const filteredGroups = recentGroups.filter((g) => g.groupId !== groupId);
    setStorageData(
      RECENT_GROUPS_KEY,
      filteredGroups,
      isWeb() ? "localStorage" : "mmkv"
    );
  } catch (err) {
    console.error(err);
  }
}

/**
 * Initializes recent groups with default entries
 * Useful for first-time setup or testing
 */
export async function initRecentGroup(): Promise<void> {
  storage.set(
    RECENT_GROUPS_KEY,
    JSON.stringify([
      { groupId: "KWWAv4lkm3Qf0vkhWtsaB", groupName: "Dawat-e-khas" },
      { groupId: "LTefQYYk-kFrBCpSgdHVo", groupName: "Dawat" },
    ])
  );
}
