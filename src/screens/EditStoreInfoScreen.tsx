// src/screens/EditStoreInfoScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';

import { ProfileStackParamList } from '../navigation/ProfileStack';
import { StoreProfile } from '../types/profile'; // Importar o tipo StoreProfile

// Importar o SuccessModal
import SuccessModal from '../components/SuccessModal';

// Importar a lista mockada de perfil da loja para simular a atualização
import { mockStoreProfile as globalMockStoreProfile } from './StoreProfileScreen'; // <--- NOVO

// Função simulada para salvar/atualizar o perfil da loja
const simulateSaveStoreProfileApi = async (updatedProfile: StoreProfile): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => { // Simula um atraso de rede
      globalMockStoreProfile.name = updatedProfile.name;
      globalMockStoreProfile.email = updatedProfile.email;
      globalMockStoreProfile.phone = updatedProfile.phone;
      globalMockStoreProfile.status = updatedProfile.status;
      globalMockStoreProfile.openingHours = updatedProfile.openingHours;
      console.log('Perfil da loja atualizado na lista mockada:', globalMockStoreProfile);
      resolve(true); // Sucesso
    }, 500);
  });
};
// --- FIM DOS DADOS MOCKADOS ---


type EditStoreInfoScreenProps = StackScreenProps<ProfileStackParamList, 'EditStoreInfo'>;

export default function EditStoreInfoScreen({ route, navigation }: EditStoreInfoScreenProps) {
  // Obter os dados do perfil da loja passados via rota
  const { profile: initialProfile } = route.params;

  const [name, setName] = useState(initialProfile.name);
  const [email, setEmail] = useState(initialProfile.email);
  const [phone, setPhone] = useState(initialProfile.phone || '');
  const [status, setStatus] = useState<'Aberto' | 'Fechado' | 'Em Férias'>(initialProfile.status);
  const [openingFrom, setOpeningFrom] = useState(initialProfile.openingHours.from);
  const [openingTo, setOpeningTo] = useState(initialProfile.openingHours.to);

  // ESTADOS PARA CONTROLAR A VISIBILIDADE DO MODAL DE SUCESSO
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');


  const handleSave = async () => { // <--- AGORA É ASYNC
    // Validação básica
    if (name.trim() === '' || email.trim() === '' || openingFrom.trim() === '' || openingTo.trim() === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const updatedProfile: StoreProfile = {
      ...initialProfile, // Mantém o ID original
      name,
      email,
      phone,
      status,
      openingHours: {
        from: openingFrom,
        to: openingTo,
      },
    };

    let success = false;

    // --- CÓDIGO REAL (COM BACKEND) - COMENTADO ---
    /*
    try {
      console.log('Tentando salvar perfil da loja no backend:', updatedProfile);
      const response = await fetch('https://sua-api.com/perfil/informacoes', {
        method: 'PUT', // Geralmente PUT para atualização
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProfile),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Perfil da loja salvo com sucesso no backend:', responseData);
        success = true;
      } else {
        const errorData = await response.json();
        console.error('Erro ao salvar perfil da loja no backend:', response.status, errorData);
        Alert.alert('Erro', `Não foi possível salvar o perfil: ${errorData.message || 'Tente novamente.'}`);
        success = false;
      }
    } catch (error) {
      console.error('Erro de rede ou na requisição de salvar perfil:', error);
      Alert.alert('Erro', 'Erro de conexão. Tente novamente.');
      success = false;
    }
    */
    // --- FIM DO CÓDIGO REAL (COM BACKEND) - COMENTADO ---

    // --- CÓDIGO DE SIMULAÇÃO (ATIVO) ---
    if (!success) {
      success = await simulateSaveStoreProfileApi(updatedProfile);
    }
    // --- FIM DO CÓDIGO DE SIMULAÇÃO ---


    if (success) {
      setSuccessMessage('Informações da loja atualizadas com sucesso!');
      setSuccessModalVisible(true);
    } else {
      console.log('Falha ao salvar informações da loja.');
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
      <Text style={styles.header}>Editar Informações da Loja</Text>

      <Text style={styles.label}>Nome do Parceiro:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>E-mail:</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

      <Text style={styles.label}>Telefone:</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

      <Text style={styles.label}>Horário de Funcionamento:</Text>
      <View style={styles.timeInputRow}>
        <TextInput
          style={[styles.input, styles.timeInput]}
          value={openingFrom}
          onChangeText={setOpeningFrom}
          placeholder="00:00"
          keyboardType="numeric"
        />
        <Text style={styles.timeSeparator}>até</Text>
        <TextInput
          style={[styles.input, styles.timeInput]}
          value={openingTo}
          onChangeText={setOpeningTo}
          placeholder="00:00"
          keyboardType="numeric"
        />
      </View>

      {/* Exemplo de seleção de status (pode ser um Picker, Radio Buttons, etc.) */}
      <Text style={styles.label}>Status:</Text>
      <View style={styles.statusRow}>
        <TouchableOpacity
          style={[styles.statusButton, status === 'Aberto' && styles.statusButtonActive]}
          onPress={() => setStatus('Aberto')}
        >
          <Text style={[styles.statusButtonText, status === 'Aberto' && styles.statusButtonTextActive]}>Aberto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.statusButton, status === 'Fechado' && styles.statusButtonActive]}
          onPress={() => setStatus('Fechado')}
        >
          <Text style={[styles.statusButtonText, status === 'Fechado' && styles.statusButtonTextActive]}>Fechado</Text>
        </TouchableOpacity>
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
  timeInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  timeInput: {
    flex: 1,
    marginRight: 8,
  },
  timeSeparator: {
    fontSize: 15,
    color: '#666', 
    marginHorizontal: 4,
  },
  statusRow: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 16,
  },
  statusButton: {
    borderWidth: 1,
    borderColor: '#19C37D',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: '#fff',
  },
  statusButtonActive: {
    backgroundColor: '#19C37D',
  },
  statusButtonText: {
    color: '#19C37D',
    fontWeight: '600',
  },
  statusButtonTextActive: {
    color: '#fff',
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
