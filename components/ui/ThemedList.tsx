import React from "react";
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

/**
 * Props for ThemedList component.
 * @template T - The type of data used in the list.
 */
export interface ThemedListProps<T> {
  /**
   * The array of data items to render in the list.
   */
  data: T[];

  /**
   * A function that renders an item from the data array.
   */
  renderItem:
    | FlatListProps<T>["renderItem"]
    | SectionListProps<T>["renderItem"];

  /**
   * A function that extracts a unique key for each item.
   * Defaults to using the index as the key.
   */
  keyExtractor?: (item: T, index: number) => string;

  /**
   * Component to render at the top of the list.
   */
  ListHeaderComponent?: React.ReactElement | null;

  /**
   * Component to render at the bottom of the list.
   */
  ListFooterComponent?: React.ReactElement | null;

  /**
   * Component to render when the list is empty.
   * Defaults to a simple "No Data Available" text.
   */
  ListEmptyComponent?: React.ReactElement | (() => React.ReactElement);

  /**
   * Custom style for the FlatList.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Custom style for the content container of the FlatList.
   */
  contentContainerStyle?: StyleProp<ViewStyle>;

  /**
   * Type of list to render. Can be "flatlist" or "sectionlist".
   */
  type?: "flatlist" | "sectionlist";
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
  ListEmptyComponent = () => <Text>No Data Available</Text>,
  style = {},
  contentContainerStyle = {},
  type = "flatlist", // Default type is flatlist
}: ThemedListProps<T>) => {
  const { styles } = useStyles(stylesheet);

  const renderFlatList = () => (
    <FlatList
      data={data}
      renderItem={renderItem as FlatListProps<T>["renderItem"]}
      keyExtractor={keyExtractor}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      ListEmptyComponent={ListEmptyComponent}
      style={[styles.list, style]}
      contentContainerStyle={contentContainerStyle}
      ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
    />
  );

  const renderSectionList = () => (
    <SectionList
      sections={data as any} // Assuming data is an array of sections
      renderItem={renderItem as SectionListProps<T>["renderItem"]}
      keyExtractor={keyExtractor}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      ListEmptyComponent={ListEmptyComponent}
      style={[styles.list, style]}
      contentContainerStyle={contentContainerStyle}
      renderSectionHeader={({ section }) => (
        <Text style={styles.sectionHeader}>{section.title}</Text>
      )}
      ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
    />
  );

  return type === "sectionlist" ? renderSectionList() : renderFlatList();
};

const stylesheet = createStyleSheet((theme) => ({
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
