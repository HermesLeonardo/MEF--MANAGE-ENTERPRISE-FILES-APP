import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { router } from 'expo-router';
import { registerController } from '@/controller/register-controller';
import { TextInputMask } from 'react-native-masked-text';


export type RegisterFormData = {
  nome: string;
  cnpj: string;
  email: string;
  senha: string;
  confirmarSenha: string;
};

export default function SignUpScreen() {
  const { control, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>();

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      await registerController.createRegister(data);
      console.log("Usuário cadastrado com sucesso!");
      router.push("./"); 
    } catch (error) {
      console.error("Erro ao cadastrar usuário: ", error);
    }
  };

  const senha = watch('senha');

  return (
    <View style={styles.container}>
      <View style={styles.backgroundShape} />

      <View style={styles.content}>
        <Text style={styles.title}>CADASTRO</Text>

        <View style={styles.inputContainer}>
          {/* Nome */}
          <Controller
            control={control}
            rules={{ required: 'O nome é obrigatório.' }}
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
          {errors.nome && <Text style={styles.errorText}>{errors.nome.message}</Text>}

          {/* CNPJ */}
          <Controller
            control={control}
            rules={{
              required: 'O CNPJ é obrigatório.',
              pattern: {
                value: /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/,
                message: 'CNPJ inválido.',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInputMask
                type={'cnpj'}
                placeholder="CNPJ"
                style={styles.input}
                placeholderTextColor="#A0A0A0"
                onBlur={onBlur}
                value={value}
                onChangeText={onChange} // A máscara vai ser aplicada automaticamente
              />
            )}
            name="cnpj"
            defaultValue=""
          />
          {errors.cnpj && <Text style={styles.errorText}>{errors.cnpj.message}</Text>}

          {/* E-mail */}
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
          {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

          {/* Senha */}
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
          {errors.senha && <Text style={styles.errorText}>{errors.senha.message}</Text>}

          {/* Confirmar Senha */}
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
          {errors.confirmarSenha && <Text style={styles.errorText}>{errors.confirmarSenha.message}</Text>}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>CADASTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/")}>
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
    marginBottom: 10,
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
