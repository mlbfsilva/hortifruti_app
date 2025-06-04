import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

export default function CriarSenha() {
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleVoltar = () => {
    router.back();
  };

  const handleConfirmar = () => {
    if (!senha || !confirmarSenha) {
      Alert.alert(
        "Campos Incompletos",
        "Por favor, preencha ambos os campos de senha.",
        [{ text: "OK" }]
      );
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert(
        "Senhas Diferentes",
        "As senhas não coincidem. Por favor, verifique.",
        [{ text: "OK" }]
      );
      return;
    }

    // Navega para a tela de dados bancários
    router.push('/entregador/conta-bancaria');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleVoltar} style={styles.backButton}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cadastro:</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Crie uma senha:</Text>
        <Text style={styles.subtitle}>
          Sua senha permite que você{'\n'}entre no aplicativo
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Crie sua senha</Text>
          <TextInput
            style={styles.input}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            placeholder="Digite sua senha"
          />

          <Text style={styles.label}>Confirme a senha</Text>
          <TextInput
            style={styles.input}
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry
            placeholder="Digite novamente sua senha"
          />

          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmar}>
            <Text style={styles.confirmButtonText}>CONFIRMAR</Text>
          </TouchableOpacity>
        </View>
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
  content: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  form: {
    marginTop: 20,
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
}); 