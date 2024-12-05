import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

// Translation
import { getString } from "@/strings/translations";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import ThemedText from "./ui/ThemedText";

// Custom TabBar Component
const CustomTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const { theme, styles } = useStyles(stylesheet);
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.tabBar, { paddingBottom: bottom }]}>
      {state.routes.map((route: any, index: number) => {
        if (
          !["index", "history", "create", "groups", "profile"].includes(
            route.name
          )
        ) {
          return;
        }

        const isFocused = state.index === index;
        const iconSize = 20;

        const activeColor = theme.colors.primary;
        const inactiveColor = theme.colors.outline;

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabButton}
            onPress={() => navigation.navigate(route.name)}
          >
            <View style={styles.iconContainer}>
              {/* Render the icon based on the route */}
              {route.name === "index" && (
                <>
                  <AntDesign
                    name="home"
                    size={iconSize}
                    color={isFocused ? activeColor : inactiveColor}
                  />
                  <ThemedText
                    color={isFocused ? "primary" : "outline"}
                    fontSize="xs"
                  >
                    {getString(`screen.home.title`)}
                  </ThemedText>
                </>
              )}
              {route.name === "history" && (
                <>
                  <AntDesign
                    name="clockcircleo"
                    size={iconSize}
                    color={isFocused ? activeColor : inactiveColor}
                  />
                  <ThemedText
                    color={isFocused ? "primary" : "outline"}
                    fontSize="xs"
                  >
                    {getString(`screen.history.title`)}
                  </ThemedText>
                </>
              )}
              {route.name === "create" && (
                <>
                  <View style={styles.createGroupBtn}>
                    <AntDesign
                      name="plus"
                      size={iconSize}
                      color={theme.colors.inverseOnSurface}
                    />
                  </View>
                </>
              )}
              {route.name === "groups" && (
                <>
                  <AntDesign
                    name="team"
                    size={iconSize}
                    color={isFocused ? activeColor : inactiveColor}
                  />
                  <ThemedText
                    color={isFocused ? "primary" : "outline"}
                    fontSize="xs"
                  >
                    {getString(`screen.groups.title`)}
                  </ThemedText>
                </>
              )}
              {route.name === "profile" && (
                <>
                  <AntDesign
                    name="user"
                    size={iconSize}
                    color={isFocused ? activeColor : inactiveColor}
                  />
                  <ThemedText
                    color={isFocused ? "primary" : "outline"}
                    fontSize="xs"
                  >
                    {getString(`screen.profile.title`)}
                  </ThemedText>
                </>
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
    gap: theme.spacing.xs,
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
