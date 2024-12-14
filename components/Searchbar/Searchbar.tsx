import React from "react";
import { TextInputProps, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import ThemedTextInput from "../ui/ThemedTextInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ThemedButton from "../ui/ThemedButton";
import { useThemeContext } from "@/context/ThemeContext";

// Define prop types for the component to make it reusable
interface SearchbarProps extends TextInputProps {}

const Searchbar: React.FC<SearchbarProps> = (props) => {
  // Get the current theme from the context
  const { theme } = useThemeContext();

  return (
    <ThemedTextInput
      containerStyle={styles.container}
      append={
        <ThemedButton
          variant="text"
          buttonStyle={{ padding: theme.padding.none }}
        >
          <MaterialCommunityIcons
            name="magnify"
            size={24}
            color={theme.colors.primary}
          />
        </ThemedButton>
      }
      {...props}
    />
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    maxHeight: 45,
  },
}));

export default Searchbar;
