import { Button, View } from "react-native";
import React, { useRef } from "react";

// Action Sheet Manager
import { SheetManager } from "react-native-actions-sheet";

// Router
import { RelativePathString, useRouter } from "expo-router";

// Styles
import { StyleSheet } from "react-native-unistyles";

// Translation
import { getString } from "@/strings/translations";

// Context
import { useAppContext } from "@/context/AppContext";
import { useThemeContext } from "@/context/ThemeContext";

// Components
import { StackedAvatars } from "@/components/Avatars";
import { ThemedView, ThemedText, ThemedButton } from "@/components/ui";
import { RecentGroupCard, CreateSplitCard } from "@/components/cards";

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
      <ThemedView scrollEnabled goBackEnabled={false}>
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

            <RecentGroupCard
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
