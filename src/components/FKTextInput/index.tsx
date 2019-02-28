import { FieldProps } from 'formik';
import React from 'react';
import { TextInput } from 'react-native';
import styles from './styles';

const FKTextInput = ({ field: { name, value, onChange } }: FieldProps) => (
  <TextInput onChangeText={onChange(name)} style={styles.rootInput} value={value} />
);

export default FKTextInput;
