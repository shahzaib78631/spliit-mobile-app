import { Text, TouchableNativeFeedback, View } from "react-native";
import React from "react";
import { Expense, GroupDetails } from "@/utils/trpc";
import { ThemedButton, ThemedText } from "@/components/ui";
import { StyleSheet } from "react-native-unistyles";
import { Trans } from "react-i18next";
import { useThemeContext } from "@/context/ThemeContext";
import { formatCurrency } from "@/utils/formatCurrency";
import dayjs from "dayjs";
import { ThemedMaterialCommunityIcons } from "@/components/ui/ThemedIcons";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { commonStyles } from "@/theme/styles";

interface ExpensesListCardProps {
  expense: Expense;
  group: GroupDetails | null | undefined;
  onPress: (expenseId: string) => void;
  onDelete: (expenseId: string) => void;
}

interface RightActionProps {
  prog: SharedValue<number>;
  drag: SharedValue<number>;
  onPress: () => void;
}

function RightAction({ prog, drag, onPress }: RightActionProps) {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value + 70 }],
    };
  });

  return (
    <Reanimated.View style={styleAnimation}>
      <View style={styles.rightAction}>
        <View style={styles.rightActionContent}>
          <ThemedButton
            variant="text"
            onPress={onPress}
            buttonStyle={commonStyles.paddingXs}
          >
            <ThemedMaterialCommunityIcons
              color="onError"
              name="delete-outline"
              size={18}
            />
          </ThemedButton>
        </View>
      </View>
    </Reanimated.View>
  );
}

const ExpensesListCard = ({
  expense,
  group,
  onDelete,
  onPress,
}: ExpensesListCardProps) => {
  return (
    <ReanimatedSwipeable
      containerStyle={styles.swipeable}
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={70}
      renderRightActions={(prog, drag) => (
        <RightAction
          drag={drag}
          prog={prog}
          onPress={() => onDelete(expense.id)}
        />
      )}
    >
      <TouchableNativeFeedback onPress={() => onPress(expense.id)}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View style={commonStyles.gapSm}>
              <ThemedText type="bold" fontSize="md">
                {expense.title}
              </ThemedText>
              <ThemedText color="onSurface" fontSize="sm">
                <Trans
                  i18nKey="expensecard.paidby"
                  values={{
                    paidBy: expense.paidBy.name,
                    paidFor: expense.paidFor
                      .map((user) => user.participant.name)
                      .join(", "),
                  }}
                  components={{
                    strong: (
                      <ThemedText color="secondary" type="bold" fontSize="sm">
                        1
                      </ThemedText>
                    ),
                  }}
                />
              </ThemedText>
            </View>
            <View style={[commonStyles.col, commonStyles.gapSm]}>
              <ThemedText
                color="secondary"
                type="bold"
                fontSize="md"
                textAlign="right"
              >
                {formatCurrency(group?.currency, expense.amount)}
              </ThemedText>
              <ThemedText color="onSurface" fontSize="xs" textAlign="right">
                {dayjs(expense.createdAt).format("MMM D, YYYY")}
              </ThemedText>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    </ReanimatedSwipeable>
  );
};

export default ExpensesListCard;

const styles = StyleSheet.create((theme) => ({
  container: {
    gap: theme.spacing.lg,
    flexDirection: "row",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    gap: theme.spacing.sm,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  swipeable: {
    height: 50,
  },
  rightAction: {
    width: 70,
  },
  rightActionContent: {
    height: 50,
    marginLeft: theme.margin.md,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.error,
  },
}));
