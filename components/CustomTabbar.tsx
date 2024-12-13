import React, { useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import ThemedText from "./ui/ThemedText";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { getString } from "@/strings/translations";

/**
 * Custom bottom tab bar component for navigation
 *
 * @component
 * @param {BottomTabBarProps} props - Navigation state and methods
 * @returns {React.ReactElement} Customized bottom tab bar
 */
const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  navigation,
}: BottomTabBarProps): React.ReactElement => {
  const { theme, styles } = useStyles(stylesheet);
  const { bottom } = useSafeAreaInsets();

  // Shared value for underline position
  const translateX = useSharedValue(0);

  // Allowed route names
  const allowedRoutes = ["index", "history", "(groups)", "profile"];

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
    backgroundColor: theme.colors.primary,
  }));

  return (
    <View
      style={[
        styles.tabBar,
        { paddingBottom: bottom + 5, paddingTop: theme.padding.lg },
      ]}
    >
      <Animated.View style={[animatedStyle, styles.underline]} />
      {state.routes
        .filter((route) => allowedRoutes.includes(route.name))
        .map((route, index) => {
          const isFocused = state.index === index;
          const iconSize = 20;

          const activeColor = theme.colors.primary;
          const inactiveColor = theme.colors.outline;

          const renderRouteContent = () => {
            switch (route.name) {
              case "index":
                return (
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
                );
              case "history":
                return (
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
                );
              case "(groups)":
                return (
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
                );
              case "profile":
                return (
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

export default CustomTabBar;

/**
 * Stylesheet for CustomTabBar using theme-based styling
 *
 * @param {Object} theme - The current application theme
 * @returns {Object} Styled object for tab bar components
 */
const stylesheet = createStyleSheet((theme) => ({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 0,
    borderColor: theme.colors.primaryOutline,
    backgroundColor: theme.colors.surface2,
    position: "relative",
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
    position: "absolute",
    top: 0,
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
