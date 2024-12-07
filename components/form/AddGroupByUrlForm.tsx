import React, { useState } from "react";
import ThemedText from "../ui/ThemedText";
import FormField from "./components/FormField";
import { getString } from "@/strings/translations";
import { AntDesign } from "@expo/vector-icons";
import { useThemeContext } from "@/context/ThemeContext";
import { View } from "react-native";
import ThemedButton from "../ui/ThemedButton";
import {
  AddGroupFromUrlFormParams,
  useAddGroupFromUrlForm,
} from "@/hooks/useAddGroupFromUrlForm";

/**
 * AddGroupByUrlForm component allows users to add a group by providing a URL.
 *
 * @param {AddGroupByUrlFormProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const AddGroupByUrlForm: React.FC = (): JSX.Element => {
  const { control, errors, handleSubmit, isSubmitting, handleAddGroupFromUrl } =
    useAddGroupFromUrlForm({
      url: "",
    });
  const { commonStyles, theme } = useThemeContext();

  return (
    <View style={commonStyles.gapSm}>
      {/* Display the URL in the bottom sheet content */}
      <ThemedText type="light" fontSize="md">
        {getString("groups.addbyurl.description")}
      </ThemedText>
      <FormField
        control={control}
        name="url"
        error={errors.url}
        placeholder={getString("groups.addbyurl.placeholder")}
        prepend={
          <AntDesign name="link" color={theme.colors.onBackground} size={18} />
        }
      />
      <ThemedButton
        title={getString("groupform.settings.save")}
        onPress={handleSubmit(handleAddGroupFromUrl)}
        loading={isSubmitting}
        disabled={isSubmitting}
      />
    </View>
  );
};

export default AddGroupByUrlForm;
