import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ThemedView from "@/components/ui/ThemedView";
import RecientBillCard from "@/components/RecientBillCard";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import ThemedText from "@/components/ui/ThemedText";
import { getString } from "@/strings/translations";
import ThemedButton from "@/components/ui/ThemedButton";
import StackedAvatars from "@/components/StackedAvatars";

export default function Home() {
  const { styles } = useStyles(stylesheet);

  const data = {
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

  return (
    <ThemedView style={styles.container}>
      <RecientBillCard
        title={data.title}
        group={data.group}
        onSplitBtnPress={() => console.log("Split Bill")}
      />
      <View style={styles.friendsSectionContainer}>
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
          avatars={data.friends.map((i) => i.avatar)}
          names={data.friends.map((i) => i.name)}
          showNames
          addLabel={getString("common.add_friend")}
        />
      </View>
    </ThemedView>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    paddingHorizontal: theme.padding.xl,
    gap: theme.spacing.xl,
  },
  friendsSectionContainer: {
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
