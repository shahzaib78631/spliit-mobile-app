import React, { useRef } from "react";
import { View } from "react-native";
import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";

// Icons
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

// COmponents
import ThemedView from "@/components/ui/ThemedView";
import ThemedText from "@/components/ui/ThemedText";
import ThemedButton from "@/components/ui/ThemedButton";
import FloatingActionButton from "@/components/FloatingActionButton";

// Context
import { useThemeContext } from "@/context/ThemeContext";

// Translation
import { getString } from "@/strings/translations";
import { ThemedMaterialIcons } from "@/components/ui/ThemedIcons";
import { withUnistyles } from "react-native-unistyles";

// Create a typed MaterialTopTabs navigator
const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const ThemedMaterialTopTabs = withUnistyles(MaterialTopTabs, (theme) => ({
  screenOptions: {
    sceneStyle: {
      backgroundColor: theme.colors.background,
      paddingVertical: theme.padding.md,
      paddingHorizontal: theme.padding.lg,
    },
    tabBarStyle: {
      backgroundColor: theme.colors.surface2,
      elevation: 0,
    },
    tabBarLabelStyle: {
      fontFamily: theme.fontFamily.regular,
      fontSize: theme.fontSize.sm,
    },
    tabBarActiveTintColor: theme.colors.primary,
    tabBarInactiveTintColor: theme.colors.outline,
    tabBarIndicatorStyle: {
      backgroundColor: theme.colors.primary,
      height: 2,
    },
  },
}));

export default function TabLayout() {
  // Extract styles and theme context
  const { commonStyles } = useThemeContext();

  /**
   * Reference to the AddGroupByUrlSheet.
   * This allows programmatic control of the sheet's state (open/close).
   */
  const addGroupByUrlSheetRef = useRef<{ open: () => void; close: () => void }>(
    {
      open: () => {},
      close: () => {},
    }
  );

  /**
   * Opens the AddGroupByUrlSheet.
   */
  const openAddGroupByUrlSheet = () => {
    addGroupByUrlSheetRef.current?.open();
  };

  return (
    <ThemedView
      style={{ paddingVertical: 0, paddingHorizontal: 0 }}
      statusbarBackgroundColor="surface2"
    >
      {/* Top Bar */}
      <View
        style={[
          commonStyles.paddingHorizontalXl,
          commonStyles.paddingVerticalSm,
          commonStyles.rowJustifySpaceBetween,
          commonStyles.rowAlignCenter,
          commonStyles.backgroundColor("surface2"),
        ]}
      >
        <ThemedText type="medium" fontSize="xl" color="onPrimaryContainer">
          {getString("screen.groups.title")}
        </ThemedText>
        <View style={[commonStyles.rowAlignCenter]}>
          <ThemedButton variant="text">
            <ThemedMaterialIcons
              name="add"
              color={"onPrimaryContainer"}
              size={24}
            />
          </ThemedButton>
          <ThemedButton
            variant="text"
            style={commonStyles.paddingNone}
            onPress={openAddGroupByUrlSheet}
          >
            <ThemedMaterialIcons
              name="link"
              color="onPrimaryContainer"
              size={24}
            />
          </ThemedButton>
        </View>
      </View>

      {/* Tabs */}
      <ThemedMaterialTopTabs>
        <MaterialTopTabs.Screen
          name="index"
          options={{
            title: getString("common.recent"),
            tabBarIcon: (props) => (
              <AntDesign
                {...props}
                size={16}
                name={`${props.focused ? "clockcircle" : "clockcircleo"}`}
              />
            ),
          }}
        />
        <MaterialTopTabs.Screen
          name="starred"
          options={{
            title: getString("common.starred"),
            tabBarIcon: (props) => (
              <AntDesign
                {...props}
                size={16}
                name={`${props.focused ? "star" : "staro"}`}
              />
            ),
          }}
        />
        <MaterialTopTabs.Screen
          name="archived"
          options={{
            title: getString("common.archived"),
            tabBarIcon: (props) => (
              <MaterialCommunityIcons
                {...props}
                size={16}
                name={`${
                  props.focused
                    ? "inbox-arrow-down"
                    : "inbox-arrow-down-outline"
                }`}
              />
            ),
          }}
        />
      </ThemedMaterialTopTabs>

      {/* AddGroupByUrlSheet and FloatingActionButton */}
      <FloatingActionButton />
    </ThemedView>
  );
}
