import { NavigationRouteContext } from '@react-navigation/native';
import { NavigatorContext } from 'expo-router/build/views/Navigator';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button} from 'react-native';
import Link from 'expo-router';


export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.backgroundShape} />

      <View style={styles.content}>
        <Text style={styles.title}>LOGIN</Text>

        <View style={styles.inputContainer}>
          <TextInput 
            placeholder="CNPJ" 
            style={styles.input} 
            placeholderTextColor="#A0A0A0"
          />
          <TextInput 
            placeholder="Senha" 
            secureTextEntry 
            style={styles.input} 
            placeholderTextColor="#A0A0A0"
          />
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.signUpText}>
            Ainda não possui uma conta? <Text style={styles.signUpLink}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
      </View>


      <View>

      </View>

    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backgroundShape: {
    position: 'absolute',
    top: 0,
    width: '0%',
    height: '40%',
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    height: 50,
    marginBottom: 15,
    paddingLeft: 20,
    fontSize: 16,
  },
  forgotPassword: {
    color: '#FFFFFF',
    textAlign: 'right',
    marginTop: -10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1877F2',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  signUpLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});