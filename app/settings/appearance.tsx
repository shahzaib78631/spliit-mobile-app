import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ui";
import { getString } from "@/strings/translations";

const AppearanceSettings = () => {
  return (
    <ThemedView
      scrollEnabled
      goBackEnabled={true}
      statusbarBackgroundColor="surface2"
      title={getString("settings.appearance")}
    >
      <Text>Appearance</Text>
    </ThemedView>
  );
};

export default AppearanceSettings;

const styles = StyleSheet.create({});
