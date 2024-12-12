import React from "react";

// Components
import ThemedList from "@/components/ui/ThemedList";
import { useGroupContext } from "@/context/GroupContext";
import GroupListCard from "@/components/cards/GroupListCard";
import { GroupListItem } from "@/utils/trpc";
import Searchbar from "@/components/Searchbar";
import { getString } from "@/strings/translations";

/**
 * Screen for creating a new group
 *
 * @component
 * @returns {React.ReactElement} Renders the group creation form within a themed view
 */
export default function Starred(): React.ReactElement {
  const { archivedGroups, starredGroups, recentGroupsList } = useGroupContext();

  const data = recentGroupsList.groups?.filter(
    (group) =>
      archivedGroups?.includes(group?.id) && !starredGroups.includes(group?.id)
  );

  return (
    <>
      <ThemedList
        data={data || []}
        renderItem={({ item }: { item: GroupListItem }) => {
          return <GroupListCard group={item} page="archived" />;
        }}
        keyExtractor={(item) => item.id}
        emptyListProps={{
          title: "Yo~ It's empty here!",
          subtitle: "You haven't archived any groups yet.",
        }}
        searchEnabled
        searchConfig={{
          extractSearchableText: (item) => item.name, // Search by name
          placeholder: getString("groups.searchplaceholder", {
            name: getString("common.archived"),
          }),
        }}
      />
    </>
  );
}
