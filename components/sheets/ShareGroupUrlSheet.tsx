import React from "react";
import { View } from "react-native";

// Translation
import { getString } from "@/strings/translations";

// Bottom Sheet
import BaseBottomSheet from "../base/BaseBottomSheet";

// Components
import ThemedText from "../ui/ThemedText";
import ThemedTextInput from "../ui/ThemedTextInput";
import ThemedButton from "../ui/ThemedButton";

// Context
import { useThemeContext } from "@/context/ThemeContext";

// Icons
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

// Styles
import { createStyleSheet, useStyles } from "react-native-unistyles";

// Clipboard
import * as Clipboard from "expo-clipboard";

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

  const Link = `https://spliit.app/groups/${groupId}/expenses?ref=share`;

  // Function to copy the group link to the clipboard
  const copyGroupLink = () => {
    // Copy the group link to the clipboard
    Clipboard.setUrlAsync(Link);
  };

  return (
    <BaseBottomSheet
      height={320}
      reference={reference}
      title={getString("share.title")}
    >
      <View style={commonStyles.gapVerticalMd}>
        <ThemedText type="light" fontSize="md">
          {getString("share.description")}
        </ThemedText>
        <View
          style={[commonStyles.rowAlignCenter, commonStyles.gapHorizontalMd]}
        >
          <ThemedTextInput
            value={Link}
            editable={false}
            prepend={
              <AntDesign
                name="link"
                color={theme.colors.onBackground}
                size={18}
              />
            }
          />
          <View>
            <ThemedButton onPress={copyGroupLink}>
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
    gap: theme.spacing.sm,
  },
}));

export default ShareGroupByUrlSheet;
