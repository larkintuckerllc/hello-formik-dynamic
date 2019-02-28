import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DynamicForm, { FormValues } from './components/DynamicForm';
import HelloForm from './components/HelloForm';

const wait = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });

const SCHEMA = [
  {
    name: 'firstName',
  },
  {
    name: 'lastName',
  },
];

const handleSubmit = async (formValues: FormValues) => {
  await wait();
  // throw new Error(); // TESTING ERROR CASE
  console.log(formValues);
};

export default class App extends React.Component {
  public render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <HelloForm />
        <DynamicForm onSubmit={handleSubmit} schema={SCHEMA} />
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
