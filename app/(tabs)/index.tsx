import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { router } from 'expo-router';
import { loginRepository } from '@/repository/login-repository';


type RegisterFormData = {
  cnpj: string;
  senha: string;
};

export default function LoginScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [senhaError, setSenhaError] = useState<string | null>(null);

  const applyCnpjMask = (value: string) => {
    value = value.replace(/\D/g, '');

    if (value.length <= 14) {
      value = value.replace(/^(\d{2})(\d)/, '$1.$2');
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
      value = value.replace(/(\d{4})(\d)/, '$1-$2');
    }

    return value;
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoginError(null);
      setSenhaError(null); // Resetando os erros ao tentar o login

      const user = await loginRepository.fetchUserByCnpj(data.cnpj);

      if (user) {
        if (user.senha === data.senha) {
          console.log("Login bem-sucedido!");
          router.push('/prototipoDois');
        } else {
          setSenhaError("Senha incorreta."); // Definindo o erro de senha incorreta
          console.log("Senha incorreta.");
        }
      } else {
        setLoginError("CNPJ ou senha incorretos.");
        console.log("CNPJ ou senha incorretos.");
      }
    } catch (error) {
      console.error("Erro ao buscar os dados do usuário", error);
      setLoginError("Erro ao tentar fazer login.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundShape} />
      <View style={styles.content}>
        <Text style={styles.title}>LOGIN</Text>

        {loginError && <Text style={styles.errorText}>{loginError}</Text>} {/* Mensagem de erro geral */}

        <View style={styles.inputContainer}>
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
                onChangeText={(text) => onChange(applyCnpjMask(text))} // Aplica a máscara ao alterar o texto
                value={applyCnpjMask(value)} // Aplica a máscara ao exibir o valor
                keyboardType="numeric" // Para garantir que o teclado seja numérico
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
                onChangeText={(text) => onChange(text)}
                value={value}
              />
            )}
            name="senha"
            defaultValue=""
          />
          {errors.senha && <Text style={styles.errorText}>{errors.senha.message}</Text>}
          {senhaError && <Text style={styles.errorText}>{senhaError}</Text>} {/* Exibe erro de senha incorreta */}

          <TouchableOpacity>
            <Pressable onPress={() => router.push('./forgotPassword')}>
              <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
            </Pressable>
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
