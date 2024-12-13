import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ThemedView from "@/components/ui/ThemedView";
import RecientGroupCard from "@/components/cards/RecentGroupCard";
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
import {
  getRecentGroups,
  initRecentGroup,
  RecentGroup,
} from "@/services/recentGroups";
import {
  RelativePathString,
  useNavigation,
  usePathname,
  useRouter,
} from "expo-router";
import AddGroupByUrlSheet from "@/components/sheets/AddGroupByUrlSheet";
import { useAppContext } from "@/context/AppContext";

/**
 * Home screen component displaying recent groups, split options, and friends
 *
 * @component
 * @returns Scrollable home screen with various sections
 */
export default function Home() {
  /** Apply component-specific styles */
  const { styles } = useStyles(stylesheet);

  /** Navigation and routing hooks */
  const router = useRouter();

  const { recentGroups } = useAppContext();

  /** Reference to the AddGroupByUrlSheet */
  const addGroupByUrlSheetRef = useRef({
    open: () => {},
    close: () => {},
  });

  /** Dummy data for demonstration */
  const dummyData = {
    friends: [{ name: "John Doe" }, { name: "Jane Doe" }],
  };

  /** Navigate to specified screen */
  const handleNavigation = (screen: RelativePathString) => {
    router.navigate(screen);
  };

  /** Open the AddGroupByUrl sheet */
  const openAddGroupByUrlSheet = () => {
    addGroupByUrlSheetRef.current?.open();
  };

  const handleAddExpenseNavigation = (groupId: string) => {
    router.push({
      pathname: `/[groupId]/create-expense`,
      params: { groupId },
    });
  };

  return (
    <>
      <ThemedView scrollable contentContainerStyle={styles.container}>
        {/* Create split bill/group section */}
        <CreateSplitCard
          onAddUrlPress={() => openAddGroupByUrlSheet()}
          onCreateGroupPress={() => handleNavigation("./create")}
        />

        {/* Recent groups section */}
        {recentGroups && recentGroups?.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <ThemedText type="regular" fontSize="lg">
                {getString("groups.recent")}
              </ThemedText>
              <ThemedButton variant="text" buttonStyle={styles.seeMoreBtn}>
                <ThemedText fontSize="xs" color="secondary">
                  {getString("common.see_more")}
                </ThemedText>
              </ThemedButton>
            </View>

            <RecientGroupCard
              groupId={recentGroups?.[0]?.groupId}
              onSplitBtnPress={() =>
                handleAddExpenseNavigation(recentGroups?.[0]?.groupId)
              }
            />
          </View>
        )}

        {/* Friends section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="regular" fontSize="lg">
              {getString("common.friends")}
            </ThemedText>
            <ThemedButton variant="text" buttonStyle={styles.seeMoreBtn}>
              <ThemedText fontSize="xs" color="secondary">
                {getString("common.see_more")}
              </ThemedText>
            </ThemedButton>
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
      <AddGroupByUrlSheet reference={addGroupByUrlSheetRef} />
    </>
  );
}

/** Stylesheet for home screen layout */
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
