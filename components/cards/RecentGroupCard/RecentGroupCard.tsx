import React from "react";
import { View, Dimensions, ActivityIndicator } from "react-native";
import Seperator from "@/components/Seperator/Seperator";
import ThemedText from "@/components/ui/ThemedText";
import ThemedButton from "@/components/ui/ThemedButton";
import { StackedAvatars } from "@/components/Avatars";
import { getString } from "@/strings/translations";
import { useGroupStats } from "@/hooks/useGroupStats";
import PopupMenu from "@/components/PopupMenu";
import { formatCurrency } from "@/utils/formatCurrency";
import { StyleSheet } from "react-native-unistyles";
import { BaseCard } from "@/components/base";
import { useGroup } from "@/hooks/useGroup";

const { width } = Dimensions.get("window");

// Define prop types for the component to make it reusable
interface RecentGroupCardProps {
  groupId: string; // Group ID
  onSplitBtnPress: () => void; // Function to handle button press
}

const RecentGroupCard: React.FC<RecentGroupCardProps> = ({
  groupId,
  onSplitBtnPress,
}) => {
  const { data: stats, refetch: refetchStats } = useGroupStats({ groupId });
  const { data: details, refetch: refetchDetails } = useGroup({
    groupId,
  });

  if (!stats && !details) {
    return (
      <View style={[styles.cardContainer, styles.center]}>
        <ActivityIndicator size={"small"} />
      </View>
    );
  }

  return (
    <BaseCard>
      <View style={styles.header}>
        <ThemedText numberOfLines={1} type="medium" style={styles.title}>
          {details?.name}
        </ThemedText>
        <PopupMenu groupId={groupId} />
      </View>
      <Seperator />
      <View style={styles.billSection}>
        <ThemedText type="medium" style={styles.totalText}>
          {getString("stats.totals.groupspendings")}
        </ThemedText>
        <ThemedText numberOfLines={1} type="bold" style={styles.amountText}>
          {`${formatCurrency(details?.currency, stats?.totalGroupSpendings)}`}
        </ThemedText>
      </View>

      <View style={styles.personsContainer}>
        <View style={styles.header}>
          <ThemedText style={styles.subText}>Split with</ThemedText>
          <ThemedText style={styles.subText}>
            {details?.participants?.length}{" "}
            {getString("groupform.participants.title")}
          </ThemedText>
        </View>
        <View style={styles.stackedAvatars}>
          <StackedAvatars
            nameKey="name"
            avatars={details?.participants}
            avatarSize={40}
            overlap={-8}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <ThemedButton
          title={getString("expenses.add")}
          borderRadius="lg"
          fontSize="sm"
          onPress={onSplitBtnPress}
        />
      </View>
    </BaseCard>
  );
};

// Default styles for the RecentGroupCard component
const styles = StyleSheet.create((theme) => ({
  cardContainer: {
    backgroundColor: theme.colors.surface2,
    borderRadius: theme.borderRadius.xxl,
    overflow: "hidden",
    height: 270,
    minWidth: width - theme.padding.lg * 2,
    borderWidth: 1,
    borderColor: theme.colors.primaryOutline,
  },
  contentContainer: {
    flex: 1,
    padding: theme.padding.xl,
    gap: theme.spacing.sm,
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
  billSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  totalText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.onSurface,
  },
  amountText: {
    fontSize: theme.fontSize.xl,
    color: theme.colors.primary,
    textAlign: "right",
  },
  subText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.onSurface,
  },
  shareIconBtn: {
    padding: theme.padding.xs,
    borderRadius: theme.borderRadius.full,
  },
  personsContainer: {
    width: "100%",
    flexDirection: "column",
    gap: theme.spacing.md,
    marginTop: theme.margin.sm,
  },
  stackedAvatars: {
    alignSelf: "flex-end",
  },
  footer: {
    width: "100%",
    marginTop: theme.margin.auto,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default RecentGroupCard;
