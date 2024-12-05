import { z } from "zod";
import { MMKV } from "react-native-mmkv";
import { Group } from "../utils/trpc";

const storage = new MMKV();

const recentGroupsSchema = z.array(
  z.object({
    groupId: z.string(),
    groupName: z.string(),
  })
);

export type RecentGroup = z.infer<typeof recentGroupsSchema>[number];

const RECENT_GROUPS_KEY = "recent-groups";

export async function getRecentGroups(): Promise<RecentGroup[]> {
  try {
    const raw = storage.getString(RECENT_GROUPS_KEY);
    return recentGroupsSchema.parse(raw ? JSON.parse(raw) : []);
  } catch {
    return [];
  }
}

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

export async function removeRecentGroup(groupId: string): Promise<void> {
  try {
    const recentGroups = await getRecentGroups();
    const filteredGroups = recentGroups.filter((g) => g.groupId !== groupId);
    storage.set(RECENT_GROUPS_KEY, JSON.stringify(filteredGroups));
  } catch (err) {
    console.error(err);
  }
}
