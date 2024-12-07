import React from "react";
import { getString } from "@/strings/translations";
import BaseBottomSheet from "../base/BaseBottomSheet";
import { View } from "react-native";
import ThemedText from "../ui/ThemedText";
import ThemedTextInput from "../ui/ThemedTextInput";
import { useThemeContext } from "@/context/ThemeContext";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import ThemedButton from "../ui/ThemedButton";
import { createStyleSheet, useStyles } from "react-native-unistyles";

// Define the prop types for the AddGroupByUrlSheet component
interface ShareGroupByUrlSheetProps {
  /**
   * The ID of the group to share.
   */
  groupId: string;

  /**
   * A reference to the bottom sheet instance.
   */
  reference: any;

  /**
   * A callback function to be triggered when the bottom sheet is closed.
   * This is called when the bottom sheet triggers its close action.
   * @default () => {}
   */
  onClose?: () => void;
}

const ShareGroupByUrlSheet: React.FC<ShareGroupByUrlSheetProps> = ({
  groupId,
  reference,
}) => {
  const { commonStyles, theme } = useThemeContext();
  const { styles } = useStyles(stylesheet);

  return (
    <BaseBottomSheet
      height={320}
      reference={reference}
      title={getString("share.title")}
    >
      <View style={commonStyles.gapMd}>
        <ThemedText type="light" fontSize="md">
          {getString("share.description")}
        </ThemedText>
        <View
          style={[commonStyles.rowAlignCenter, commonStyles.gapHorizontalMd]}
        >
          <ThemedTextInput
            value={`https://spliit.app/groups/${groupId}/expenses?ref=share`}
            prepend={
              <AntDesign
                name="link"
                color={theme.colors.onBackground}
                size={18}
              />
            }
          />
          <View>
            <ThemedButton>
              <MaterialIcons
                name="copy-all"
                color={theme.colors.onPrimary}
                size={18}
              />
            </ThemedButton>
          </View>
        </View>

        <View style={styles.warningContainer}>
          <ThemedText
            type="bold"
            fontSize="lg"
            color="error"
            style={commonStyles.gapMd}
          >
            {getString("share.warning")}
          </ThemedText>
          <ThemedText
            type="light"
            fontSize="md"
            color="onSurface"
            style={commonStyles.gapMd}
          >
            {getString("share.warninghelp")}
          </ThemedText>
        </View>
      </View>
    </BaseBottomSheet>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  warningContainer: {
    borderWidth: 1,
    backgroundColor: theme.colors.overlay,
    borderColor: theme.colors.error,
    padding: theme.padding.md,
    borderRadius: theme.borderRadius.lg,
  },
}));

export default ShareGroupByUrlSheet;
