import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useFieldArray } from "react-hook-form";

// Schemas
import { GroupFormValues } from "spliit-api/src/lib/schemas";

// Hooks
import { useGroupForm } from "@/hooks/useGroupForm";

// Utils
import { getColorWithAlpha } from "@/utils/colors";

// Styles
import { StyleSheet } from "react-native-unistyles";

// Components
import { ErrorMessage, FormField } from "@/components/forms/components";
import Seperator from "@/components/Seperator";
import ThemedButton from "@/components/ui/ThemedButton";
import ThemedText from "@/components/ui/ThemedText";
import { getString } from "@/strings/translations";
import { GroupFormProps } from "@/components/forms/types";
import { useThemeContext } from "@/context/ThemeContext";
import {
  ThemedAntDesign,
  ThemedMaterialCommunityIcons,
} from "@/components/ui/ThemedIcons";

const GroupForm = ({
  group,
  isEditing,
  participantWithExpenses = [],
}: GroupFormProps) => {
  const { commonStyles } = useThemeContext();

  // Use custom hook to handle form logic
  const {
    control,
    handleSubmit,
    handleUpdateGroup,
    handleSaveGroup,
    errors,
    isSubmitting,
  } = useGroupForm({
    group,
  });

  // Manage participants with react-hook-form
  const { fields, append, remove } = useFieldArray({
    control,
    name: "participants",
    keyName: "key",
  });

  // Handle adding a new participant
  const addParticipant = () => {
    append({ name: "New" });
  };

  // Handle removing a participant by index
  const removeParticipant = (index: number) => {
    remove(index);
  };

  // Handle form submission
  const handleFormSubmit = () => {
    if (isEditing && group) {
      // Handle editing group
      handleSubmit((data: GroupFormValues) =>
        handleUpdateGroup(group.id, data)
      )();
    } else {
      // Handle creating a new group
      handleSubmit(handleSaveGroup)();
    }
  };

  return (
    <View style={commonStyles.gapLg}>
      {/* Group Information Section */}
      <ThemedText type="bold">{getString("groupform.title")}</ThemedText>

      <View>
        <FormField
          label={getString("groupform.namefield.label")}
          name="name"
          placeholder={getString("groupform.namefield.placeholder")}
          control={control}
          error={errors.name}
          prepend={
            <ThemedAntDesign name="team" size={18} color={"onSurface"} />
          }
        />
        <FormField
          label={getString("groupform.currencyfield.label")}
          name="currency"
          placeholder={getString("groupform.currencyfield.placeholder")}
          control={control}
          error={errors.currency}
          prepend={
            <ThemedMaterialCommunityIcons
              name="cash-multiple"
              size={18}
              color={"onSurface"}
            />
          }
        />
        <FormField
          label={getString("groupform.informationfield.label")}
          name="information"
          placeholder={getString("groupform.informationfield.placeholder")}
          control={control}
          error={errors.information}
          multiline
          containerStyle={{ height: 100 }}
        />
      </View>

      <Seperator />

      {/* Participants Section */}
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
            {getString("groupform.participants.title")}
          </ThemedText>
          <ThemedText type="light" fontSize="sm" style={styles.description}>
            {getString("groupform.participants.description")}
          </ThemedText>
        </View>
        <ThemedButton
          borderRadius="lg"
          fontSize="sm"
          variant="primary"
          onPress={addParticipant}
          buttonStyle={commonStyles.paddingMd}
        >
          <ThemedAntDesign name="plus" size={18} color={"onPrimary"} />
        </ThemedButton>
      </View>

      <View>
        {fields.map((field, index) => (
          <FormField
            key={field.key}
            name={`participants.${index}.name`}
            placeholder={getString("groupform.participants.name")}
            control={control}
            error={errors.participants?.[index]?.name}
            prepend={
              <ThemedAntDesign name="user" size={18} color={"onSurface"} />
            }
            append={
              <TouchableOpacity onPress={() => removeParticipant(index)}>
                <ThemedMaterialCommunityIcons
                  name="delete"
                  size={18}
                  color={
                    participantWithExpenses.includes(field?.id as string)
                      ? "secondary"
                      : "error"
                  }
                />
              </TouchableOpacity>
            }
          />
        ))}
        {errors.participants && (
          <ErrorMessage error={errors.participants.root?.message} />
        )}
      </View>

      {/* Save Button */}
      <ThemedButton
        title={getString("groupform.settings.save")}
        borderRadius="lg"
        fontSize="sm"
        variant="primary"
        onPress={handleFormSubmit}
        loading={isSubmitting}
        disabled={isSubmitting}
      />
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create((theme) => ({
  description: {
    color: getColorWithAlpha(theme.colors.onBackground, 0.5),
  },
}));

export default GroupForm;
