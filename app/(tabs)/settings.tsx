import { Text, View } from "react-native";
import React, { useMemo } from "react";
import ThemedView from "@/components/ui/ThemedView";
import { getString } from "@/strings/translations";
import ThemedList from "@/components/ui/ThemedList";
import { useThemeContext } from "@/context/ThemeContext";
import ThemedText from "@/components/ui/ThemedText";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

type SettingItem = {
  id: number;
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
};

export default function Profile() {
  const { commonStyles, theme } = useThemeContext();

  const list: SettingItem[] = useMemo(
    () => [
      {
        id: 1,
        label: getString("settings.appearance"),
        icon: "palette-outline",
      },
    ],
    []
  );

  return (
    <ThemedView
      title={getString("settings.title")}
      statusbarBackgroundColor="surface2"
    >
      <ThemedList
        data={list}
        renderItem={({ item }: { item: SettingItem }) => (
          <View style={[commonStyles.rowAlignCenter, commonStyles.gapLg]}>
            <MaterialCommunityIcons
              name={item.icon}
              size={24}
              color={theme.colors.primary}
            />
            <ThemedText fontSize="lg" color="onBackground">
              {item.label}
            </ThemedText>
          </View>
        )}
      />
    </ThemedView>
  );
}
