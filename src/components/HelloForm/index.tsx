import { Field, Formik, FormikProps } from 'formik';
import React from 'react';
import { Button, View } from 'react-native';
import FKTextInput from '../FKTextInput';

interface FormValues {
  firstName: string;
  lastName: string;
}

const handleSubmitImpl = ({ firstName, lastName }: FormValues) => {
  // tslint:disable-next-line
  console.log(`firstName: ${firstName}`);
  // tslint:disable-next-line
  console.log(`lastName: ${lastName}`);
};

const render = ({ handleSubmit }: FormikProps<FormValues>) => (
  <View>
    <Field component={FKTextInput} name="firstName" />
    <Field component={FKTextInput} name="lastName" />
    <Button title="Submit Hello" onPress={handleSubmit} />
  </View>
);

const HelloForm = () => (
  <Formik
    initialValues={{ firstName: '', lastName: '' }}
    onSubmit={handleSubmitImpl}
    render={render}
  />
);

export default HelloForm;
