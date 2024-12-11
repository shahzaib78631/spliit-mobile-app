import React from "react";

// Components
import ThemedView from "@/components/ui/ThemedView";
import GroupForm from "@/components/form/GroupForm";
import ThemedList from "@/components/ui/ThemedList";
import { useGroupContext } from "@/context/GroupContext";
import GroupListCard from "@/components/cards/GroupListCard";
import { GroupListItem } from "@/utils/trpc";

/**
 * Screen for creating a new group
 *
 * @component
 * @returns {React.ReactElement} Renders the group creation form within a themed view
 */
export default function Groups(): React.ReactElement {
  const { recentGroupsList, archivedGroups, starredGroups } = useGroupContext();

  const data = recentGroupsList.groups?.filter(
    (group) =>
      !(
        starredGroups?.includes(group?.id) ||
        archivedGroups?.includes(group?.id)
      )
  );

  return (
    <>
      <ThemedList
        data={data || []}
        renderItem={({ item }: { item: GroupListItem }) => {
          return <GroupListCard group={item} />;
        }}
        keyExtractor={(item) => item.id}
      />
    </>
  );
}
