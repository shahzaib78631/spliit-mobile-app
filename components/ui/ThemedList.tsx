import React, { useState, useMemo, ReactElement } from "react";
import {
  FlatList,
  SectionList,
  StyleSheet,
  Text,
  View,
  FlatListProps,
  SectionListProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import ThemedListEmptyComponent, {
  ThemedListEmptyComponentProps,
} from "./ThemedListEmptyComponent";
import Searchbar from "../Searchbar";
import { getString } from "@/strings/translations";
import ThemedText from "./ThemedText";

/**
 * Configuration options for search functionality.
 * @template T - The type of data used in the list.
 */
interface SearchConfig<T> {
  /**
   * A function to extract searchable text from an item.
   * @param item - The list item to extract searchable text from.
   * @returns A string representation of the item for searching.
   */
  extractSearchableText: (item: T) => string;

  /**
   * Optional placeholder for the search bar.
   * Defaults to a generic search placeholder if not provided.
   */
  placeholder?: string;
}

/**
 * Props for the ThemedList component.
 * @template T - The type of data used in the list.
 */
export interface ThemedListProps<T> {
  /**
   * The data to be rendered in the list.
   * Can be a flat array or a sections array for SectionList.
   */
  data: T[] | SectionListProps<T>["sections"];

  /**
   * Function to render individual list items.
   */
  renderItem:
    | FlatListProps<T>["renderItem"]
    | SectionListProps<T>["renderItem"];

  /**
   * Custom key extractor function.
   * Defaults to using the index as a key if not provided.
   * @param item - The current item being processed.
   * @param index - The index of the current item.
   * @returns A unique string key for the item.
   */
  keyExtractor?: (item: T, index: number) => string;

  /**
   * Optional header component to be rendered at the top of the list.
   */
  ListHeaderComponent?: ReactElement | null;

  /**
   * Optional footer component to be rendered at the bottom of the list.
   */
  ListFooterComponent?: ReactElement | null;

  /**
   * Custom empty list component.
   * Defaults to ThemedListEmptyComponent if not provided.
   */
  ListEmptyComponent?: ReactElement | (() => ReactElement) | null;

  /**
   * Additional style to be applied to the list container.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Style to be applied to the list's content container.
   */
  contentContainerStyle?: StyleProp<ViewStyle>;

  /**
   * Type of list to render.
   * @default "flatlist"
   */
  type?: "flatlist" | "sectionlist";

  /**
   * Props to customize the empty list component.
   */
  emptyListProps?: ThemedListEmptyComponentProps;

  /**
   * Whether to show vertical scroll indicator.
   */
  showsVerticalScrollIndicator?: boolean;

  /**
   * Number of items to render initially.
   * Useful for performance optimization.
   */
  initialNumToRender?: number;

  /**
   * Enable nested scrolling for the list.
   */
  nestedScrollEnabled?: boolean;

  /**
   * Function to render section headers for SectionList.
   */
  renderSectionHeader?: SectionListProps<T>["renderSectionHeader"];

  /**
   * Enable search functionality for the list.
   * @default false
   */
  searchEnabled?: boolean;

  /**
   * Configuration for search functionality.
   * Required when searchEnabled is true.
   */
  searchConfig?: SearchConfig<T>;
}

/**
 * A flexible, themeable list component for React Native.
 * Supports both FlatList and SectionList with built-in search functionality.
 *
 * @template T - The type of data used in the list.
 * @param props - Configuration props for the list.
 * @returns A rendered list component with optional search.
 *
 * @example
 * // Basic FlatList usage
 * <ThemedList
 *   data={items}
 *   renderItem={({ item }) => <ItemComponent item={item} />}
 * />
 *
 * @example
 * // SectionList with search
 * <ThemedList
 *   type="sectionlist"
 *   data={sectionData}
 *   renderItem={({ item }) => <ItemComponent item={item} />}
 *   searchEnabled
 *   searchConfig={{
 *     extractSearchableText: (item) => item.name,
 *     placeholder: "Search items"
 *   }}
 * />
 */
const ThemedList = <T,>({
  data,
  renderItem,
  keyExtractor = (_, index) => index.toString(),
  ListHeaderComponent = null,
  ListFooterComponent = null,
  ListEmptyComponent = null,
  style = {},
  contentContainerStyle = {},
  type = "flatlist",
  emptyListProps,
  searchEnabled = false,
  searchConfig,
  showsVerticalScrollIndicator,
  ...props
}: ThemedListProps<T>) => {
  const { styles } = useStyles(stylesheet);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!searchEnabled || !searchConfig || !searchQuery.trim()) {
      return data;
    }

    if (Array.isArray(data) && type === "flatlist") {
      return data.filter((item) =>
        searchConfig
          .extractSearchableText(item)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    // If data is sections, filter each section
    return (data as SectionListProps<T>["sections"])
      .map((section) => ({
        ...section,
        data: section.data.filter((item) =>
          searchConfig
            .extractSearchableText(item)
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        ),
      }))
      .filter((section) => section.data.length > 0);
  }, [data, searchEnabled, searchConfig, searchQuery]);

  const renderFlatList = () => (
    <FlatList
      data={filteredData as T[]}
      renderItem={renderItem as FlatListProps<T>["renderItem"]}
      keyExtractor={keyExtractor}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      ListEmptyComponent={
        ListEmptyComponent ? (
          ListEmptyComponent
        ) : (
          <ThemedListEmptyComponent {...emptyListProps} />
        )
      }
      style={[styles.list, style]}
      contentContainerStyle={[{ flexGrow: 1 }, contentContainerStyle]}
      ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      {...props}
    />
  );

  const renderSectionList = () => (
    <SectionList
      sections={filteredData as SectionListProps<T>["sections"]}
      renderItem={renderItem as SectionListProps<T>["renderItem"]}
      keyExtractor={keyExtractor}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      ListEmptyComponent={ListEmptyComponent}
      style={[styles.list, style]}
      contentContainerStyle={[{ flexGrow: 1 }, contentContainerStyle]}
      ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      stickySectionHeadersEnabled
      {...props}
    />
  );

  return (
    <View style={styles.container}>
      {searchEnabled && searchConfig && (
        <Searchbar
          placeholder={searchConfig.placeholder || getString("common.search")}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      )}
      {type === "sectionlist" ? renderSectionList() : renderFlatList()}
    </View>
  );
};

/**
 * StyleSheet for ThemedList component using react-native-unistyles.
 * Creates a theme-aware styling object.
 *
 * @param theme - The current application theme.
 * @returns An object with styles for the list components.
 */
const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    gap: theme.padding.sm,
  },
  list: {
    flex: 1,
  },
  itemSeperator: {
    padding: theme.padding.sm,
  },
}));

export default ThemedList;
