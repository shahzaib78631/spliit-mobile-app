import React from "react";
import { TextStyle, View, ViewStyle } from "react-native";
import { Control, Controller } from "react-hook-form";
import ThemedTextInput from "../../ui/ThemedTextInput";
import ThemedText from "../../ui/ThemedText";
import ErrorMessage from "./ErrorMessage";
import useCommonStyles from "@/theme/styles";

type FormFieldProps = {
  label?: string;
  name: string;
  placeholder: string;
  control: Control<any> | undefined;
  error: any;
  multiline?: boolean;
  inputStyle?: TextStyle;
  containerStyle?: ViewStyle;
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
  containerStyle,
}: FormFieldProps) => {
  const { styles } = useCommonStyles();

  return (
    <View style={styles.marginBottomMd}>
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
            containerStyle={containerStyle}
          />
        )}
      />
      {/* Display error message if there's any */}
      {error && <ErrorMessage error={error?.message} />}
    </View>
  );
};

export default FormField;
