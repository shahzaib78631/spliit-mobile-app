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
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "@/context/ThemeContext";

/**
 * Root application component
 * Handles global configuration, font loading, and app initialization
 *
 * @component
 * @returns Configured application with all providers
 */
const App: React.FC = () => {
  /** Track font loading state */
  const [fontsLoaded, setFontsLoaded] = useState(false);

  /** Initialize QueryClient and tRPC client */
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

  /** Load custom fonts and initialize translations on mount */
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

  /** Show loading indicator while fonts are loading */
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  /** Render application with all providers */
  return (
    <trpc.Provider queryClient={queryClient} client={trpcClient}>
      <QueryClientProvider client={queryClient}>
        <KeyboardProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider>
              <GroupProvider>
                <MenuProvider>
                  <Stack
                    screenOptions={{
                      headerShown: false, // Hide header globally
                      animation: "slide_from_bottom",
                    }}
                  >
                    {/* Load the main tabs screen */}
                    <Stack.Screen name="(tabs)" />
                  </Stack>
                </MenuProvider>
              </GroupProvider>
            </ThemeProvider>
          </GestureHandlerRootView>
        </KeyboardProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

/** Styles for loading state */
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center", // Center loader on the screen
  },
});

export default App;
