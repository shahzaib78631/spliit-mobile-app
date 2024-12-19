import React from "react";

// Icons
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

// Components
import FloatingActionButton from "@/components/FloatingActionButton";

// Translation
import { getString } from "@/strings/translations";
import TopAppBar from "@/components/AppBars/TopAppBar/TopAppBar";

export default function TabLayout() {
  return (
    <TopAppBar
      title={getString("screen.groups.title")}
      renderFloatingButton={() => <FloatingActionButton />}
      goBackEnabled={false}
      tabs={[
        {
          name: "index",
          title: getString("common.recent"),
          icon: (props) => (
            <AntDesign
              {...props}
              size={16}
              name={`${props.focused ? "clockcircle" : "clockcircleo"}`}
            />
          ),
        },
        {
          name: "starred",
          title: getString("common.starred"),
          icon: (props) => (
            <AntDesign
              {...props}
              size={16}
              name={`${props.focused ? "star" : "staro"}`}
            />
          ),
        },
        {
          name: "archived",
          title: getString("common.archived"),
          icon: (props) => (
            <MaterialCommunityIcons
              {...props}
              size={16}
              name={`${
                props.focused ? "inbox-arrow-down" : "inbox-arrow-down-outline"
              }`}
            />
          ),
        },
      ]}
    />
  );
}
