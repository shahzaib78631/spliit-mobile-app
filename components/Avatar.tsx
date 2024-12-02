import React from "react";
import { Image, ImageStyle, StyleProp, StyleSheet } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface AvatarProps {
  /** Image URL for the avatar */
  uri: string;
  /** Size of the avatar */
  size: number;
  /** Overlap margin for the avatar */
  overlap?: number;
  /** Additional styles for the avatar */
  style?: StyleProp<ImageStyle>;
}

const Avatar: React.FC<AvatarProps> = ({ uri, size, overlap = 0, style }) => {
  const { styles } = useStyles(stylesheet);
  return (
    <Image
      source={{ uri }}
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2, // Circular shape
          marginLeft: overlap, // Overlap margin
        },
        style,
      ]}
    />
  );
};

const stylesheet = createStyleSheet((theme) => ({
  avatar: {
    borderWidth: 1,
    borderColor: theme.colors.outline, // Default outline color
  },
}));

export default Avatar;
