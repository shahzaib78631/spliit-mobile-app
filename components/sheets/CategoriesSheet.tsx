import React from "react";
import { getString } from "@/strings/translations";
import CategoriesList from "../lists/CategoriesList";
import BaseBottomActionSheet from "../base/BaseBottomActionSheet";
import { SheetProps } from "react-native-actions-sheet";
import { View } from "react-native";

const CategoriesSheet: React.FC<SheetProps<"CategoriesSheet">> = ({
  payload,
}: SheetProps<"CategoriesSheet">) => {
  if (!payload) return null;

  const { categories, value, onChange } = payload;

  return (
    <BaseBottomActionSheet
      snapPoints={[60]}
      title={getString("categories.title")}
    >
      <CategoriesList
        categories={categories}
        value={value}
        onChange={onChange}
      />
    </BaseBottomActionSheet>
  );
};

export default CategoriesSheet;
