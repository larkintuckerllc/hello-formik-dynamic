import { FieldProps } from 'formik';
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import styles from './styles';

const FKTextInput = ({
  field: { name, onBlur, onChange, value },
  form: { errors, touched },
}: FieldProps) => (
  <View>
    <TextInput
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
