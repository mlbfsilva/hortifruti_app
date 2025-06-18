import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';

export default function LoginEntregador() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleVoltar = () => {
    router.push('/screens/WelcomeScreen');
  };

const handleEntrar = async () => {
  if (!email || !senha) {
    Alert.alert("Campos Incompletos", "Por favor, preencha todos os campos.");
    return;
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: senha,
  });

  if (error) {
    Alert.alert("Erro", "Email ou senha incorretos.");
    return;
  }

    router.replace('/entregador/(tabs)');
  };

  const handleCriarConta = () => {
    router.push('/entregador/criar-conta');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleVoltar} style={styles.backButton}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Login</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          placeholder="●●●●●●●●●●●●"
        />

        <TouchableOpacity style={styles.confirmButton} onPress={handleEntrar}>
          <Text style={styles.confirmButtonText}>ENTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.criarContaButton} onPress={handleCriarConta}>
          <Text style={styles.criarContaText}>Criar nova conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  confirmButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  criarContaButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  criarContaText: {
    color: '#000',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
}); 