import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DynamicForm, { FormErrors, FormValues } from './components/DynamicForm';
import HelloForm from './components/HelloForm';

const wait = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });

const SCHEMA = [
  {
    initialValue: 'first',
    label: 'First Name',
    name: 'firstName',
    required: true,
  },
  {
    initialValue: 'last',
    label: 'Last Name',
    name: 'lastName',
    required: true,
  },
  {
    label: 'Another',
    name: 'another',
  },
];

const handleSubmit = async (formValues: FormValues) => {
  await wait();
  // throw new Error(); // TESTING ERROR CASE
  // tslint:disable-next-line
  console.log(formValues);
};

const handleValidate = ({ firstName, lastName }: FormValues) => {
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

export default class App extends React.Component {
  public render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <HelloForm />
        <DynamicForm onSubmit={handleSubmit} onValidate={handleValidate} schema={SCHEMA} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
});
