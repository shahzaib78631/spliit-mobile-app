import React from "react";
import { getString } from "@/strings/translations";
import ParticipantsList from "../lists/ParticipantsList";
import BaseBottomActionSheet from "../base/BaseBottomActionSheet";
import { SheetProps } from "react-native-actions-sheet";
import { View } from "react-native";

const ParticipantsSheet: React.FC<SheetProps<"ParticipantsSheet">> = ({
  payload,
}) => {
  if (!payload) return null;

  const { participants, value, onChange, multiple } = payload;

  return (
    <BaseBottomActionSheet
      snapPoints={[80]}
      title={getString("common.participants")}
    >
      <ParticipantsList
        participants={participants}
        value={value}
        onChange={onChange}
        multiple={multiple}
      />
    </BaseBottomActionSheet>
  );
};

export default ParticipantsSheet;
