import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import ThemedView from "@/components/ui/ThemedView";
import RecientBillCard from "@/components/cards/RecientBillCard";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { getString } from "@/strings/translations";

// Components
import ThemedText from "@/components/ui/ThemedText";
import ThemedButton from "@/components/ui/ThemedButton";
import StackedAvatars from "@/components/StackedAvatars";
import BalanceCard from "@/components/cards/BalanceCard";
import CreateSplitCard from "@/components/cards/CreateSplitCard";

// Utils
import { trpc } from "@/utils/trpc";
import { getRecentGroups, RecentGroup } from "@/services/recentGroups";
import { RelativePathString, useRouter } from "expo-router";

export default function Home() {
  const { styles } = useStyles(stylesheet);

  const router = useRouter();

  const [recentGroups, setRecentGroups] = useState<RecentGroup[] | null>(null);

  // const { data, refetch } = trpc.groups.list.useQuery({
  //   groupIds: recentGroups?.map(({ groupId }) => groupId) ?? [],
  // });

  const fetchGroups = useCallback(() => {
    getRecentGroups().then((recentGroups: RecentGroup[]) => {
      setRecentGroups(recentGroups);
    });
  }, []);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const dummyData = {
    title: "KFC Cafe",
    group: [
      {
        name: "John Doe",
        avatar: "https://www.tapback.co/api/avatar.webp",
      },
      {
        name: "Jane Doe",
        avatar: "https://www.tapback.co/api/avatar.webp",
      },
      {
        name: "Jack Doe",
        avatar: "https://www.tapback.co/api/avatar.webp",
      },
      {
        name: "Jill Doe",
        avatar: "https://www.tapback.co/api/avatar.webp",
      },
      {
        name: "Jenny Doe",
        avatar: "https://www.tapback.co/api/avatar.webp",
      },
    ],
    friends: [
      {
        name: "John Doe",
        avatar: "https://www.tapback.co/api/avatar.webp",
      },
      {
        name: "Jane Doe",
        avatar: "https://www.tapback.co/api/avatar.webp",
      },
      {
        name: "Jack Doe",
        avatar: "https://www.tapback.co/api/avatar.webp",
      },
      {
        name: "Jenny Doe",
        avatar: "https://www.tapback.co/api/avatar.webp",
      },
    ],
    onSplitBtnPress: () => console.log("Split Bill"),
  };

  const handleNavigation = (screen: RelativePathString) => {
    router.navigate(screen);
  };

  return (
    <ThemedView scrollable contentContainerStyle={styles.container}>
      <CreateSplitCard
        onAddUrlPress={() => console.log("Add URL Press")}
        onCreateGroupPress={() => handleNavigation("./create")}
      />
      {recentGroups && recentGroups?.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <ThemedText type="regular" fontSize="lg">
                {getString("groups.recent")}
              </ThemedText>
            </View>
            <View>
              <ThemedButton variant="text" buttonStyle={styles.seeMoreBtn}>
                <ThemedText fontSize="xs" color="secondary">
                  {getString("common.see_more")}
                </ThemedText>
              </ThemedButton>
            </View>
          </View>

          <RecientBillCard
            groupId={recentGroups?.[0]?.groupId}
            onSplitBtnPress={() => console.log("Split Bill")}
          />
        </View>
      )}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View>
            <ThemedText type="regular" fontSize="lg">
              {getString("common.friends")}
            </ThemedText>
          </View>
          <View>
            <ThemedButton variant="text" buttonStyle={styles.seeMoreBtn}>
              <ThemedText fontSize="xs" color="secondary">
                {getString("common.see_more")}
              </ThemedText>
            </ThemedButton>
          </View>
        </View>
        <StackedAvatars
          avatarSize={55}
          overlap={16}
          avatars={dummyData.friends}
          showNames
          addLabel={getString("common.add_friend")}
        />
      </View>
    </ThemedView>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    gap: theme.spacing.xl,
  },
  section: {
    gap: theme.spacing.md,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  seeMoreBtn: {
    paddingRight: theme.padding.none,
  },
}));
