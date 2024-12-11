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
import FormField from "./components/FormField";
import { GroupFormValues } from "spliit-api/src/lib/schemas";
import ErrorMessage from "./components/ErrorMessage";
import useCommonStyles from "@/theme/styles";
import { getString } from "@/strings/translations";

type GroupFormProps = {
  groupDetails: GroupDetails | null | undefined;
  isEditing: Boolean;
  participantWithExpenses?: string[];
};

const GroupForm = ({ groupDetails, isEditing }: GroupFormProps) => {
  const { styles: commonStyles, theme } = useCommonStyles();
  const { styles } = useStyles(stylesheet);

  // Use custom hook to handle form logic
  const {
    control,
    handleSubmit,
    handleUpdateGroup,
    handleSaveGroup,
    errors,
    isSubmitting,
  } = useGroupForm({
    groupDetails,
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
    if (isEditing && groupDetails) {
      // Handle editing group
      handleSubmit((data: GroupFormValues) =>
        handleUpdateGroup(groupDetails.id, data)
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
            <AntDesign name="team" size={18} color={theme.colors.onSurface} />
          }
        />
        <FormField
          label={getString("groupform.currencyfield.label")}
          name="currency"
          placeholder={getString("groupform.currencyfield.placeholder")}
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
          <AntDesign name="plus" size={18} color={theme.colors.onPrimary} />
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
const stylesheet = createStyleSheet((theme) => ({
  description: {
    color: getColorWithAlpha(theme.colors.onBackground, 0.5),
  },
}));

export default GroupForm;
