import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DynamicForm from './components/DynamicForm';
import HelloForm from './components/HelloForm';

const SCHEMA = [
  {
    name: 'firstName',
  },
  {
    name: 'lastName',
  },
];

export default class App extends React.Component {
  public render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <HelloForm />
        <DynamicForm schema={SCHEMA} />
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
