import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BaseCard from "../base/BaseCard";
import ThemedText from "../ui/ThemedText";
import PopupMenu from "../PopupMenu";
import { GroupDetails, GroupListItem } from "@/utils/trpc";
import { useThemeContext } from "@/context/ThemeContext";
import Seperator from "../Seperator";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { formatCurrency } from "@/utils/formatCurrency";
import { getString } from "@/strings/translations";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import useCommonStyles from "@/theme/styles";
import ThemedButton from "../ui/ThemedButton";
import { starGroup } from "@/services/staredGroups";
import { useGroupContext } from "@/context/GroupContext";

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
  const { styles, theme } = useStyles(stylesheet);
  const { commonStyles } = useThemeContext();
  const {
    starGroup,
    unstarGroup,
    isGroupStarred,
    archiveGroup,
    unarchiveGroup,
    isGroupArchived,
  } = useGroupContext();

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
        <ThemedText numberOfLines={1} type="medium" style={styles.title}>
          {group.name}
        </ThemedText>
        <View style={[commonStyles.rowAlignCenter, commonStyles.gapXs]}>
          {(page === "starred" || page === "recent") && (
            <ThemedButton
              variant="text"
              style={commonStyles.paddingXs}
              onPress={handleGroupAction}
            >
              <AntDesign
                name={starred ? "star" : "staro"}
                size={16}
                color={theme.colors.onSurface}
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
                color={theme.colors.onSurface}
              />
            </ThemedButton>
          )}
          <PopupMenu groupId={group.id} />
        </View>
      </View>
      <Seperator margin={theme.margin.xs} />
      <View style={styles.personsContainer}>
        <View style={styles.header}>
          <View style={[commonStyles.rowAlignCenter, commonStyles.gapXs]}>
            <AntDesign name="team" size={14} color={theme.colors.onSurface} />
            <ThemedText style={[styles.subText]}>
              {getGroupParticipants()}
            </ThemedText>
          </View>
          <View style={[commonStyles.rowAlignCenter, commonStyles.gapXs]}>
            <AntDesign
              name="calendar"
              size={14}
              color={theme.colors.onSurface}
            />
            <ThemedText style={[styles.subText]}>{getGroupDate()}</ThemedText>
          </View>
        </View>
      </View>
    </BaseCard>
  );
};

const stylesheet = createStyleSheet((theme) => ({
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
  title: {
    width: "70%",
    fontSize: theme.fontSize.lg,
    color: theme.colors.onSurface,
  },
  subText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.onSurface,
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
