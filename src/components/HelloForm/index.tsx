import { Formik, FormikActions, FormikProps } from 'formik';
import React from 'react';
import HelloFormView from './HelloFormView';

const wait = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });
export interface FormValues {
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

const handleSubmit = async (
  { firstName, lastName }: FormValues,
  { resetForm, setStatus, setSubmitting }: FormikActions<FormValues>
) => {
  setStatus({});
  try {
    await wait();
    // throw new Error(); // TESTING ERROR CASE
    resetForm();
    setStatus({ succeeded: true });
    setSubmitting(false);
    // tslint:disable-next-line
    console.log(`firstName: ${firstName}`);
    // tslint:disable-next-line
    console.log(`lastName: ${lastName}`);
  } catch (err) {
    setStatus({ failed: true });
    setSubmitting(false);
  }
};

const render = (props: FormikProps<FormValues>) => <HelloFormView {...props} />;

const HelloForm = () => (
  <Formik
    initialValues={{ firstName: 'first', lastName: 'last' }}
    onSubmit={handleSubmit}
    render={render}
    validate={validate}
  />
);

export default HelloForm;
