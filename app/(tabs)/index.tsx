import { Button, View } from "react-native";
import React, { useRef } from "react";
import ThemedView from "@/components/ui/ThemedView";
import RecientGroupCard from "@/components/cards/RecentGroupCard";
import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";
import { getString } from "@/strings/translations";

// Components
import ThemedText from "@/components/ui/ThemedText";
import ThemedButton from "@/components/ui/ThemedButton";
import StackedAvatars from "@/components/StackedAvatars";
import CreateSplitCard from "@/components/cards/CreateSplitCard";

import { RelativePathString, useRouter } from "expo-router";
import { useAppContext } from "@/context/AppContext";
import { SheetManager } from "react-native-actions-sheet";
import { useThemeContext } from "@/context/ThemeContext";

/**
 * Home screen component displaying recent groups, split options, and friends
 *
 * @component
 * @returns Scrollable home screen with various sections
 */
export default function Home() {
  /** Navigation and routing hooks */
  const router = useRouter();

  const { recentGroups } = useAppContext();

  const { setTheme } = useThemeContext();

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
    // addGroupByUrlSheetRef.current?.open();
    SheetManager.show("AddGroupByUrlSheet");
  };

  const handleAddExpenseNavigation = (groupId: string) => {
    router.push({
      pathname: `/[groupId]/create-expense`,
      params: { groupId },
    });
  };

  return (
    <>
      <ThemedView scrollable>
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

        <Button title="Hello" onPress={() => setTheme("tealTurquoiseLight")} />
      </ThemedView>
    </>
  );
}

/** Stylesheet for home screen layout */
const styles = StyleSheet.create((theme) => ({
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
