import React, { useState } from "react";
import { getString } from "@/strings/translations";
import BaseBottomSheet from "../base/BaseBottomSheet";
import { Platform, View } from "react-native";
import { Participant, Participants } from "@/utils/trpc";
import CategoriesList from "../lists/CategoriesList";
import ParticipantsList from "../lists/ParticipantsList";

// Define the prop types for the ParticipantsSheet component
interface ParticipantsSheetProps {
  reference: any;

  participants: Participants;

  value: Participant["id"] | Participant["id"][] | null;

  multiple?: boolean;

  onChange: (participant: Participant, checked?: boolean) => void;

  /**
   * A callback function to be triggered when the bottom sheet is closed.
   * This is called when the bottom sheet triggers its close action.
   * @default () => {}
   */
  onClose?: () => void;
}

const ParticipantsSheet: React.FC<ParticipantsSheetProps> = ({
  reference,
  participants,
  value,
  multiple,
  onChange,
}) => {
  return (
    <BaseBottomSheet
      height={Platform.OS === "ios" ? 500 : 650}
      reference={reference}
      title={getString("common.participants")}
    >
      <View style={{ height: "88%" }}>
        <ParticipantsList
          participants={participants}
          value={value}
          onChange={onChange}
          multiple={multiple}
        />
      </View>
    </BaseBottomSheet>
  );
};

export default ParticipantsSheet;
