import React from "react";

// Icons
import { AntDesign } from "@expo/vector-icons";

// Translation
import { getString } from "@/strings/translations";
import { ThemedAntDesign } from "@/components/ui/ThemedIcons";
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
