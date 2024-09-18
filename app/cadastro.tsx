import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.backgroundShape} />

      <View style={styles.content}>
        <Text style={styles.title}>CADASTRO</Text>

        <View style={styles.inputContainer}>
          <TextInput 
            placeholder="Nome" 
            style={styles.input} 
            placeholderTextColor="#A0A0A0"
          />
          <TextInput 
            placeholder="CNPJ" 
            style={styles.input} 
            placeholderTextColor="#A0A0A0"
          />
          <TextInput 
            placeholder="E-mail" 
            style={styles.input} 
            placeholderTextColor="#A0A0A0"
          />
          <TextInput 
            placeholder="Senha" 
            secureTextEntry 
            style={styles.input} 
            placeholderTextColor="#A0A0A0"
          />
          <TextInput 
            placeholder="Confirmar Senha" 
            secureTextEntry 
            style={styles.input} 
            placeholderTextColor="#A0A0A0"
          />
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>CADASTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.signUpText}>
            Já possui uma conta? <Text style={styles.signUpLink}>Faça login</Text>
          </Text>
        </TouchableOpacity>
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
    width: '100%',
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