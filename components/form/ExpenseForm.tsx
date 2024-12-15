import { Text, TouchableOpacity, View } from "react-native";
import React, { useMemo, useRef } from "react";
import { ExpenseFormProps } from "./types";
import useExpenseForm from "@/hooks/useExpenseForm";
import { useThemeContext } from "@/context/ThemeContext";
import ThemedText from "../ui/ThemedText";
import { getString } from "@/strings/translations";
import FormField from "./components/FormField";
import { useAppContext } from "@/context/AppContext";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import CategoriesList from "../lists/CategoriesList";
import ThemedButton from "../ui/ThemedButton";
import { getColorWithAlpha } from "@/utils/colors";
import ParticipantsList from "../lists/ParticipantsList";
import { useFieldArray } from "react-hook-form";
import ParticipantsSheet from "../sheets/ParticipantsSheet";
import { Expense, Participant, Participants } from "@/utils/trpc";
import Seperator from "../Seperator";
import { enforceCurrencyPattern } from "@/utils/formatCurrency";
import ErrorMessage from "./components/ErrorMessage";
import { StyleSheet } from "react-native-unistyles";
import { SheetManager } from "react-native-actions-sheet";

const splitModes: Expense["splitMode"][] = [
  "EVENLY",
  "BY_SHARES",
  "BY_PERCENTAGE",
  "BY_AMOUNT",
];

