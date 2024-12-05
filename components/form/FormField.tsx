import React from "react";
import { View } from "react-native";
import { Control, Controller } from "react-hook-form";
import ThemedTextInput from "../ui/ThemedTextInput";
import ThemedText from "../ui/ThemedText";
import { errorMessages } from "@/validations";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { getString } from "@/strings/translations";
import { StringMap } from "@/strings/types";
import ErrorMessage from "./ErrorMessage";

type FormFieldProps = {
  label?: string;
  name: string;
  placeholder: string;
  control: Control<any> | undefined;
  error: any;
  multiline?: boolean;
  inputStyle?: object;
  prepend?: React.ReactNode; // Add prepend prop
  append?: React.ReactNode; // Add append prop
};

// FormField Component
const FormField = ({
  label,
  name,
  placeholder,
  control,
  error,
  multiline = false,
  inputStyle = {},
  prepend,
  append,
}: FormFieldProps) => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.inputContainer}>
      {label && <ThemedText>{label}</ThemedText>}
      <Controller
        control={control}
        name={name} // the form field name
        render={({ field: { onChange, value } }) => (
          <ThemedTextInput
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
            multiline={multiline}
            inputStyle={inputStyle}
            prepend={prepend} // Pass the prepend prop
            append={append} // Pass the append prop
          />
        )}
      />
      {/* Display error message if there's any */}
      {error && <ErrorMessage error={error?.message} />}
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  inputContainer: {
    marginBottom: theme.margin.md, // space between fields
  },
  errorText: {
    marginTop: theme.margin.xs, // space between input and error message
  },
}));

export default FormField;
