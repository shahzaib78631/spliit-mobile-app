import React from "react";
import { StyleSheet } from "react-native";
import "@/theme/unistyles";
import { Tabs } from "expo-router";

// Icons
import { AntDesign } from "@expo/vector-icons";

// Translation
import { getString } from "@/strings/translations";
import CustomTabBar from "@/components/CustomTabbar";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const App: React.FC = () => {
  return (
    <Tabs
      initialRouteName="index"
      tabBar={(props: BottomTabBarProps) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
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
        name="create"
        options={{
          title: getString("screen.create.title"),
          headerTitle: getString("screen.create.title"),
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: getString("screen.groups.title"),
          headerTitle: getString("screen.groups.title"),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: getString("screen.profile.title"),
          headerTitle: getString("screen.profile.title"),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
