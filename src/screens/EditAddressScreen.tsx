// src/screens/EditAddressScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';

// Importar a lista de parâmetros do ProfileStack
import { ProfileStackParamList } from '../navigation/ProfileStack'; // Ajuste o caminho se necessário

// IMPORTAR O TIPO 'StoreAddress' DIRETAMENTE DE 'src/types/profile.ts'
import { StoreAddress } from '../types/profile'; // <--- CORREÇÃO AQUI

// Definir o tipo das props para esta tela
type EditAddressScreenProps = StackScreenProps<ProfileStackParamList, 'EditAddress'>;

export default function EditAddressScreen({ route, navigation }: EditAddressScreenProps) {
  // Obter os dados de endereço passados via rota
  const { address: initialAddress } = route.params;

  const [cep, setCep] = useState(initialAddress.cep);
  const [state, setState] = useState(initialAddress.state);
  const [city, setCity] = useState(initialAddress.city);
  const [street, setStreet] = useState(initialAddress.street);
  const [number, setNumber] = useState(initialAddress.number);
  const [complement, setComplement] = useState(initialAddress.complement || '');

  const handleSave = () => {
    // Aqui você implementaria a lógica para salvar o endereço atualizado
    const updatedAddress: StoreAddress = {
      ...initialAddress,
      cep,
      state,
      city,
      street,
      number,
      complement,
    };
    console.log('Endereço atualizado:', updatedAddress);
    Alert.alert('Sucesso', 'Endereço atualizado com sucesso!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={28} color="#333" />
      </TouchableOpacity>
      <Text style={styles.header}>Endereço da Loja</Text>

      <Text style={styles.label}>CEP da Loja:</Text>
      <TextInput style={styles.input} value={cep} onChangeText={setCep} keyboardType="numeric" />

      <Text style={styles.label}>Estado:</Text>
      <TextInput style={styles.input} value={state} onChangeText={setState} />

      <Text style={styles.label}>Cidade:</Text>
      <TextInput style={styles.input} value={city} onChangeText={setCity} />

      <Text style={styles.label}>Rua:</Text>
      <TextInput style={styles.input} value={street} onChangeText={setStreet} />

      <View style={styles.row}>
        <View style={styles.halfInputContainer}>
          <Text style={styles.label}>Número:</Text>
          <TextInput style={styles.input} value={number} onChangeText={setNumber} keyboardType="numeric" />
        </View>
        <View style={styles.halfInputContainer}>
          <Text style={styles.label}>Complemento:</Text>
          <TextInput style={styles.input} value={complement} onChangeText={setComplement} />
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 48,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
  },
  label: {
    fontWeight: '500',
    fontSize: 15,
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInputContainer: {
    width: '48%', // Ajuste conforme necessário para o espaçamento
  },
  saveButton: {
    backgroundColor: '#19C37D',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
