import React from "react";
import { View, Image } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import ThemedButton from "../ui/ThemedButton";
import { getString } from "@/strings/translations";
import ThemedText from "../ui/ThemedText";

// Define prop types for the component to make it reusable
interface CreateSplitCardProps {
  onCreateGroupPress: () => void; // Function to handle button press
  onAddUrlPress: () => void; // Function to handle button press
}

const CreateSplitCard: React.FC<CreateSplitCardProps> = ({
  onCreateGroupPress,
  onAddUrlPress,
}) => {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={[styles.cardContainer]}>
      <View style={styles.contentContainer}>
        <View style={styles.infoContainer}>
          <Image
            source={require("@/assets/images/logo.png")}
            width={80}
            height={80}
            resizeMode="contain"
            style={styles.logo}
          />
          <ThemedText type="medium" fontSize="xl" textAlign="center">
            {getString("common.welcome_to_split")}
          </ThemedText>
          <ThemedText type="light" fontSize="sm" textAlign="center">
            {getString("common.welcome_to_split_desc")}
          </ThemedText>
        </View>
        <View style={styles.footer}>
          <View style={styles.footerBtn}>
            <ThemedButton
              title={getString("common.create_group")}
              borderRadius="lg"
              fontSize="sm"
              onPress={onCreateGroupPress}
            />
          </View>
          <View style={styles.footerBtn}>
            <ThemedButton
              title={getString("common.add_by_url")}
              borderRadius="lg"
              fontSize="sm"
              variant="outline"
              onPress={onAddUrlPress}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

// Default styles for the CreateSplitCard component
const stylesheet = createStyleSheet((theme) => ({
  cardContainer: {
    backgroundColor: theme.colors.surface2,
    borderRadius: theme.borderRadius.xxl,
    overflow: "hidden",
    height: 270,
    borderWidth: 1,
    borderColor: theme.colors.primaryOutline,
  },
  contentContainer: {
    flex: 1,
    padding: theme.padding.xl,
    gap: theme.spacing.sm,
  },
  infoContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing.md,
  },
  logo: {
    width: 80,
    height: 80,
  },
  footer: {
    width: "100%",
    flexDirection: "row",
    gap: theme.spacing.sm,
    marginTop: theme.margin.auto,
  },
  footerBtn: {
    flex: 1,
  },
}));

export default CreateSplitCard;
