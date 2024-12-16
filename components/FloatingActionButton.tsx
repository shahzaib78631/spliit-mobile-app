import { useThemeContext } from "@/context/ThemeContext";
import React, { useRef } from "react";
import {
  SafeAreaView,
  View,
  Pressable,
  GestureResponderEvent,
} from "react-native";
import Animated, {
  withDelay,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  SharedValue,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import { StyleSheet, withUnistyles } from "react-native-unistyles";
import { UnistylesTheme } from "react-native-unistyles/lib/typescript/src/types";
import ThemedText from "./ui/ThemedText";
import { ThemedMaterialCommunityIcons } from "./ui/ThemedIcons";
import { SheetManager } from "react-native-actions-sheet";

// Create Animated components for Pressable and Text
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedText = withUnistyles(Animated.Text);

// Spring animation configuration
const SPRING_CONFIG = {
  duration: 1200,
  overshootClamping: true,
  dampingRatio: 0.8,
};

// Offset for expanding buttons
const OFFSET = 60;

// Shadow style configuration
const shadow = {
  shadowColor: "#171717",
  shadowOffset: { width: -0.5, height: 3.5 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
};

// Interface for individual floating buttons
interface FloatingActionButtonProps {
  isExpanded: SharedValue<boolean>; // Shared animated value for expansion
  index: number; // Button index for animation delay
  icon: any; // Icon name for the button
  onPress: (event: GestureResponderEvent) => void; // Button click handler
}

/**
 * FloatingButton - Renders an animated floating button.
 */
const FloatingButton = ({
  isExpanded,
  index,
  icon = "link",
  onPress = () => {},
}: FloatingActionButtonProps) => {
  const { commonStyles } = useThemeContext();

  // Animated styles for button movement and scale
  const animatedStyles = useAnimatedStyle(() => {
    const moveValue = isExpanded.value ? OFFSET * index : 0;
    const translateValue = withSpring(-moveValue, SPRING_CONFIG);
    const delay = index * 100;

    const scaleValue = isExpanded.value ? 1 : 0;

    return {
      transform: [
        { translateY: translateValue },
        {
          scale: withDelay(delay, withTiming(scaleValue)),
        },
      ],
    };
  });

  // Default button styling
  const button = {
    width: 40,
    height: 40,
    position: "absolute",
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: -2,
    flexDirection: "row",
  };

  return (
    <AnimatedPressable
      style={[
        animatedStyles,
        shadow,
        button,
        commonStyles.backgroundColor("secondaryContainer"),
      ]}
      onPress={onPress}
    >
      <ThemedMaterialCommunityIcons
        name={icon}
        size={18}
        color="onSecondaryContainer"
      />
    </AnimatedPressable>
  );
};

type Props = {
  theme: UnistylesTheme; // Theme object from Unistyles
};

/**
 * FloatingActionButton - A component with expandable floating action buttons.
 */
function FloatingActionButton({ theme }: Props) {
  const isExpanded = useSharedValue(false); // Tracks the expanded state of buttons

  const router = useRouter();

  // Reference for external group sheet functionality
  const addGroupByUrlSheetRef = useRef({
    open: () => {},
    close: () => {},
  });

  // Toggles button expansion
  const handlePress = () => {
    isExpanded.value = !isExpanded.value;
  };

  // Animated style for the main "+" button
  const plusIconStyle = useAnimatedStyle(() => {
    const moveValue = interpolate(Number(isExpanded.value), [0, 1], [0, 2]);
    const translateValue = withTiming(moveValue);
    const rotateValue = isExpanded.value ? "45deg" : "0deg";

    return {
      transform: [
        { translateX: translateValue },
        { rotate: withTiming(rotateValue) },
      ],
    };
  });

  // Animated style for backdrop
  const backdropStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isExpanded.value ? 0.5 : 0, { duration: 300 }),
      pointerEvents: isExpanded.value ? "auto" : "none",
    };
  });

  // Opens a sheet for adding a group by URL
  const openAddGroupByUrlSheet = () => {
    SheetManager.show("AddGroupByUrlSheet");
    handlePress();
  };

  // Redirects to the group creation screen
  const handleCreateGroup = () => {
    handlePress();
    router.push("/create");
  };

  // Backdrop styling
  const backdrop = {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: theme.colors.background,
    zIndex: 0,
  };

  // Main button styling
  const button = {
    zIndex: 1,
    height: 60,
    width: 60,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: theme.colors.primary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <>
      {/* Backdrop overlay */}
      <AnimatedPressable
        onPress={() => handlePress()}
        style={[backdrop, backdropStyle]}
      />
      <SafeAreaView>
        <View style={styles.mainContainer}>
          <View style={styles.buttonContainer}>
            {/* Main "+" button */}
            <AnimatedPressable onPress={handlePress} style={[shadow, button]}>
              <AnimatedText style={plusIconStyle}>
                <ThemedText fontSize="xxxl" color="onPrimary">
                  +
                </ThemedText>
              </AnimatedText>
            </AnimatedPressable>
            {/* Additional floating buttons */}
            <FloatingButton
              isExpanded={isExpanded}
              index={1}
              icon={"link"}
              onPress={openAddGroupByUrlSheet}
            />
            <FloatingButton
              isExpanded={isExpanded}
              index={2}
              icon={"plus"}
              onPress={handleCreateGroup}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

export default withUnistyles(FloatingActionButton, (theme) => ({
  theme,
}));

// Styles for main button and components
const mainButtonStyles = StyleSheet.create((theme) => ({
  button: {
    zIndex: 1,
    height: 60,
    width: 60,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: theme.colors.primary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    fontSize: theme.fontSize.xxxl,
    color: theme.colors.onPrimary,
  },
}));

const styles = StyleSheet.create((theme) => ({
  mainContainer: {
    position: "relative",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    bottom: theme.spacing.lg,
    right: theme.spacing.lg,
  },
  button: {
    width: 40,
    height: 40,
    position: "absolute",
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: -2,
    flexDirection: "row",
  },
  buttonContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  shadow: {
    shadowColor: "#171717",
    shadowOffset: { width: -0.5, height: 3.5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  content: {
    fontWeight: 500,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    backgroundColor: theme.colors.surfaceReader,
  },
}));
