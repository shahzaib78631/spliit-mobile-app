import React from "react";
import { View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import { getString } from "@/strings/translations";
import { StyleSheet } from "react-native-unistyles";

// Define prop types for the component to make it reusable
interface BalanceCardProps {
  balance: number;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ balance = 0 }) => {
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

const styles = StyleSheet.create((theme) => ({
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
