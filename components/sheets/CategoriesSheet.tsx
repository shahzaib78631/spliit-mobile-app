import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getString } from "@/strings/translations";
import BaseBottomSheet from "../base/BaseBottomSheet";
import { Platform, SectionList, View } from "react-native";
import { Category } from "@/utils/trpc";
import ThemedText from "../ui/ThemedText";
import { useThemeContext } from "@/context/ThemeContext";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import ThemedCheckbox from "../ui/ThemedCheckbox";
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
  const [displaySectionList, setDisplaySectionList] = useState(false);

  return (
    <BaseBottomSheet
      height={Platform.OS === "ios" ? 500 : 650}
      reference={reference}
      title={getString("categories.title")}
      onOpen={() => setTimeout(() => setDisplaySectionList(true), 300)}
      onClose={() => setDisplaySectionList(false)}
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
