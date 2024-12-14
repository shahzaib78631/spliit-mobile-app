import React from "react";
import { getString } from "@/strings/translations";
import BaseBottomSheet from "../base/BaseBottomSheet";
import { Platform, View } from "react-native";
import { Category } from "@/utils/trpc";
import CategoriesList from "../lists/CategoriesList";

// Define the prop types for the CategoriesSheet component
interface CategoriesSheetProps {
  reference: any;

  categories: Category[];

  value: Category["id"] | null;

  onChange: (category: Category) => void;

  /**
   * A callback function to be triggered when the bottom sheet is closed.
   * This is called when the bottom sheet triggers its close action.
   * @default () => {}
   */
  onClose?: () => void;
}

const CategoriesSheet: React.FC<CategoriesSheetProps> = ({
  reference,
  categories,
  value,
  onChange,
}) => {
  return (
    <BaseBottomSheet
      height={Platform.OS === "ios" ? 500 : 650}
      reference={reference}
      title={getString("categories.title")}
    >
      <View style={{ height: "88%" }}>
        <CategoriesList
          categories={categories}
          value={value}
          onChange={onChange}
        />
      </View>
    </BaseBottomSheet>
  );
};

export default CategoriesSheet;
