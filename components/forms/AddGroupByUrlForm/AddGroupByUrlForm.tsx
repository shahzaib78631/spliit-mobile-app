import React, { useState } from "react";
import ThemedText from "@/components/ui/ThemedText";
import { FormField } from "@/components/forms/components";
import { getString } from "@/strings/translations";
import { useThemeContext } from "@/context/ThemeContext";
import { View } from "react-native";
import ThemedButton from "@/components/ui/ThemedButton";
import {
  AddGroupFromUrlFormParams,
  useAddGroupFromUrlForm,
} from "@/hooks/useAddGroupFromUrlForm";
import { useAppContext } from "@/context/AppContext";
import { ThemedMaterialIcons } from "@/components/ui/ThemedIcons";
import { SheetManager } from "react-native-actions-sheet";

/**
 * AddGroupByUrlForm component allows users to add a group by providing a URL.
 * It provides a form field for the URL input and a submit button.
 *
 * @component
 * @example
 * ```tsx
 * <AddGroupByUrlForm />
 * ```
 *
 * @returns {JSX.Element} The rendered AddGroupByUrlForm component.
 */
const AddGroupByUrlForm: React.FC = (): JSX.Element => {
  // Context for accessing theme-related styles and properties.
  const { commonStyles } = useThemeContext();

  // Context for fetching the list of groups after a new group is added.
  const { fetchGroups } = useAppContext();

  // Hook for form management, validation, and submission handling.
  const {
    control, // Controller for managing form fields.
    errors, // Object containing validation errors for the form.
    handleSubmit, // Function to handle form submission.
    isSubmitting, // Boolean indicating if the form is in the submission process.
    handleAddGroupFromUrl, // Function to handle the "Add Group From URL" action.
  } = useAddGroupFromUrlForm({
    url: "", // Initial value for the "url" field.
  });

  /**
   * Handles the addition of a group by calling the `handleAddGroupFromUrl` function
   * and then fetching the updated list of groups.
   *
   * @param {AddGroupFromUrlFormParams} data - The form data containing the URL.
   */
  const handleAddGroup = (data: AddGroupFromUrlFormParams) => {
    handleAddGroupFromUrl(data)
      .then(fetchGroups)
      .then(() => {
        SheetManager.hide("AddGroupByUrlSheet");
      });
  };

  return (
    <View style={commonStyles.gapSm}>
      {/* Description text */}
      <ThemedText type="light" fontSize="md">
        {getString("groups.addbyurl.description")}
      </ThemedText>

      {/* URL input field */}
      <FormField
        control={control}
        name="url"
        error={errors.url}
        placeholder={getString("groups.addbyurl.placeholder")}
        prepend={
          <ThemedMaterialIcons name="link" color={"onBackground"} size={18} />
        }
      />

      {/* Submit button */}
      <ThemedButton
        title={getString("groupform.settings.save")}
        onPress={handleSubmit(handleAddGroup)}
        loading={isSubmitting}
        disabled={isSubmitting}
        buttonStyle={{ height: 40 }}
      />
    </View>
  );
};

export default AddGroupByUrlForm;