export default function ExpenseForm({
  expense,
  group,
  reimbursementParams,
}: ExpenseFormProps) {
  const { commonStyles, theme } = useThemeContext();
  const { categoriesList } = useAppContext();

  const { control, errors, splitMode, handleSubmit, isSubmitting, submitForm } =
    useExpenseForm({
      expense,
      group,
      reimbursementParams,
    });

  // Manage participants with react-hook-form
  const { fields, append, remove } = useFieldArray({
    control,
    name: "paidFor",
    keyName: "key",
  });

  const handleDisplayParticipantsSheet = () => {
    SheetManager.show("ParticipantsSheet", {
      payload: {
        multiple: true,
        value: fields.map((i) => i.participant),
        onChange: handleParticipantSelection,
        participants: group?.participants as Participants,
      },
    });
  };

  const handleParticipantSelection = (
    participant: Participant,
    checked?: boolean
  ) => {
    if (checked) {
      remove(fields.findIndex((i) => i.participant === participant.id));
    } else {
      append({ participant: participant.id, shares: 1 });
    }
  };

  const handleRemovePaidFor = (index: number) => remove(index);

  const getSplitModeIcon = useMemo(() => {
    switch (splitMode) {
      case "BY_PERCENTAGE":
        return "brightness-percent";
      case "BY_AMOUNT":
        return "account-cash";
      case "BY_SHARES":
        return "fraction-one-half";
      default:
        return undefined;
    }
  }, [splitMode]);

  return (
    <View style={commonStyles.gapMd}>
      {/* Group Information Section */}
      <View style={commonStyles.marginBottomLg}>
        <ThemedText type="bold">{getString("expenses.create")}</ThemedText>
      </View>
      <FormField
        control={control}
        name="title"
        error={errors.title}
        label={getString("expenseform.expense.titlefield.label")}
        placeholder={getString("expenseform.expense.titlefield.placeholder")}
        helpText={getString("expenseform.expense.titlefield.description")}
        prepend={
          <MaterialCommunityIcons
            name="format-title"
            size={18}
            color={theme.colors.onSurface}
          />
        }
      />
      <FormField
        control={control}
        name="expenseDate"
        type="date"
        error={errors.expenseDate}
        label={getString("expenseform.expense.datefield.label")}
        helpText={getString("expenseform.expense.datefield.description")}
        prepend={
          <MaterialCommunityIcons
            name="calendar"
            size={18}
            color={theme.colors.onSurface}
          />
        }
      />
      <FormField
        control={control}
        name="amount"
        error={errors.amount}
        keyboardType="numeric"
        label={getString("expenseform.expense.amountfield.label")}
        placeholder={getString("expenseform.expense.amountfield.placeholder")}
        prepend={
          <MaterialCommunityIcons
            name="cash"
            size={18}
            color={theme.colors.onSurface}
          />
        }
      />
      <FormField
        control={control}
        name="isReimbursement"
        type="checkbox"
        error={errors.isReimbursement}
        label={getString("expenseform.expense.isreimbursementfield.label")}
      />
      <FormField
        control={control}
        name="category"
        type="picker"
        error={errors.category}
        label={getString("expenseform.expense.categoryfielddescription")}
        pickerSheetTitle={getString("categories.title")}
        fieldValue={(value) =>
          categoriesList.find((cat) => cat.id === value)?.name ?? null
        }
        renderPickerContentComponent={(value, onChange) => (
          <CategoriesList
            categories={categoriesList}
            onChange={(category) => {
              onChange(category.id);
            }}
            value={value}
          />
        )}
        prepend={
          <MaterialIcons
            name="category"
            size={18}
            color={theme.colors.onSurface}
          />
        }
        append={
          <MaterialCommunityIcons
            name="chevron-down"
            size={18}
            color={theme.colors.onSurface}
          />
        }
      />

      <FormField
        label={getString("expenseform.notesfield.label")}
        name="notes"
        control={control}
        error={errors.notes}
        multiline
        containerStyle={{ height: 100 }}
      />

      <FormField
        control={control}
        name="paidBy"
        type="picker"
        error={errors.paidBy}
        label={getString("expenseform.expense.paidbyfield.label")}
        placeholder={getString("expenseform.expense.paidbyfield.label")}
        helpText={getString("expenseform.expense.paidbyfield.description")}
        pickerSheetTitle={getString("expenseform.expense.paidbyfield.label")}
        fieldValue={(value) =>
          group?.participants.find((cat) => cat.id === value)?.name ?? null
        }
        renderPickerContentComponent={(value, onChange) => (
          <ParticipantsList
            participants={group?.participants ?? []}
            onChange={(participant) => {
              onChange(participant.id);
            }}
            value={value}
          />
        )}
        prepend={
          <MaterialIcons
            name="emoji-people"
            size={18}
            color={theme.colors.onSurface}
          />
        }
        append={
          <MaterialCommunityIcons
            name="chevron-down"
            size={18}
            color={theme.colors.onSurface}
          />
        }
      />

      <Seperator color={theme.colors.overlay} />

      <ThemedText type="bold">
        {getString("expenseform.splitmodefield.label")}
      </ThemedText>
      <FormField
        control={control}
        name="splitMode"
        type="segmented"
        error={errors.splitMode}
        values={splitModes}
        labels={[
          getString("expenseform.splitmodefield.evenly"),
          getString("expenseform.splitmodefield.shares"),
          getString("expenseform.splitmodefield.percentage"),
          getString("expenseform.splitmodefield.amount"),
        ]}
        helpText={getString("expenseform.expense.splitmodedescription")}
      />

      <Seperator color={theme.colors.overlay} />

      {/* Paid for Section */}
      <View style={[commonStyles.rowSpaceBetween, commonStyles.gapSm]}>
        <View
          style={[
            commonStyles.flex1,
            commonStyles.gapSm,
            commonStyles.col,
            commonStyles.justifyBetween,
          ]}
        >
          <ThemedText type="bold">
            {getString("expenseform.expense.paidfor.title")}
          </ThemedText>
          <ThemedText type="light" fontSize="sm" style={styles.description}>
            {getString("expenseform.expense.paidfor.description")}
          </ThemedText>
        </View>
        <ThemedButton
          borderRadius="lg"
          fontSize="sm"
          variant="primary"
          onPress={handleDisplayParticipantsSheet}
          buttonStyle={commonStyles.paddingMd}
        >
          <AntDesign name="plus" size={18} color={theme.colors.onPrimary} />
        </ThemedButton>
      </View>

      <View>
        {fields.map((field, index) => {
          const participant = group?.participants.find(
            (participant) => participant.id === field.participant
          );
          return (
            <View key={field.key}>
              <Seperator color={theme.colors.overlay} />
              <View
                key={field.key}
                style={[
                  commonStyles.row,
                  commonStyles.alignCenter,
                  commonStyles.justifyBetween,
                  commonStyles.gapHorizontalMd,
                ]}
              >
                <View style={[commonStyles.flex1]}>
                  <ThemedText type="medium" fontSize="lg">
                    {participant?.name}
                  </ThemedText>
                </View>
                {splitMode !== "EVENLY" && (
                  <View style={[commonStyles.flex1]}>
                    <FormField
                      key={field.key}
                      name={`paidFor.${index}.shares`}
                      control={control}
                      keyboardType="numeric"
                      formatter={enforceCurrencyPattern}
                      error={errors.paidFor?.[index]?.message}
                      prepend={
                        getSplitModeIcon && (
                          <MaterialCommunityIcons
                            name={getSplitModeIcon}
                            size={18}
                            color={theme.colors.onSurface}
                          />
                        )
                      }
                      append={
                        <TouchableOpacity
                          onPress={() => handleRemovePaidFor(index)}
                        >
                          <MaterialCommunityIcons
                            name="delete"
                            size={18}
                            color={theme.colors.error}
                          />
                        </TouchableOpacity>
                      }
                    />
                  </View>
                )}

                {splitMode === "EVENLY" && (
                  <ThemedButton
                    variant="text"
                    onPress={() => handleRemovePaidFor(index)}
                    buttonStyle={[
                      commonStyles.marginVerticalMd,
                      commonStyles.paddingVerticalMd,
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="delete"
                      size={18}
                      color={theme.colors.error}
                    />
                  </ThemedButton>
                )}
              </View>
            </View>
          );
        })}
      </View>

      <ErrorMessage
        error={errors.paidFor?.message || errors.paidFor?.root?.message}
      />

      <ThemedButton
        title={getString("expenseform.save")}
        onPress={handleSubmit(submitForm)}
        loading={isSubmitting}
      />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  description: {
    color: getColorWithAlpha(theme.colors.onBackground, 0.5),
  },
}));
