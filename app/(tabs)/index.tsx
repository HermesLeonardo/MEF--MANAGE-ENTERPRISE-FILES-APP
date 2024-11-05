import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { router } from 'expo-router';
import { loginRepository } from '@/repository/login-repository';

type RegisterFormData = {
  cnpj: string;
  senha: string;
};

export function LoginScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
  const [error, setError] = useState<string | null>(null);

  const applyCnpjMask = (value: string) =>
    value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError(null);

      const user = await loginRepository.fetchUserByCnpj(data.cnpj);

      if (user && user.senha === data.senha) {
        console.log("Login bem-sucedido!");
        router.push('/prototipoDois');
      } else {
        setError("CNPJ ou senha incorretos.");
      }
    } catch (error) {
      console.error("Erro ao buscar os dados do usuário", error);
      setError("Erro ao tentar fazer login.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundShape} />
      <Text style={styles.title}>LOGIN</Text>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <View style={styles.inputContainer}>
        {/* CNPJ */}
        <Controller
          control={control}
          rules={{
            required: 'O campo CNPJ é obrigatório.',
            pattern: {
              value: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
              message: 'CNPJ inválido.',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="CNPJ"
              style={styles.input}
              placeholderTextColor="#A0A0A0"
              onBlur={onBlur}
              onChangeText={(text) => onChange(applyCnpjMask(text))}
              value={applyCnpjMask(value)}
              keyboardType="numeric"
              maxLength={18}
            />
          )}
          name="cnpj"
          defaultValue=""
        />
        {errors.cnpj && <Text style={styles.errorText}>{errors.cnpj.message}</Text>}

        {/* Senha */}
        <Controller
          control={control}
          rules={{
            required: 'O campo Senha é obrigatório.',
            minLength: {
              value: 6,
              message: 'A senha deve ter pelo menos 6 caracteres.',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Senha"
              secureTextEntry
              style={styles.input}
              placeholderTextColor="#A0A0A0"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="senha"
          defaultValue=""
        />
        {errors.senha && <Text style={styles.errorText}>{errors.senha.message}</Text>}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)} activeOpacity={0.85}>
        <Text style={styles.buttonText}>ENTRAR</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/forgotPassword')}>
        <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/cadastro')}>
        <Text style={styles.signUpText}>
          Ainda não possui uma conta? <Text style={styles.signUpLink}>Cadastre-se</Text>
        </Text>
      </TouchableOpacity>
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
    height: '45%',
    backgroundColor: '#3B83C3',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 40,
    textAlign: 'center',
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // para Android
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    paddingLeft: 20,
  },
  button: {
    backgroundColor: '#1877F2',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  signUpText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
  signUpLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
