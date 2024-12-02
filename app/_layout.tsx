import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import "@/theme/unistyles";
import { useStyles } from "react-native-unistyles";
import { Stack } from "expo-router";

// Import fonts
import * as Font from "expo-font";

// Import translations
import { initI18n } from "@/strings/translations";

const App: React.FC = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { theme } = useStyles();

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "e-Ukraine-Regular": require("../assets/fonts/e-Ukraine-Regular.otf"),
        "e-Ukraine-Bold": require("../assets/fonts/e-Ukraine-Bold.otf"),
        "e-Ukraine-Light": require("../assets/fonts/e-Ukraine-Light.otf"),
        "e-Ukraine-Thin": require("../assets/fonts/e-Ukraine-Thin.otf"),
        "e-Ukraine-Medium": require("../assets/fonts/e-Ukraine-Medium.otf"),
        "e-Ukraine-UltraLight": require("../assets/fonts/e-Ukraine-UltraLight.otf"),
      });
      setFontsLoaded(true);
    }
    initI18n();
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
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
