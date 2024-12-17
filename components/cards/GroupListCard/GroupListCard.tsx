import React from "react";
import { View } from "react-native";
import { GroupListItem } from "@/utils/trpc";
import { useThemeContext } from "@/context/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native-unistyles";
import { getString } from "@/strings/translations";

// components
import BaseCard from "@/components/base/BaseCard";
import ThemedText from "@/components/ui/ThemedText";
import PopupMenu from "@/components/PopupMenu";
import Seperator from "@/components/Seperator";
import ThemedButton from "@/components/ui/ThemedButton";
import { useAppContext } from "@/context/AppContext";
import { ThemedAntDesign } from "@/components/ui/ThemedIcons";

interface GroupListCardProps {
  /**
   * The title of the group.
   */
  group: GroupListItem;

  page?: "archived" | "starred" | "recent";
}

const GroupListCard: React.FC<GroupListCardProps> = ({
  group,
  page = "recent",
}) => {
  // Use the useThemeContext hook to get the current theme
  const { theme } = useThemeContext();

  const { commonStyles } = useThemeContext();
  const {
    starGroup,
    unstarGroup,
    isGroupStarred,
    archiveGroup,
    unarchiveGroup,
    isGroupArchived,
  } = useAppContext();

  const getGroupDate = () => {
    return (
      (group?.createdAt &&
        new Date(group.createdAt).toLocaleDateString("en-US", {
          dateStyle: "medium",
        })) ??
      "…"
    );
  };

  const getGroupParticipants = () =>
    `${group?._count.participants || 0} ${getString(
      "groupform.participants.title"
    )}`;

  const starred = isGroupStarred(group?.id);
  const archived = isGroupArchived(group?.id);

  const handleGroupAction = () => {
    if (page === "starred" || page === "recent") {
      starred ? unstarGroup(group.id) : starGroup(group.id);
    } else if (page === "archived") {
      archived ? unarchiveGroup(group.id) : archiveGroup(group.id);
    }
  };

  return (
    <BaseCard>
      <View style={styles.header}>
        <ThemedText
          numberOfLines={1}
          type="medium"
          fontSize="lg"
          color="onSurface"
          style={commonStyles.width70}
        >
          {group.name}
        </ThemedText>
        <View style={[commonStyles.rowAlignCenter, commonStyles.gapXs]}>
          {(page === "starred" || page === "recent") && (
            <ThemedButton
              variant="text"
              style={commonStyles.paddingXs}
              onPress={handleGroupAction}
            >
              <ThemedAntDesign
                name={starred ? "star" : "staro"}
                size={16}
                color="onSurface"
              />
            </ThemedButton>
          )}
          {page === "archived" && (
            <ThemedButton
              variant="text"
              style={commonStyles.paddingXs}
              onPress={handleGroupAction}
            >
              <MaterialCommunityIcons
                name={starred ? "inbox-arrow-down" : "inbox-arrow-down-outline"}
                size={16}
                color="onSurface"
              />
            </ThemedButton>
          )}
          <PopupMenu groupId={group.id} />
        </View>
      </View>
      <Seperator margin={"xs"} />
      <View style={styles.personsContainer}>
        <View style={styles.header}>
          <View style={[commonStyles.rowAlignCenter, commonStyles.gapXs]}>
            <ThemedAntDesign name={"team"} size={14} color="onSurface" />
            <ThemedText fontSize="xs" color="onSurface">
              {getGroupParticipants()}
            </ThemedText>
          </View>
          <View style={[commonStyles.rowAlignCenter, commonStyles.gapXs]}>
            <ThemedAntDesign name={"calendar"} size={14} color="onSurface" />
            <ThemedText fontSize="xs" color="onSurface">
              {getGroupDate()}
            </ThemedText>
          </View>
        </View>
      </View>
    </BaseCard>
  );
};

const styles = StyleSheet.create((theme) => ({
  cardContainer: {
    backgroundColor: theme.colors.surface2,
    borderRadius: theme.borderRadius.xxl,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: theme.colors.primaryOutline,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  personsContainer: {
    width: "100%",
    flexDirection: "column",
    gap: theme.spacing.xs,
  },
  stackedAvatars: {
    alignSelf: "flex-end",
  },
}));

export default GroupListCard;
