import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import cadastro from './cadastro.tsx';
import login from './index.tsx'; // Exemplo de outra tela

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="SignUp">
      <Stack.Screen name="SignUp" component={cadastro} />
      <Stack.Screen name="Login" component={login} />
      <Stack.Screen name="index" component={SomeOtherScreen} /> {/* Adicione essa linha */}
    </Stack.Navigator>
  );
}
