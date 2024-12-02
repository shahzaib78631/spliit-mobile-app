import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Seperator from "./Seperator";
import ThemedText from "./ui/ThemedText";
import { AntDesign } from "@expo/vector-icons";
import ThemedButton from "./ui/ThemedButton";
import StackedAvatars from "./StackedAvatars";

type Group = {
  name: string;
  avatar: string;
};

// Define prop types for the component to make it reusable
interface RecientBillCardProps {
  title: string;
  group: Group[];
  onSplitBtnPress: () => void; // Function to handle button press
}

const RecientBillCard: React.FC<RecientBillCardProps> = ({
  title,
  group = [],
  onSplitBtnPress,
}) => {
  const { styles, theme } = useStyles(stylesheet);
  return (
    <View style={[styles.cardContainer]}>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <ThemedText numberOfLines={1} type="medium" style={styles.title}>
            {title}
          </ThemedText>
          <TouchableOpacity style={styles.shareIconBtn}>
            <AntDesign
              name="sharealt"
              size={18}
              color={theme.colors.onSurface}
            />
          </TouchableOpacity>
        </View>
        <Seperator margin={theme.margin.sm} />
        <View style={styles.billSection}>
          <ThemedText type="medium" style={styles.totalText}>
            Total Bill
          </ThemedText>
          <ThemedText numberOfLines={1} type="bold" style={styles.amountText}>
            $ 43.27
          </ThemedText>
        </View>

        <View style={styles.personsContainer}>
          <View style={styles.header}>
            <ThemedText style={[styles.subText]}>Split with</ThemedText>
            <ThemedText style={[styles.subText]}>
              {group.length} Persons
            </ThemedText>
          </View>
          <View style={styles.stackedAvatars}>
            <StackedAvatars
              avatars={group.map((person) => person.avatar)}
              avatarSize={40}
              overlap={-8}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <ThemedButton
            title="Split Now"
            borderRadius="lg"
            fontSize="sm"
            onPress={onSplitBtnPress}
          />
        </View>
      </View>
    </View>
  );
};

// Default styles for the RecientBillCard component
const stylesheet = createStyleSheet((theme) => ({
  cardContainer: {
    backgroundColor: theme.colors.surface2,
    borderRadius: theme.borderRadius.xxl,
    overflow: "hidden",
    height: 270,
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
    gap: theme.spacing.lg,
  },
  totalText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.onSurface,
  },
  amountText: {
    fontSize: theme.fontSize.xl,
    color: theme.colors.primary,
    textAlign: "right",
    width: "50%",
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
}));

export default RecientBillCard;
