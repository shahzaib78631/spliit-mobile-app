/**
 * Manages recent groups using MMKV storage in a React Native application
 */
import { z } from "zod";
import { MMKV } from "react-native-mmkv";
import { Group } from "../utils/trpc";

/** MMKV storage instance for persistent key-value storage */
const storage = new MMKV();

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
export type RecentGroup = z.infer<typeof recentGroupsSchema>[number];

/** Storage key for recent groups in MMKV */
const RECENT_GROUPS_KEY = "recent-groups";

/**
 * Retrieves the list of recent groups from storage
 *
 * @returns Promise resolving to an array of recent groups
 * @throws {z.ZodError} If stored data is invalid
 */
export async function getRecentGroups(): Promise<RecentGroup[]> {
  try {
    const raw = storage.getString(RECENT_GROUPS_KEY);
    return recentGroupsSchema.parse(raw ? JSON.parse(raw) : []);
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
    storage.set(RECENT_GROUPS_KEY, JSON.stringify(updatedRecentGroups));
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
export async function updateRecentGroup(group: Group): Promise<void> {
  try {
    const recentGroups = await getRecentGroups();
    const updatedRecentGroups = [
      { groupId: group.id, groupName: group.name },
      ...recentGroups.filter((g) => g.groupId !== group.id),
    ];
    storage.set(RECENT_GROUPS_KEY, JSON.stringify(updatedRecentGroups));
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
    storage.set(RECENT_GROUPS_KEY, JSON.stringify(filteredGroups));
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
