import React, { useMemo } from "react";
import { SectionList, View } from "react-native";
import { Category, Participant, Participants } from "@/utils/trpc";
import ThemedText from "../ui/ThemedText";
import { useThemeContext } from "@/context/ThemeContext";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import ThemedCheckbox from "../ui/ThemedCheckbox";
import { FlatList } from "react-native-gesture-handler";
import ThemedList from "../ui/ThemedList";
import { getString } from "@/strings/translations";

// Define the prop types for ParticipantsList
interface ParticipantsListProps {
  participants: Participants;
  value: Participant["id"] | Participant["id"][] | null;
  onChange: (participant: Participant, checked?: boolean) => void;
  multiple?: boolean;
}

const ParticipantsList: React.FC<ParticipantsListProps> = ({
  participants,
  value,
  onChange,
  multiple,
}) => {
  const { commonStyles } = useThemeContext();

  return (
    <View style={{ height: "88%" }}>
      <ThemedList
        keyExtractor={({ id }) => String(id)}
        data={participants}
        searchEnabled
        searchConfig={{
          extractSearchableText: (item: Participant) => item.name,
        }}
        renderItem={({ item }: { item: Participant }) => (
          <ThemedCheckbox
            onValueChange={() =>
              onChange(
                item,
                multiple ? value?.includes(item.id) || false : value === item.id
              )
            }
            value={
              multiple ? value?.includes(item.id) || false : value === item.id
            }
            checkboxPosition="right"
            label={item.name}
            style={[commonStyles.rowJustifySpaceBetween]}
          />
        )}
      />
    </View>
  );
};

export default ParticipantsList;
