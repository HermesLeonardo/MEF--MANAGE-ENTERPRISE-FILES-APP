import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable, Alert } from 'react-native';
import { router } from 'expo-router';


export default function forgotPassword() {
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string | null>(null);

    const handlePasswordReset = () => {
        // Validação básica do e-mail
        if (!email) {
            setEmailError('O campo de e-mail é obrigatório.');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Insira um e-mail válido.');
            return;
        }

        setEmailError(null);

        // Simula o envio de um e-mail de recuperação de senha
        Alert.alert(
            "Recuperação de senha",
            "Se este e-mail estiver cadastrado, você receberá um link para redefinir sua senha.",
            [{ text: "OK" }]
        );

    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recuperar Senha</Text>

            {emailError && <Text style={styles.errorText}>{emailError}</Text>}

            <TextInput
                placeholder="Digite seu e-mail"
                placeholderTextColor="#A0A0A0"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("./")}>
                <Text style={styles.backToLogin}>Voltar ao login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4A90E2',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        padding: 15,
        borderRadius: 25,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#1877F2',
        padding: 15,
        borderRadius: 25,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
    },
    backToLogin: {
        color: '#FFFFFF',
        marginTop: 20,
        textDecorationLine: 'underline',
    },
});
