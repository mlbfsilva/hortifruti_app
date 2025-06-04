import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

export default function ContaBancaria() {
  const [banco, setBanco] = useState('');
  const [conta, setConta] = useState('');
  const [operacao, setOperacao] = useState('');
  const [tipoConta, setTipoConta] = useState('');
  const [agencia, setAgencia] = useState('');

  const handleVoltar = () => {
    router.back();
  };

  const handleConfirmar = () => {
    if (!banco || !conta || !operacao || !tipoConta || !agencia) {
      Alert.alert(
        "Campos Incompletos",
        "Por favor, preencha todos os campos bancários.",
        [{ text: "OK" }]
      );
      return;
    }

    // Navega para a tela de localização
    router.push('/entregador/localizacao');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleVoltar} style={styles.backButton}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Conta bancária</Text>
      </View>

      <View style={styles.content}>
        <TextInput
          style={styles.input}
          value={banco}
          onChangeText={setBanco}
          placeholder="BANCO"
          placeholderTextColor="#000"
        />

        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            value={conta}
            onChangeText={setConta}
            placeholder="CONTA"
            placeholderTextColor="#000"
            keyboardType="numeric"
          />

          <TextInput
            style={[styles.input, styles.halfInput]}
            value={operacao}
            onChangeText={setOperacao}
            placeholder="OPERAÇÃO"
            placeholderTextColor="#000"
            keyboardType="numeric"
          />
        </View>

        <TextInput
          style={styles.input}
          value={tipoConta}
          onChangeText={setTipoConta}
          placeholder="TIPO DE CONTA"
          placeholderTextColor="#000"
        />

        <TextInput
          style={styles.input}
          value={agencia}
          onChangeText={setAgencia}
          placeholder="AGÊNCIA"
          placeholderTextColor="#000"
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmar}>
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
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  halfInput: {
    width: '48%',
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