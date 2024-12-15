import React from "react";
import { getString } from "@/strings/translations";
import BaseBottomSheet from "../base/BaseBottomSheet";
import AddGroupByUrlForm from "../form/AddGroupByUrlForm";
import { Platform } from "react-native";
import BaseBottomActionSheet from "../base/BaseBottomActionSheet";

const AddGroupByUrlSheet: React.FC = () => {
  return (
    <BaseBottomActionSheet
      snapPoints={[100]}
      title={getString("groups.addbyurl.title")}
    >
      <AddGroupByUrlForm />
    </BaseBottomActionSheet>
  );
};

export default AddGroupByUrlSheet;
