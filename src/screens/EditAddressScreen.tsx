// src/screens/EditAddressScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';

import { ProfileStackParamList } from '../navigation/ProfileStack';
import { StoreAddress } from '../types/profile'; // Importar o tipo StoreAddress

// Importar o SuccessModal
import SuccessModal from '../components/SuccessModal';

// Importar a lista mockada de endereço da loja para simular a atualização
import { mockStoreAddress as globalMockStoreAddress } from './StoreProfileScreen'; // <--- NOVO

// Função simulada para salvar/atualizar o endereço da loja
const simulateSaveStoreAddressApi = async (updatedAddress: StoreAddress): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => { // Simula um atraso de rede
      globalMockStoreAddress.cep = updatedAddress.cep;
      globalMockStoreAddress.state = updatedAddress.state;
      globalMockStoreAddress.city = updatedAddress.city;
      globalMockStoreAddress.street = updatedAddress.street;
      globalMockStoreAddress.number = updatedAddress.number;
      globalMockStoreAddress.complement = updatedAddress.complement;
      console.log('Endereço da loja atualizado na lista mockada:', globalMockStoreAddress);
      resolve(true); // Sucesso
    }, 500);
  });
};
// --- FIM DOS DADOS MOCKADOS ---


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

  // ESTADOS PARA CONTROLAR A VISIBILIDADE DO MODAL DE SUCESSO
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');


  const handleSave = async () => { // <--- AGORA É ASYNC
    // Validação básica
    if (cep.trim() === '' || state.trim() === '' || city.trim() === '' || street.trim() === '' || number.trim() === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const updatedAddress: StoreAddress = {
      ...initialAddress, // Mantém o ID original (se houvesse um)
      cep,
      state,
      city,
      street,
      number,
      complement,
    };

    let success = false;

    // --- CÓDIGO REAL (COM BACKEND) - COMENTADO ---
    /*
    try {
      console.log('Tentando salvar endereço da loja no backend:', updatedAddress);
      const response = await fetch('https://sua-api.com/perfil/endereco', {
        method: 'PUT', // Geralmente PUT para atualização
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAddress),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Endereço da loja salvo com sucesso no backend:', responseData);
        success = true;
      } else {
        const errorData = await response.json();
        console.error('Erro ao salvar endereço da loja no backend:', response.status, errorData);
        Alert.alert('Erro', `Não foi possível salvar o endereço: ${errorData.message || 'Tente novamente.'}`);
        success = false;
      }
    } catch (error) {
      console.error('Erro de rede ou na requisição de salvar endereço:', error);
      Alert.alert('Erro', 'Erro de conexão. Tente novamente.');
      success = false;
    }
    */
    // --- FIM DO CÓDIGO REAL (COM BACKEND) - COMENTADO ---

    // --- CÓDIGO DE SIMULAÇÃO (ATIVO) ---
    if (!success) {
      success = await simulateSaveStoreAddressApi(updatedAddress);
    }
    // --- FIM DO CÓDIGO DE SIMULAÇÃO ---


    if (success) {
      setSuccessMessage('Endereço atualizado com sucesso!');
      setSuccessModalVisible(true);
    } else {
      console.log('Falha ao salvar endereço da loja.');
    }
  };

  const handleAdvanceFromSuccessModal = () => {
    setSuccessModalVisible(false);
    navigation.goBack(); // Volta para a tela de perfil
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

      {/* RENDERIZAR O SuccessModal PARA SUCESSO AO SALVAR */}
      <SuccessModal
        isVisible={isSuccessModalVisible}
        onAdvance={handleAdvanceFromSuccessModal}
        message={successMessage}
      />
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
