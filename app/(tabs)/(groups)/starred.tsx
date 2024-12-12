import React from "react";

// Components
import ThemedList from "@/components/ui/ThemedList";
import { useGroupContext } from "@/context/GroupContext";
import GroupListCard from "@/components/cards/GroupListCard";
import { GroupListItem } from "@/utils/trpc";
import { getString } from "@/strings/translations";

/**
 * Screen for creating a new group
 *
 * @component
 * @returns {React.ReactElement} Renders the group creation form within a themed view
 */
export default function Starred(): React.ReactElement {
  const { starredGroups, archivedGroups, recentGroupsList } = useGroupContext();

  const data = recentGroupsList.groups?.filter(
    (group) =>
      starredGroups?.includes(group?.id) && !archivedGroups.includes(group?.id)
  );

  return (
    <>
      <ThemedList
        data={data || []}
        renderItem={({ item }: { item: GroupListItem }) => {
          return <GroupListCard group={item} page="starred" />;
        }}
        keyExtractor={(item) => item.id}
        emptyListProps={{
          title: "Yo~ It's empty here!",
          subtitle: "You haven't starred any groups yet.",
        }}
        searchEnabled
        searchConfig={{
          extractSearchableText: (item) => item.name, // Search by name
          placeholder: getString("groups.searchplaceholder", {
            name: getString("common.starred"),
          }),
        }}
      />
    </>
  );
}
