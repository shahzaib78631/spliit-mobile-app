import { TouchableOpacity } from "react-native";
import React, { useMemo } from "react";

// Router
import { router } from "expo-router";

// Context
import { useThemeContext } from "@/context/ThemeContext";

// Translation
import { getString } from "@/strings/translations";

// Icon
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Components
import { ThemedView, ThemedList, ThemedText } from "@/components/ui";
import { ThemedMaterialCommunityIcons } from "@/components/ui/ThemedIcons";

type SettingItem = {
  id: number;
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  navigate: () => void;
};

export default function Profile() {
  const { commonStyles } = useThemeContext();

  const list: SettingItem[] = useMemo(
    () => [
      {
        id: 1,
        label: getString("settings.appearance"),
        icon: "palette-outline",
        navigate: () => router.push("/settings/appearance"),
      },
    ],
    []
  );

  return (
    <ThemedView
      title={getString("settings.title")}
      statusbarBackgroundColor="surface2"
      goBackEnabled={false}
    >
      <ThemedList
        data={list}
        renderItem={({ item }: { item: SettingItem }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={item.navigate}
            style={[commonStyles.rowAlignCenter, commonStyles.gapLg]}
          >
            <ThemedMaterialCommunityIcons
              name={item.icon}
              size={24}
              color="primary"
            />
            <ThemedText fontSize="lg" color="onBackground">
              {item.label}
            </ThemedText>
          </TouchableOpacity>
        )}
      />
    </ThemedView>
  );
}
