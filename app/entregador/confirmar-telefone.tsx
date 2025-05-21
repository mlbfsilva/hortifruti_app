import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

export default function ConfirmarTelefone() {
  const [codigo, setCodigo] = useState('');

  const handleVoltar = () => {
    router.back();
  };

  const handleConfirmar = () => {
    if (!codigo || codigo.length < 5) {
      Alert.alert(
        "Código Incompleto",
        "Por favor, digite o código completo.",
        [{ text: "OK" }]
      );
      return;
    }

    // Navega para a tela de criação de senha
    router.push('/entregador/criar-senha');
  };

  const handleReenviarCodigo = () => {
    // Aqui você pode adicionar a lógica para reenviar o código
    console.log('Reenviando código...');
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
        <Text style={styles.instruction}>
          Insira o código enviado para
        </Text>
        <Text style={styles.phoneNumber}>+55 61 9 9457-8908</Text>

        <TextInput
          style={styles.codeInput}
          value={codigo}
          onChangeText={setCodigo}
          keyboardType="numeric"
          maxLength={5}
          placeholder="_ _ _ _ _"
          placeholderTextColor="#999"
          textAlign="center"
        />

        <TouchableOpacity 
          onPress={handleReenviarCodigo}
          style={styles.resendButton}
        >
          <Text style={styles.resendText}>Reenviar código</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.confirmButton} 
          onPress={handleConfirmar}
        >
          <Text style={styles.confirmButtonText}>CONFIRMAR</Text>
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
  content: {
    padding: 20,
    alignItems: 'center',
  },
  instruction: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  phoneNumber: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 32,
    textDecorationLine: 'underline',
  },
  codeInput: {
    width: '80%',
    height: 40,
    fontSize: 24,
    letterSpacing: 8,
    marginBottom: 24,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  resendButton: {
    marginBottom: 32,
  },
  resendText: {
    color: 'red',
    fontSize: 16,
  },
  confirmButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 