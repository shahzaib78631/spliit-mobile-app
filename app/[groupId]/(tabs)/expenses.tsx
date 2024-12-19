import React from "react";

// Components
import ThemedList from "@/components/ui/ThemedList";
import { useAppContext } from "@/context/AppContext";
import { Expense } from "@/utils/trpc";
import { getString } from "@/strings/translations";
import { useGroupExpenses } from "@/hooks/useGroupExpenses";
import { ThemedText } from "@/components/ui";
import { ExpensesListCard } from "@/components/cards";
import { View } from "react-native";
import { commonStyles } from "@/theme/styles";
import { useRouter } from "expo-router";

/**
 * Screen for Expenses
 *
 * @component
 * @returns {React.ReactElement} Renders the expenses list
 */
export default function Expenses(): React.ReactElement {
  const { activeGroup } = useAppContext();
  const {
    sections,
    deleteExpense,
    refetch,
    isLoading,
    isFetching,
    isRefetching,
  } = useGroupExpenses({
    groupId: activeGroup?.id || "",
  });

  const router = useRouter();

  const handleExpenseDelete = (id: string) => {
    // deleteExpense(id);
  };

  const handleExpenseOpen = (expenseId: string) => {
    // Open expense details screen
    router.push({
      pathname: `/[groupId]/expenses/[expenseId]`,
      params: { groupId: activeGroup?.id || "", expenseId },
    });
  };

  return (
    <ThemedList
      type="sectionlist"
      data={sections}
      renderItem={({ item }: { item: Expense | string }) => {
        if (typeof item === "string") {
          return (
            <ThemedText type="medium" fontSize="md" color="onBackground">
              {getString(`expenses.groups.${item}`.toLowerCase() as any)}
            </ThemedText>
          );
        }

        return (
          <ExpensesListCard
            group={activeGroup}
            expense={item}
            onDelete={handleExpenseDelete}
            onPress={handleExpenseOpen}
          />
        );
      }}
      keyExtractor={(item: any) => item?.id || item}
      estimatedItemSize={100}
      searchEnabled
      showsVerticalScrollIndicator={false}
      renderSectionHeader={({ section: { title } }) => (
        <View
          style={[
            commonStyles.paddingVerticalLg,
            commonStyles.backgroundColor("background"),
          ]}
        >
          <ThemedText type="medium" fontSize="md" color="onBackground">
            {getString(`expenses.groups.${title}`.toLowerCase() as any)}
          </ThemedText>
        </View>
      )}
      refreshing={isLoading || isFetching || isRefetching}
      onRefresh={() => refetch()}
      searchConfig={{
        extractSearchableText: (item: any) => item?.title ?? item, // Search by title
        placeholder: getString("expenses.searchplaceholder"),
      }}
    />
  );
}
