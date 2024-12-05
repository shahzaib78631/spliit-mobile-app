import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useFieldArray } from "react-hook-form";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

// Hooks
import { useGroupForm } from "@/hooks/useGroupForm";

// Utils
import { getColorWithAlpha } from "@/utils/colors";
import { GroupDetails } from "@/utils/trpc";

// Styles
import { createStyleSheet, useStyles } from "react-native-unistyles";

// Components
import Seperator from "../Seperator";
import ThemedButton from "../ui/ThemedButton";
import ThemedText from "../ui/ThemedText";
import FormField from "./FormField";
import { GroupFormValues } from "spliit-api/src/lib/schemas";
import ErrorMessage from "./ErrorMessage";

type GroupFormProps = {
  groupDetails: GroupDetails | null | undefined;
  onSave: (groupFormValues: GroupFormValues) => Promise<void>;
  participantWithExpenses?: string[];
};

const GroupForm = ({
  groupDetails,
  onSave,
  participantWithExpenses = [],
}: GroupFormProps) => {
  const { styles, theme } = useStyles(stylesheet);

  // Use custom hook to handle form logic
  const { control, handleSubmit, errors, isSubmitting } = useGroupForm({
    groupDetails,
  });

  // Manage participants with react-hook-form
  const { fields, append, remove } = useFieldArray({
    control,
    name: "participants",
    keyName: "key",
  });

  // Handle form submission
  const onSubmit = (data: GroupFormValues) => {
    onSave(data); // Call the provided onSave function
  };

  // Handle adding a new participant
  const addParticipant = () => {
    append({ name: "New" });
  };

  // Handle removing a participant by index
  const removeParticipant = (index: number) => {
    remove(index);
  };

  return (
    <View style={styles.container}>
      {/* Group Information Section */}
      <ThemedText type="bold">Group Information</ThemedText>

      <View>
        <FormField
          label="Group name"
          name="name"
          placeholder="Group name"
          control={control}
          error={errors.name}
          prepend={
            <AntDesign name="team" size={18} color={theme.colors.onSurface} />
          }
        />
        <FormField
          label="Currency symbol"
          name="currency"
          placeholder="Currency symbol"
          control={control}
          error={errors.currency}
          prepend={
            <MaterialCommunityIcons
              name="cash-multiple"
              size={18}
              color={theme.colors.onSurface}
            />
          }
        />
        <FormField
          label="Group information"
          name="information"
          placeholder="Group information"
          control={control}
          error={errors.information}
          multiline
          inputStyle={{ height: 100 }}
        />
      </View>

      <Seperator />

      {/* Participants Section */}
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <ThemedText type="bold">Participants</ThemedText>
          <ThemedText type="light" fontSize="sm" style={styles.description}>
            Enter the name for each participant
          </ThemedText>
        </View>
        <ThemedButton
          borderRadius="lg"
          fontSize="sm"
          variant="primary"
          onPress={addParticipant}
          buttonStyle={{ padding: theme.spacing.md }}
        >
          <AntDesign name="plus" size={18} color={theme.colors.onPrimary} />
        </ThemedButton>
      </View>

      <View>
        {fields.map((field, index) => (
          <FormField
            key={field.key}
            name={`participants.${index}.name`}
            placeholder="Participant name"
            control={control}
            error={errors.participants?.[index]?.name}
            prepend={
              <AntDesign name="user" size={18} color={theme.colors.onSurface} />
            }
            append={
              <TouchableOpacity onPress={() => removeParticipant(index)}>
                <MaterialCommunityIcons
                  name="delete"
                  size={18}
                  color={theme.colors.error}
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
        title="Save"
        borderRadius="lg"
        fontSize="sm"
        variant="primary"
        onPress={handleSubmit(onSubmit)}
        loading={isSubmitting}
      />
    </View>
  );
};

// Styles for the component
const stylesheet = createStyleSheet((theme) => ({
  container: {
    gap: theme.spacing.lg,
  },
  header: {
    flexDirection: "row",
    gap: theme.spacing.sm,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    flex: 1,
    gap: theme.spacing.sm,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  description: {
    color: getColorWithAlpha(theme.colors.onBackground, 0.5),
  },
}));

export default GroupForm;
