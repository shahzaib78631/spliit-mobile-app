import React from "react";
import { DimensionValue, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import ThemedText from "../ui/ThemedText";
import { getString } from "@/strings/translations";

// Define prop types for the component to make it reusable
interface BalanceCardProps {
  balance: number;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ balance = 0 }) => {
  const { styles, theme } = useStyles(stylesheet);
  return (
    <View style={[styles.cardContainer]}>
      <ThemedText fontSize="lg" type="regular">
        {getString("common.your_balance")}
      </ThemedText>
      <ThemedText fontSize="xxxl" type="medium" color="primary">
        $13,470,000
      </ThemedText>
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  cardContainer: {
    backgroundColor: theme.colors.surface2,
    borderRadius: theme.borderRadius.xxl,
    padding: theme.margin.xl,
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing.md,
  },
  contentContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

export default BalanceCard;
