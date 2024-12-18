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
import {
  ThemedAntDesign,
  ThemedMaterialIcons,
} from "@/components/ui/ThemedIcons";
import { withUnistyles } from "react-native-unistyles";
import TopAppBar from "@/components/AppBars/TopAppBar/TopAppBar";
import { useAppContext } from "@/context/AppContext";

export default function TabLayout() {
  const { activeGroup, toggleStarActiveGroup, isActiveGroupStarred } =
    useAppContext();

  return (
    <TopAppBar
      title={activeGroup?.name || ""}
      tabBarScrollEnabled
      tabItemWidth={110}
      actions={[
        {
          icon: (
            <ThemedAntDesign
              color="onSurface"
              size={18}
              name={isActiveGroupStarred ? "star" : "staro"}
            />
          ),
          onPress: () => toggleStarActiveGroup(),
        },
        {
          icon: <ThemedAntDesign color="onSurface" size={18} name="link" />,
          onPress: () => console.log("Add member"),
        },
      ]}
      tabs={[
        {
          name: "expenses",
          title: getString("expenses.title"),
          icon: (props) => (
            <AntDesign
              {...props}
              size={16}
              name={`${props.focused ? "clockcircle" : "clockcircleo"}`}
            />
          ),
        },
        {
          name: "balances",
          title: getString("balances.title"),
          icon: (props) => (
            <AntDesign
              {...props}
              size={16}
              name={`${props.focused ? "clockcircle" : "clockcircleo"}`}
            />
          ),
        },
        {
          name: "information",
          title: getString("information.title"),
          icon: (props) => (
            <AntDesign
              {...props}
              size={16}
              name={`${props.focused ? "clockcircle" : "clockcircleo"}`}
            />
          ),
        },
        {
          name: "stats",
          title: getString("stats.title"),
          icon: (props) => (
            <AntDesign
              {...props}
              size={16}
              name={`${props.focused ? "clockcircle" : "clockcircleo"}`}
            />
          ),
        },
        {
          name: "activity",
          title: getString("activity.title"),
          icon: (props) => (
            <AntDesign
              {...props}
              size={16}
              name={`${props.focused ? "clockcircle" : "clockcircleo"}`}
            />
          ),
        },
      ]}
    />
  );
}
