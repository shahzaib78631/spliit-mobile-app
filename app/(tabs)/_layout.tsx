import React from "react";
import { Tabs } from "expo-router";

// Translation
import { getString } from "@/strings/translations";
import CustomTabBar from "@/components/CustomTabbar";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const App: React.FC = () => {
  return (
    <Tabs
      tabBar={(props: BottomTabBarProps) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      backBehavior="history"
    >
      <Tabs.Screen
        name="index"
        options={{
          title: getString("screen.home.title"),
          headerTitle: getString("screen.home.title"),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: getString("screen.history.title"),
          headerTitle: getString("screen.history.title"),
        }}
      />
      <Tabs.Screen
        name="(groups)"
        options={{
          title: getString("screen.groups.title"),
          headerTitle: getString("screen.groups.title"),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: getString("screen.settings.title"),
          headerTitle: getString("screen.settings.title"),
        }}
      />

      {/* <Tabs.Screen
        name="create"
        options={{
          title: getString("screen.create.title"),
          headerTitle: getString("screen.create.title"),
        }}
      /> */}
    </Tabs>
  );
};

export default App;
