import { Field, Formik, FormikProps } from 'formik';
import React from 'react';
import { Button, View } from 'react-native';
import FKTextInput from '../FKTextInput';

interface FormValues {
  firstName: string;
  lastName: string;
}
interface FormErrors {
  firstName?: string;
  lastName?: string;
}

const validate = ({ firstName, lastName }: FormValues) => {
  const errors: FormErrors = {};
  if (firstName === undefined) {
    errors.firstName = 'Required';
  } else if (firstName.trim() === '') {
    errors.firstName = 'Must not be blank';
  }
  if (lastName === undefined) {
    errors.lastName = 'Required';
  } else if (lastName.trim() === '') {
    errors.lastName = 'Must not be blank';
  }
  return errors;
};

const handleSubmitImpl = ({ firstName, lastName }: FormValues) => {
  // tslint:disable-next-line
  console.log(`firstName: ${firstName}`);
  // tslint:disable-next-line
  console.log(`lastName: ${lastName}`);
};

const render = ({ handleSubmit, isValid }: FormikProps<FormValues>) => (
  <View>
    <Field component={FKTextInput} name="firstName" />
    <Field component={FKTextInput} name="lastName" />
    <Button disabled={!isValid} title="Submit Hello" onPress={handleSubmit} />
  </View>
);

const HelloForm = () => (
  <Formik
    initialValues={{ firstName: '', lastName: '' }}
    onSubmit={handleSubmitImpl}
    render={render}
    validate={validate}
  />
);

export default HelloForm;
