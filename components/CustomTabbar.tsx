import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Tabs } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

// Translation
import { getString } from "@/strings/translations";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

// Custom TabBar Component
const CustomTabBar = ({
  state,
  descriptors,
  navigation,
  insets,
}: BottomTabBarProps) => {
  const { theme, styles } = useStyles(stylesheet);
  const { bottom } = insets;
  return (
    <View style={[styles.tabBar, { paddingBottom: bottom }]}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const iconSize = 24; // Larger icon for the selected tab

        const activeColor = theme.colors.primary;

        console.log(theme.colors.primary);

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabButton}
            onPress={() => navigation.navigate(route.name)}
          >
            <View style={styles.iconContainer}>
              {/* Render the icon based on the route */}
              {route.name === "index" && (
                <AntDesign
                  name="home"
                  size={iconSize}
                  color={isFocused ? activeColor : "gray"}
                />
              )}
              {route.name === "history" && (
                <AntDesign
                  name="clockcircleo"
                  size={iconSize}
                  color={isFocused ? activeColor : "gray"}
                />
              )}
              {route.name === "create" && (
                <View style={styles.createGroupBtn}>
                  <AntDesign
                    name="plus"
                    size={iconSize}
                    color={theme.colors.inverseOnSurface}
                  />
                </View>
              )}
              {route.name === "groups" && (
                <AntDesign
                  name="team"
                  size={iconSize}
                  color={isFocused ? activeColor : "gray"}
                />
              )}
              {route.name === "profile" && (
                <AntDesign
                  name="user"
                  size={iconSize}
                  color={isFocused ? activeColor : "gray"}
                />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;

const stylesheet = createStyleSheet((theme) => ({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 0,
    borderColor: theme.colors.outline,
    backgroundColor: theme.colors.surface,
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingTop: 10,
  },
  iconContainer: {
    borderRadius: 25, // Optional: makes the icon container circular
    justifyContent: "center",
    alignItems: "center",
  },
  tabLabel: {
    marginTop: 4,
    color: "gray",
  },
  createGroupBtn: {
    backgroundColor: theme.colors.primary,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
}));
