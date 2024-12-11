// app/(top-tabs)/_layout.tsx
import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import ThemedView from "@/components/ui/ThemedView";
import useCommonStyles from "@/theme/styles";
import { useThemeContext } from "@/context/ThemeContext";
import { getString } from "@/strings/translations";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import ThemedText from "@/components/ui/ThemedText";
import { View } from "react-native";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function TabLayout() {
  const { commonStyles, theme } = useThemeContext();

  return (
    <ThemedView
      style={[
        commonStyles.paddingVerticalNone,
        commonStyles.paddingHorizontalNone,
      ]}
      statusbarBackgroundColor="surface2"
    >
      <View
        style={[
          commonStyles.paddingHorizontalXl,
          commonStyles.paddingVerticalSm,
          commonStyles.rowJustifySpaceBetween,
          {
            backgroundColor: theme.colors.surface2,
          },
        ]}
      >
        <ThemedText type="medium" fontSize="xl" color="onPrimaryContainer">
          {getString("screen.groups.title")}
        </ThemedText>
        <View>
          <MaterialIcons
            name="menu"
            color={theme.colors.onPrimaryContainer}
            size={24}
          />
        </View>
      </View>
      <MaterialTopTabs
        screenOptions={{
          sceneStyle: {
            backgroundColor: theme.colors.background,
            paddingVertical: theme.padding.xl,
            paddingHorizontal: theme.padding.lg,
          },
          tabBarStyle: {
            backgroundColor: theme.colors.surface2,
          },
          tabBarLabelStyle: {
            fontFamily: theme.fontFamily.regular,
            fontSize: theme.fontSize.sm,
          },
          tabBarActiveTintColor: theme.colors.secondary,
          tabBarInactiveTintColor: theme.colors.outline,
          tabBarIndicatorStyle: {
            backgroundColor: theme.colors.secondary,
            height: 1,
          },
        }}
      >
        <MaterialTopTabs.Screen
          name="index"
          options={{
            title: getString("common.recent"),
            tabBarIcon: (props) => (
              <AntDesign
                {...props}
                size={16}
                name={`${props.focused ? "clockcircle" : "clockcircleo"}`}
              />
            ),
          }}
        />
        <MaterialTopTabs.Screen
          name="starred"
          options={{
            title: getString("common.starred"),
            tabBarIcon: (props) => (
              <AntDesign
                {...props}
                size={16}
                name={`${props.focused ? "star" : "staro"}`}
              />
            ),
          }}
        />
        <MaterialTopTabs.Screen
          name="archived"
          options={{
            title: getString("common.archived"),
            tabBarIcon: (props) => (
              <MaterialCommunityIcons
                {...props}
                size={16}
                name={`${
                  props.focused
                    ? "inbox-arrow-down"
                    : "inbox-arrow-down-outline"
                }`}
              />
            ),
          }}
        />
      </MaterialTopTabs>
    </ThemedView>
  );
}
