import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import "@/theme/unistyles"; // Global styles import
import { Stack } from "expo-router"; // Navigation stack

// Keyboard provider
import { KeyboardProvider } from "react-native-keyboard-controller";

// Import fonts library
import * as Font from "expo-font";

// Import translations initializer
import { initI18n } from "@/strings/translations";

// React Query and TRPC imports
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import { httpBatchLink } from "@trpc/client";
import SuperJSON from "superjson";
import { MenuProvider } from "react-native-popup-menu";
import { GroupProvider } from "@/context/GroupContext";

const App: React.FC = () => {
  // State for font loading
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Create a single instance of QueryClient and tRPC client
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "https://spliit.app/api/trpc", // tRPC server URL
          transformer: SuperJSON, // SuperJSON for data serialization
        }),
      ],
    })
  );

  // Load custom fonts and initialize translations
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "e-Ukraine-Regular": require("../assets/fonts/e-Ukraine-Regular.otf"),
        "e-Ukraine-Bold": require("../assets/fonts/e-Ukraine-Bold.otf"),
        "e-Ukraine-Light": require("../assets/fonts/e-Ukraine-Light.otf"),
        "e-Ukraine-Thin": require("../assets/fonts/e-Ukraine-Thin.otf"),
        "e-Ukraine-Medium": require("../assets/fonts/e-Ukraine-Medium.otf"),
        "e-Ukraine-UltraLight": require("../assets/fonts/e-Ukraine-UltraLight.otf"),
      });
      setFontsLoaded(true);
    };

    initI18n(); // Initialize i18n translations
    loadFonts(); // Load fonts
  }, []);

  // Display a loading indicator until fonts are loaded
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Main application render
  return (
    <trpc.Provider queryClient={queryClient} client={trpcClient}>
      <QueryClientProvider client={queryClient}>
        <GroupProvider>
          <MenuProvider>
            <KeyboardProvider>
              <Stack
                screenOptions={{
                  headerShown: false, // Hide header globally
                  animation: "slide_from_bottom",
                }}
              >
                {/* Load the main tabs screen */}
                <Stack.Screen name="(tabs)" />
              </Stack>
            </KeyboardProvider>
          </MenuProvider>
        </GroupProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center", // Center loader on the screen
  },
});

export default App;
