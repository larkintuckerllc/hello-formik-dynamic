import { Field, FormikProps } from 'formik';
import React from 'react';
import { Button, Text, View } from 'react-native';
import FKTextInput from '../../FKTextInput';
import { DynamicFormField, FormValues } from '../index';
import styles from './styles';

interface AdditionalProps {
  schema: DynamicFormField[];
}

const HelloFormView = ({
  handleSubmit,
  isSubmitting,
  isValid,
  schema,
  status = {},
}: FormikProps<FormValues> & AdditionalProps) => {
  return (
    <View>
      {schema.map((field: DynamicFormField) => {
        return (
          <Field
            component={FKTextInput}
            disabled={isSubmitting}
            key={field.name}
            name={field.name}
          />
        );
      })}
      {status.succeeded && <Text style={styles.rootSucceeded}>SUCCEEDED</Text>}
      {status.failed && <Text style={styles.rootFailed}>FAILED</Text>}
      <Button disabled={!isValid || isSubmitting} title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default HelloFormView;
