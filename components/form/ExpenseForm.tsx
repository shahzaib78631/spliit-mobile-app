import { StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import { ExpenseFormProps } from "./types";
import useExpenseForm from "@/hooks/useExpenseForm";
import { useThemeContext } from "@/context/ThemeContext";
import ThemedText from "../ui/ThemedText";
import { getString } from "@/strings/translations";
import FormField from "./components/FormField";
import CategoriesSheet from "../sheets/CategoriesSheet";
import { useAppContext } from "@/context/AppContext";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import CategoriesList from "../lists/CategoriesList";
import ThemedButton from "../ui/ThemedButton";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { getColorWithAlpha } from "@/utils/colors";
import ParticipantsList from "../lists/ParticipantsList";

export default function ExpenseForm({
  expense,
  group,
  reimbursementParams,
}: ExpenseFormProps) {
  const { commonStyles, theme } = useThemeContext();
  const { styles } = useStyles(stylesheet);
  const { categoriesList } = useAppContext();

  const participantsSheetRef = useRef({
    open: () => {},
    close: () => {},
  });

  const { control, errors } = useExpenseForm({
    expense,
    group,
    reimbursementParams,
  });

  return (
    <View>
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
          onPress={() => {}}
          buttonStyle={commonStyles.paddingMd}
        >
          <AntDesign name="plus" size={18} color={theme.colors.onPrimary} />
        </ThemedButton>
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  description: {
    color: getColorWithAlpha(theme.colors.onBackground, 0.5),
  },
}));
