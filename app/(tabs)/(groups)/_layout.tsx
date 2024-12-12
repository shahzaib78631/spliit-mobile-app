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
import ThemedButton from "@/components/ui/ThemedButton";
import { useRef } from "react";
import AddGroupByUrlSheet from "@/components/sheets/AddGroupByUrlSheet";
import FloatingActionButton from "@/components/FloatingActionButton";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function TabLayout() {
  const { commonStyles, theme } = useThemeContext();

  /** Reference to the AddGroupByUrlSheet */
  const addGroupByUrlSheetRef = useRef({
    open: () => {},
    close: () => {},
  });

  /** Open the AddGroupByUrl sheet */
  const openAddGroupByUrlSheet = () => {
    addGroupByUrlSheetRef.current?.open();
  };

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
          commonStyles.rowAlignCenter,
          {
            backgroundColor: theme.colors.surface2,
          },
        ]}
      >
        <ThemedText type="medium" fontSize="xl" color="onPrimaryContainer">
          {getString("screen.groups.title")}
        </ThemedText>
        <View style={[commonStyles.rowAlignCenter]}>
          <ThemedButton variant="text">
            <MaterialIcons
              name="add"
              color={theme.colors.onPrimaryContainer}
              size={24}
            />
          </ThemedButton>
          <ThemedButton
            variant="text"
            style={[commonStyles.paddingNone]}
            onPress={openAddGroupByUrlSheet}
          >
            <MaterialIcons
              name="link"
              color={theme.colors.onPrimaryContainer}
              size={24}
            />
          </ThemedButton>
        </View>
      </View>
      <MaterialTopTabs
        screenOptions={{
          sceneStyle: {
            backgroundColor: theme.colors.background,
            paddingVertical: theme.padding.md,
            paddingHorizontal: theme.padding.lg,
          },
          tabBarStyle: {
            backgroundColor: theme.colors.surface2,
          },
          tabBarLabelStyle: {
            fontFamily: theme.fontFamily.regular,
            fontSize: theme.fontSize.sm,
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.outline,
          tabBarIndicatorStyle: {
            backgroundColor: theme.colors.primary,
            height: 2,
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
      <AddGroupByUrlSheet reference={addGroupByUrlSheetRef} />
      <FloatingActionButton />
    </ThemedView>
  );
}
