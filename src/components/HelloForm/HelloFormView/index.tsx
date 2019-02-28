import { Field, FormikProps } from 'formik';
import React from 'react';
import { Button, Text, View } from 'react-native';
import FKTextInput from '../../FKTextInput';
import { FormValues } from '../index';
import styles from './styles';

const HelloFormView = ({
  handleSubmit,
  isSubmitting,
  isValid,
  status = {},
}: FormikProps<FormValues>) => (
  <View>
    <Field disabled={isSubmitting} component={FKTextInput} name="firstName" />
    <Field disabled={isSubmitting} component={FKTextInput} name="lastName" />
    {status.succeeded && <Text style={styles.rootSucceeded}>SUCCEEDED</Text>}
    {status.failed && <Text style={styles.rootFailed}>FAILED</Text>}
    <Button disabled={!isValid || isSubmitting} title="Submit" onPress={handleSubmit} />
  </View>
);

export default HelloFormView;
