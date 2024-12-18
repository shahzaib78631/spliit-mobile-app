import React, { memo } from "react";
import {
  View,
  TouchableOpacity,
  useWindowDimensions,
  Animated,
} from "react-native";
import color from "color";
import { ThemedMaterialCommunityIcons } from "../ui/ThemedIcons";
import { ThemedText } from "../ui";
import { useThemeContext } from "@/context/ThemeContext";
import { ThemeColors } from "@/theme/types";
import { StyleSheet } from "react-native-unistyles";

interface ThemePickerProps {
  theme: ThemeColors;
  selected: boolean;
  onPress?: () => void; // Optional for flexibility
}

const ThemePicker = ({ theme, selected, onPress }: ThemePickerProps) => {
  const { commonStyles } = useThemeContext();
  const { width } = useWindowDimensions();
  const buttonScale = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={[commonStyles.center, commonStyles.marginRightSm]}>
      <Animated.View
        style={[
          styles.cardContainer,
          {
            backgroundColor: theme?.background,
            borderColor: selected ? theme?.primary : "transparent",
            transform: [{ scale: buttonScale }],
            width: width > 400 ? 95 : 90, // Adjust size for smaller screens
            height: width > 400 ? 140 : 120,
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.flex}
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          accessible
          accessibilityLabel={`Select theme: ${theme?.name}`}
        >
          {selected && (
            <ThemedMaterialCommunityIcons
              name="check"
              color={theme?.onPrimary}
              size={15}
              style={styles.checkIcon}
            />
          )}
          <View style={[styles.topBar, { backgroundColor: theme?.surface }]}>
            <View
              style={[
                styles.topBarAccent,
                { backgroundColor: theme?.onSurface },
              ]}
            />
          </View>
          <View style={styles.content}>
            <View
              style={[
                styles.titleBar,
                { backgroundColor: theme?.onSurfaceVariant },
              ]}
            />
            <View style={styles.row}>
              <View
                style={[
                  styles.rowItemLarge,
                  { backgroundColor: theme?.onSurface },
                ]}
              />
              <View
                style={[
                  styles.rowItemSmall,
                  { backgroundColor: theme?.primary },
                ]}
              />
            </View>
            <View style={styles.row}>
              <View
                style={[
                  styles.rowItemSmall,
                  { backgroundColor: theme?.onSurfaceVariant },
                ]}
              />
              <View
                style={[
                  styles.rowItemSmall,
                  { backgroundColor: theme?.onSurfaceVariant },
                ]}
              />
            </View>
          </View>
          <View
            style={[
              styles.bottomBar,
              {
                backgroundColor: color(theme?.primary).alpha(0.08).string(),
              },
            ]}
          >
            <View style={styles.bottomRow}>
              <View
                style={[
                  styles.dot,
                  { backgroundColor: theme?.onSurface, opacity: 0.54 },
                ]}
              />
              <View style={[styles.dot, { backgroundColor: theme?.primary }]} />
              <View
                style={[
                  styles.dot,
                  { backgroundColor: theme?.onSurface, opacity: 0.54 },
                ]}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
      <ThemedText
        color="onSurfaceVariant"
        fontSize="sm"
        style={[commonStyles.paddingVerticalMd, commonStyles.textCenter]}
      >
        {theme?.name}
      </ThemedText>
    </View>
  );
};

export default memo(ThemePicker);

const styles = StyleSheet.create((theme) => ({
  cardContainer: {
    borderWidth: 3.6,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 1,
  },
  flex: {
    flex: 1,
  },
  checkIcon: {
    position: "absolute",
    top: 5,
    right: 5,
    elevation: 2,
    borderRadius: 50,
    padding: 1.6,
    zIndex: 1,
    backgroundColor: theme?.colors.primary,
  },
  topBar: {
    height: 20,
    elevation: 1,
    justifyContent: "center",
  },
  topBarAccent: {
    width: 44,
    height: 10,
    marginLeft: 8,
    borderRadius: 50,
  },
  content: {
    padding: 8,
  },
  titleBar: {
    height: 18,
    borderRadius: 4,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 4,
  },
  rowItemLarge: {
    height: 10,
    width: 44,
    borderRadius: 50,
  },
  rowItemSmall: {
    height: 10,
    width: 16,
    marginLeft: 4,
    borderRadius: 50,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 24,
    justifyContent: "center",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  dot: {
    height: 12,
    width: 12,
    borderRadius: 50,
  },
}));
