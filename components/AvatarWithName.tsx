import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  ImageStyle,
} from "react-native";
import Avatar from "./Avatar";
import ThemedText from "./ui/ThemedText";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface AvatarWithNameProps {
  /** Image URL for the avatar */
  uri: string;
  /** Size of the avatar */
  size: number;
  /** Name to display */
  name: string;
  /** Overlap margin for the avatar */
  overlap?: number;
  /** Additional styles for the avatar */
  avatarStyle?: StyleProp<ImageStyle>;
  /** Additional styles for the name */
  nameStyle?: StyleProp<TextStyle>;
}

const AvatarWithName: React.FC<AvatarWithNameProps> = ({
  uri,
  size,
  name,
  overlap = 0,
  avatarStyle,
  nameStyle,
}) => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Avatar uri={uri} size={size} overlap={overlap} style={avatarStyle} />
      <ThemedText
        style={[styles.name, nameStyle]}
        numberOfLines={1}
        fontSize="md"
      >
        {name}
      </ThemedText>
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    alignItems: "center", // Center-align avatar and name
    flexDirection: "column", // Stack avatar and name vertically
    margin: theme.margin.md, // Add some spacing
  },
  name: {
    marginTop: theme.margin.md, // Space between avatar and name
  },
}));

export default AvatarWithName;
