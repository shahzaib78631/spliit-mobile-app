import React from "react";
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from "react-native";
import ThemedButton from "./ui/ThemedButton";
import { AntDesign } from "@expo/vector-icons";
import Avatar from "./Avatar";
import ThemedText from "./ui/ThemedText";
import { useThemeContext } from "@/context/ThemeContext";

type Avatar = {
  uri?: string;
  name?: string;
  [key: string]: string | undefined;
};

interface StackedAvatarsProps {
  /** Array of avatar image URLs */
  avatars: Avatar[] | undefined;
  /** Array of names corresponding to the avatars */
  names?: string[];
  /** Whether to display names alongside avatars (default: false) */
  showNames?: boolean;
  /** Size of each avatar (default: 50) */
  avatarSize?: number;
  /** Overlap distance between avatars (default: -20) */
  overlap?: number;
  /** Additional styles for the container */
  containerStyle?: StyleProp<ViewStyle>;
  /** Additional styles for individual avatars */
  avatarStyle?: StyleProp<ImageStyle>;
  /** Additional styles for names */
  nameStyle?: StyleProp<TextStyle>;
  /** Callback for when the "add" button is pressed */
  onAddPress?: () => void;
  /** Label text for the add button */
  addLabel?: string;
  /** Key to use for names in the avatar object */
  nameKey?: string;
}

const StackedAvatars: React.FC<StackedAvatarsProps> = ({
  avatars = [],
  showNames = false,
  avatarSize = 50,
  overlap = -20,
  containerStyle,
  avatarStyle,
  nameStyle,
  onAddPress = () => {},
  addLabel,
  nameKey = "name",
}) => {
  const { commonStyles, theme } = useThemeContext();

  return (
    <View
      style={[commonStyles.rowCenter, commonStyles.width100, containerStyle]}
    >
      {avatars.map((avatar, index) => (
        <View key={index} style={[commonStyles.alignCenter]}>
          <Avatar
            uri={avatar?.uri}
            name={avatar?.[nameKey]}
            size={avatarSize}
            overlap={index !== 0 ? overlap : 0}
            style={avatarStyle}
          />
          {showNames && avatar?.[nameKey] && (
            <ThemedText
              style={[
                commonStyles.marginTopMd,
                commonStyles.textCenter,
                { marginLeft: index !== 0 ? overlap : 0 },
                nameStyle,
              ]}
              type="thin"
              fontSize="xs"
            >
              {avatar?.[nameKey]}
            </ThemedText>
          )}
        </View>
      ))}
      {/* Add Button */}
      <View style={commonStyles.alignCenter}>
        <ThemedButton
          borderRadius="full"
          variant="dashed-outline"
          onPress={onAddPress}
          buttonStyle={{
            width: avatarSize,
            height: avatarSize,
            borderRadius: avatarSize / 2,
            marginLeft: overlap,
            padding: theme.padding.none,
            backgroundColor: theme.colors.surface2,
          }}
        >
          <AntDesign size={12} name="plus" color={theme.colors.primary} />
        </ThemedButton>
        {addLabel && (
          <ThemedText
            style={[
              commonStyles.marginTopMd,
              commonStyles.textCenter,
              { marginLeft: overlap },
            ]}
            fontSize="xs"
            color="secondary"
          >
            {addLabel}
          </ThemedText>
        )}
      </View>
    </View>
  );
};

export default StackedAvatars;
