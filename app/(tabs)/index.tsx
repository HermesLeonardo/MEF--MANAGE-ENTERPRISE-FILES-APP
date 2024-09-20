import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { router } from 'expo-router';

type FormData = {
  cnpj: string;
  senha: string;
};

export default function LoginScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    router.push('/prototipoDois');
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundShape} />

      <View style={styles.content}>
        <Text style={styles.title}>LOGIN</Text>

        <View style={styles.inputContainer}>
          <Controller
            control={control}
            rules={{
              required: 'O campo CNPJ é obrigatório.',
              pattern: {
                value: /^\d{14}$/,
                message: 'CNPJ inválido.',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="CNPJ"
                style={styles.input}
                placeholderTextColor="#A0A0A0"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="cnpj"
            defaultValue=""
          />
          {errors.cnpj && <Text style={styles.errorText}>{errors.cnpj.message}</Text>}

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

          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button}>
          <Pressable onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>ENTRAR</Text>
          </Pressable>
        </TouchableOpacity>

        <TouchableOpacity>
          <Pressable onPress={() => router.push('/cadastro')}>
            <Text style={styles.signUpText}>
              Ainda não possui uma conta? <Text style={styles.signUpLink}>Cadastre-se</Text>
            </Text>
          </Pressable>
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
    marginBottom: 5,
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
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'left',
    width: '100%',
    paddingLeft: 20,
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
