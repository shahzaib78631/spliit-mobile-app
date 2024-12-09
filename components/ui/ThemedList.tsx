import React, { useState, useMemo } from "react";
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

/**
 * Props for ThemedList component.
 * @template T - The type of data used in the list.
 */
export interface ThemedListProps<T> {
  data: T[];
  renderItem:
    | FlatListProps<T>["renderItem"]
    | SectionListProps<T>["renderItem"];
  keyExtractor?: (item: T, index: number) => string;
  ListHeaderComponent?: React.ReactElement | null;
  ListFooterComponent?: React.ReactElement | null;
  ListEmptyComponent?: React.ReactElement | (() => React.ReactElement) | null;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  type?: "flatlist" | "sectionlist";
  emptyListProps?: ThemedListEmptyComponentProps;

  /**
   * Enables the search functionality in the list.
   */
  searchEnabled?: boolean;

  /**
   * Configuration for the search, specifying which properties to search on.
   */
  searchConfig?: {
    /**
     * A function to extract searchable text from an item.
     */
    extractSearchableText: (item: T) => string;

    /**
     * Optional placeholder for the search bar.
     */
    placeholder?: string;
  };
}

/**
 * A reusable list component for React Native that supports both FlatList and SectionList.
 * @template T - The type of data used in the list.
 * @param props - The props for the component.
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
}: ThemedListProps<T>) => {
  const { styles } = useStyles(stylesheet);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!searchEnabled || !searchConfig || !searchQuery.trim()) {
      return data;
    }

    return data.filter((item) =>
      searchConfig
        .extractSearchableText(item)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [data, searchEnabled, searchConfig, searchQuery]);

  const renderFlatList = () => (
    <FlatList
      data={filteredData}
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
    />
  );

  const renderSectionList = () => (
    <SectionList
      sections={filteredData as any} // Assuming data is an array of sections
      renderItem={renderItem as SectionListProps<T>["renderItem"]}
      keyExtractor={keyExtractor}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      ListEmptyComponent={ListEmptyComponent}
      style={[styles.list, style]}
      contentContainerStyle={[{ flexGrow: 1 }, contentContainerStyle]}
      renderSectionHeader={({ section }) => (
        <Text style={styles.sectionHeader}>{section.title}</Text>
      )}
      ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
    />
  );

  return (
    <View style={styles.container}>
      {searchEnabled && searchConfig && (
        <Searchbar
          placeholder={searchConfig.placeholder || "Search..."}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      )}
      {type === "sectionlist" ? renderSectionList() : renderFlatList()}
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 18,
  },
  itemSeperator: {
    padding: theme.padding.sm,
  },
}));

export default ThemedList;
