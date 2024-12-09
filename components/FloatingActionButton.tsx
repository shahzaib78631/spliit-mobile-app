import { useThemeContext } from "@/context/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useRef } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Pressable,
  Text,
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
import { createStyleSheet, useStyles } from "react-native-unistyles";
import ThemedText from "./ui/ThemedText";
import AddGroupByUrlSheet from "./sheets/AddGroupByUrlSheet";
import { useRouter } from "expo-router";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SPRING_CONFIG = {
  duration: 1200,
  overshootClamping: true,
  dampingRatio: 0.8,
};

const OFFSET = 60;

interface FloatingActionButtonProps {
  isExpanded: SharedValue<boolean>;
  index: number;
  icon: any;
  onPress: (event: GestureResponderEvent) => void;
}

const FloatingButton = ({
  isExpanded,
  index,
  icon = "link",
  onPress = () => {},
}: FloatingActionButtonProps) => {
  const { theme } = useThemeContext();
  const { styles } = useStyles(stylesheet);

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

  return (
    <AnimatedPressable
      style={[
        animatedStyles,
        styles.shadow,
        styles.button,
        { backgroundColor: theme.colors.secondaryContainer },
      ]}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name={icon}
        size={18}
        color={theme.colors.onSecondaryContainer}
      />
    </AnimatedPressable>
  );
};

export default function FloatingActionButton() {
  const { styles: mainButtonStyles } = useStyles(mainButtonStylesheet);
  const { styles } = useStyles(stylesheet);
  const isExpanded = useSharedValue(false);

  const router = useRouter();

  const addGroupByUrlSheetRef = useRef({
    open: () => {},
    close: () => {},
  });

  const handlePress = () => {
    isExpanded.value = !isExpanded.value;
  };

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

  const backdropStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isExpanded.value ? 0.5 : 0, { duration: 300 }),
      pointerEvents: isExpanded.value ? "auto" : "none",
    };
  });

  const openAddGroupByUrlSheet = () => {
    addGroupByUrlSheetRef.current?.open();
    handlePress();
  };

  const handleCreateGroup = () => {
    handlePress();
    router.push("/create");
  };

  return (
    <>
      <AnimatedPressable
        onPress={() => handlePress()}
        style={[styles.backdrop, backdropStyle]}
      />
      <SafeAreaView>
        <View style={styles.mainContainer}>
          <View style={styles.buttonContainer}>
            <AnimatedPressable
              onPress={handlePress}
              style={[styles.shadow, mainButtonStyles.button]}
            >
              <Animated.Text style={[plusIconStyle, mainButtonStyles.content]}>
                +
              </Animated.Text>
            </AnimatedPressable>
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
        <AddGroupByUrlSheet reference={addGroupByUrlSheetRef} />
      </SafeAreaView>
    </>
  );
}

const mainButtonStylesheet = createStyleSheet((theme) => ({
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

const stylesheet = createStyleSheet((theme) => ({
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
