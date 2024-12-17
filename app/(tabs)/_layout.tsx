import React from "react";
import { Tabs } from "expo-router";

// Translation
import { getString } from "@/strings/translations";
import { BottomAppBar } from "@/components/AppBars";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const App: React.FC = () => {
  return (
    <Tabs
      tabBar={(props: BottomTabBarProps) => <BottomAppBar {...props} />}
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
    </Tabs>
  );
};

export default App;
