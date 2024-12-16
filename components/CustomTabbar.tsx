import React, { useEffect } from "react";
import { View, TouchableOpacity, Dimensions } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import ThemedText from "./ui/ThemedText";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { getString } from "@/strings/translations";
import { StyleSheet, withUnistyles } from "react-native-unistyles";
import { UnistylesTheme } from "react-native-unistyles/lib/typescript/src/types";
import { ThemedMaterialIcons } from "./ui/ThemedIcons";

const ThemedAnimatedView = withUnistyles(Animated.View);

interface CustomTabBarProps extends BottomTabBarProps {
  theme: UnistylesTheme;
}

/**
 * Custom bottom tab bar component for navigation
 *
 * @component
 * @param {CustomTabBarProps} props - Navigation state and methods
 * @returns {React.ReactElement} Customized bottom tab bar
 */
const CustomTabBar: React.FC<CustomTabBarProps> = ({
  theme,
  state,
  navigation,
}: CustomTabBarProps): React.ReactElement => {
  // Shared value for underline position
  const translateX = useSharedValue(0);

  // Allowed route names
  const allowedRoutes = ["index", "history", "(groups)", "settings"];

  const TAB_WIDTH = Dimensions.get("window").width / allowedRoutes.length;

  // Update translateX when the focused index changes
  useEffect(() => {
    translateX.value = withTiming(TAB_WIDTH * state.index, { duration: 300 });
  }, [state.index]);

  // Animated style for underline
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    width: TAB_WIDTH,
    height: 2,
    top: 0,
    position: "absolute",
    backgroundColor: theme.colors.primary,
  }));

  return (
    <View style={[styles.tabBar]}>
      <ThemedAnimatedView style={animatedStyle} />
      {state.routes
        .filter((route) => allowedRoutes.includes(route.name))
        .map((route, index) => {
          const isFocused = state.index === index;
          const iconSize = 24;

          const renderRouteContent = () => {
            switch (route.name) {
              case "index":
                return (
                  <>
                    <ThemedMaterialIcons
                      name="home"
                      size={iconSize}
                      uniProps={(theme) => ({
                        color: isFocused
                          ? theme.colors.primary
                          : theme.colors.outline,
                      })}
                    />
                    <ThemedText
                      color={isFocused ? "primary" : "outline"}
                      fontSize="xs"
                    >
                      {getString(`screen.home.title`)}
                    </ThemedText>
                  </>
                );
              case "history":
                return (
                  <>
                    <ThemedMaterialIcons
                      name="history"
                      size={iconSize}
                      uniProps={(theme) => ({
                        color: isFocused
                          ? theme.colors.primary
                          : theme.colors.outline,
                      })}
                    />
                    <ThemedText
                      color={isFocused ? "primary" : "outline"}
                      fontSize="xs"
                    >
                      {getString(`screen.history.title`)}
                    </ThemedText>
                  </>
                );
              case "(groups)":
                return (
                  <>
                    <ThemedMaterialIcons
                      name="group"
                      size={iconSize}
                      uniProps={(theme) => ({
                        color: isFocused
                          ? theme.colors.primary
                          : theme.colors.outline,
                      })}
                    />
                    <ThemedText
                      color={isFocused ? "primary" : "outline"}
                      fontSize="xs"
                    >
                      {getString(`screen.groups.title`)}
                    </ThemedText>
                  </>
                );
              case "settings":
                return (
                  <>
                    <ThemedMaterialIcons
                      name="settings"
                      size={iconSize - 4}
                      uniProps={(theme) => ({
                        color: isFocused
                          ? theme.colors.primary
                          : theme.colors.outline,
                      })}
                    />
                    <ThemedText
                      color={isFocused ? "primary" : "outline"}
                      fontSize="xs"
                    >
                      {getString(`screen.settings.title`)}
                    </ThemedText>
                  </>
                );
              default:
                return null;
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              style={[styles.tabButton]}
              onPress={() => navigation.navigate(route.name)}
            >
              <View style={styles.iconContainer}>{renderRouteContent()}</View>
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

export default withUnistyles(CustomTabBar, (theme) => ({
  theme: theme as UnistylesTheme,
}));

/**
 * Stylesheet for CustomTabBar using theme-based styling
 *
 * @param {Object} theme - The current application theme
 * @returns {Object} Styled object for tab bar components
 */
const styles = StyleSheet.create((theme, rt) => ({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 0,
    borderColor: theme.colors.primaryOutline,
    position: "relative",
    backgroundColor: theme.colors.surface2,
    paddingTop: theme.padding.lg,
    paddingBottom: rt.insets.bottom + 5,
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "column",
  },
  iconContainer: {
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing.xs,
  },
  underline: {
    top: 0,
    position: "absolute",
    backgroundColor: theme.colors.primary,
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
