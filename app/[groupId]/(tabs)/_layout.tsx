import React from "react";

// Icons
import { AntDesign } from "@expo/vector-icons";

// Translation
import { getString } from "@/strings/translations";
import { ThemedMaterialIcons } from "@/components/ui/ThemedIcons";
import TopAppBar from "@/components/AppBars/TopAppBar/TopAppBar";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "expo-router";

export default function TabLayout() {
  const { activeGroup } = useAppContext();

  const router = useRouter();

  const openGroupSettings = () => {
    if (activeGroup) {
      // Navigate to the settings page for the specific group
      router.push({
        pathname: "/[groupId]/settings",
        params: { groupId: activeGroup.id },
      });
    }
  };

  return (
    <TopAppBar
      title={activeGroup?.name || ""}
      tabBarScrollEnabled
      tabItemWidth={110}
      actions={[
        {
          icon: (
            <ThemedMaterialIcons
              color="secondary"
              size={18}
              name={"settings"}
            />
          ),
          onPress: () => openGroupSettings(),
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
