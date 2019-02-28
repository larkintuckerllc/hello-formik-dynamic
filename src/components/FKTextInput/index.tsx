import { FieldProps } from 'formik';
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import styles from './styles';

const FKTextInput = ({
  disabled = false,
  field: { name, onBlur, onChange, value },
  form: { errors, touched },
}: FieldProps & { disabled?: boolean }) => (
  <View>
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
