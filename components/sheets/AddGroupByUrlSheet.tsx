import React from "react";
import { getString } from "@/strings/translations";
import BaseBottomSheet from "../base/BaseBottomSheet";
import AddGroupByUrlForm from "../form/AddGroupByUrlForm";
import { Platform } from "react-native";

// Define the prop types for the AddGroupByUrlSheet component
interface AddGroupByUrlSheetProps {
  reference: any;

  /**
   * A callback function to be triggered when the bottom sheet is closed.
   * This is called when the bottom sheet triggers its close action.
   * @default () => {}
   */
  onClose?: () => void;
}

const AddGroupByUrlSheet: React.FC<AddGroupByUrlSheetProps> = ({
  reference,
}) => {
  return (
    <BaseBottomSheet
      height={Platform.OS === "ios" ? 250 : 320}
      reference={reference}
      title={getString("groups.addbyurl.title")}
    >
      <AddGroupByUrlForm />
    </BaseBottomSheet>
  );
};

export default AddGroupByUrlSheet;
