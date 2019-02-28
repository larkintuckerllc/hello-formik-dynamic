import { Formik, FormikProps } from 'formik';
import React from 'react';
import { Button, View } from 'react-native';

const handleSubmitImpl = () => {
  // tslint:disable-next-line
  console.log('SUBMITTED');
};

const render = ({ handleSubmit }: FormikProps<{}>) => (
  <View>
    <Button title="Submit Hello" onPress={handleSubmit} />
  </View>
);

const HelloForm = () => <Formik initialValues={{}} onSubmit={handleSubmitImpl} render={render} />;

export default HelloForm;
