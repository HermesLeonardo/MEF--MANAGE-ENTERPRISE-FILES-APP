import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { router } from 'expo-router';

// Tipos dos campos do formulário
type FormData = {
  nome: string;
  cnpj: string;
  email: string;
  senha: string;
  confirmarSenha: string;
};

export default function SignUpScreen() {
  // HookForm para controle de formulário e validação
  const { control, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    router.push("/");
  };

  // A senha é utilizada para validação da confirmação de senha
  const senha = watch('senha');

  return (
    <View style={styles.container}>
      <View style={styles.backgroundShape} />

      <View style={styles.content}>
        <Text style={styles.title}>CADASTRO</Text>

        <View style={styles.inputContainer}>
          {/* Campo Nome */}
          <Controller
            control={control}
            rules={{
              required: 'O nome é obrigatório.',
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Nome"
                style={styles.input}
                placeholderTextColor="#A0A0A0"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="nome"
            defaultValue=""
          />
          {errors.nome && <Text style={styles.errorText}>{errors.nome?.message}</Text>}

          {/* Campo CNPJ */}
          <Controller
            control={control}
            rules={{
              required: 'O CNPJ é obrigatório.',
              pattern: {
                value: /^\d{14}$/, // Exemplo simples de validação de CNPJ
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
          {errors.cnpj && <Text style={styles.errorText}>{errors.cnpj?.message}</Text>}

          {/* Campo E-mail */}
          <Controller
            control={control}
            rules={{
              required: 'O e-mail é obrigatório.',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: 'E-mail inválido.',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="E-mail"
                style={styles.input}
                placeholderTextColor="#A0A0A0"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
            defaultValue=""
          />
          {errors.email && <Text style={styles.errorText}>{errors.email?.message}</Text>}

          {/* Campo Senha */}
          <Controller
            control={control}
            rules={{
              required: 'A senha é obrigatória.',
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
          {errors.senha && <Text style={styles.errorText}>{errors.senha?.message}</Text>}

          {/* Campo Confirmar Senha */}
          <Controller
            control={control}
            rules={{
              required: 'É necessário confirmar a senha.',
              validate: value => value === senha || 'As senhas não coincidem.',
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Confirmar Senha"
                secureTextEntry
                style={styles.input}
                placeholderTextColor="#A0A0A0"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="confirmarSenha"
            defaultValue=""
          />
          {errors.confirmarSenha && <Text style={styles.errorText}>{errors.confirmarSenha?.message}</Text>}
        </View>

        <TouchableOpacity style={styles.button}>
          <Pressable onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>CADASTRAR</Text>
          </Pressable>
        </TouchableOpacity>

        <TouchableOpacity>
          <Pressable onPress={() => router.push("/")}>
            <Text style={styles.signUpText}>
              Já possui uma conta? <Text style={styles.signUpLink}>Faça login</Text>
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
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 20,
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
