import React from "react";
import { View } from "react-native";
import { Participant, Participants } from "@/utils/trpc";
import { useThemeContext } from "@/context/ThemeContext";
import ThemedCheckbox from "../ui/ThemedCheckbox";
import ThemedList from "../ui/ThemedList";
import ThemedRadioButton from "../ui/ThemedRadioButton";

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

  const Component = multiple ? ThemedCheckbox : ThemedRadioButton;

  return (
    <View style={{ height: 500 }}>
      <ThemedList
        type="flashlist"
        keyExtractor={({ id }) => String(id)}
        data={participants}
        searchEnabled
        searchConfig={{
          extractSearchableText: (item: Participant) => item.name,
        }}
        estimatedItemSize={41}
        renderItem={({ item }: { item: Participant }) => (
          <Component
            onValueChange={() =>
              onChange(
                item,
                multiple ? value?.includes(item.id) || false : value === item.id
              )
            }
            value={
              multiple ? value?.includes(item.id) || false : value === item.id
            }
            buttonPosition="right"
            label={item.name}
            style={[commonStyles.rowJustifySpaceBetween]}
          />
        )}
      />
    </View>
  );
};

export default ParticipantsList;
