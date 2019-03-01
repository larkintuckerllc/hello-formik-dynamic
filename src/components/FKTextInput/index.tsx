import { FieldProps } from 'formik';
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import styles from './styles';

interface AdditionalProps {
  disabled?: boolean;
  label?: string;
  required?: boolean;
}

const FKTextInput = ({
  disabled = false,
  field: { name, onBlur, onChange, value },
  form: { errors, touched },
  label,
  required = false,
}: FieldProps & AdditionalProps) => (
  <View>
    <View style={styles.rootLabel}>
      {label !== undefined && <Text>{label}</Text>}
      {required && <Text>*</Text>}
    </View>
    <TextInput
      editable={!disabled}
      onChangeText={onChange(name)}
      onBlur={onBlur(name)}
      style={[
        styles.rootInput,
        {
          borderColor: errors[name] && touched[name] ? 'red' : 'gray',
        },
      ]}
      value={value}
    />
    {errors[name] && touched[name] && <Text style={styles.rootError}>{errors[name]}</Text>}
  </View>
);

export default FKTextInput;
