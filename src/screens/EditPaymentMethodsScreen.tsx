// src/screens/EditPaymentMethodsScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';

import { ProfileStackParamList } from '../navigation/ProfileStack';

// IMPORTAR OS TIPOS DE PERFIL E O NOVO TIPO PaymentMethods
import { PaymentMethods } from '../types/profile';

// IMPORTAR OS COMPONENTES DE MODAL
import SuccessModal from '../components/SuccessModal';
import ConfirmationModal from '../components/ConfirmationModal'; // (Se você for usar um modal para erro de validação, por exemplo)

// Importar a lista mockada de métodos de pagamento para simular a atualização
import { mockPaymentMethods as globalMockPaymentMethods } from './StoreProfileScreen'; // <--- NOVO

// Função simulada para salvar/atualizar métodos de pagamento
const simulateSavePaymentMethodsApi = async (updatedPaymentMethods: PaymentMethods): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => { // Simula um atraso de rede
      globalMockPaymentMethods.pix = updatedPaymentMethods.pix;
      globalMockPaymentMethods.creditCard = updatedPaymentMethods.creditCard;
      globalMockPaymentMethods.debitCard = updatedPaymentMethods.debitCard;
      console.log('Métodos de pagamento atualizados na lista mockada:', globalMockPaymentMethods);
      resolve(true); // Sucesso
    }, 500);
  });
};
// --- FIM DOS DADOS MOCKADOS ---


type EditPaymentMethodsScreenProps = StackScreenProps<ProfileStackParamList, 'EditPaymentMethods'>;

export default function EditPaymentMethodsScreen({ route, navigation }: EditPaymentMethodsScreenProps) {
  // Obter os dados de métodos de pagamento passados via rota
  const { paymentMethods: initialPaymentMethods } = route.params;

  const [pixEnabled, setPixEnabled] = useState(initialPaymentMethods.pix);
  const [creditCardEnabled, setCreditCardEnabled] = useState(initialPaymentMethods.creditCard);
  const [debitCardEnabled, setDebitCardEnabled] = useState(initialPaymentMethods.debitCard);

  // ESTADOS PARA CONTROLAR A VISIBILIDADE DO MODAL DE SUCESSO
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');


  const handleSave = async () => { // <--- AGORA É ASYNC
    const updatedPaymentMethods: PaymentMethods = {
      pix: pixEnabled,
      creditCard: creditCardEnabled,
      debitCard: debitCardEnabled,
    };

    let success = false;

    // --- CÓDIGO REAL (COM BACKEND) - COMENTADO ---
    /*
    try {
      console.log('Tentando salvar métodos de pagamento no backend:', updatedPaymentMethods);
      const response = await fetch('https://sua-api.com/perfil/metodos-pagamento', {
        method: 'PUT', // Geralmente PUT para atualização
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${seuTokenDeAutenticacao}`,
        },
        body: JSON.stringify(updatedPaymentMethods),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Métodos de pagamento salvos com sucesso no backend:', responseData);
        success = true;
      } else {
        const errorData = await response.json();
        console.error('Erro ao salvar métodos de pagamento no backend:', response.status, errorData);
        Alert.alert('Erro', `Não foi possível salvar os métodos de pagamento: ${errorData.message || 'Tente novamente.'}`);
        success = false;
      }
    } catch (error) {
      console.error('Erro de rede ou na requisição de salvar métodos de pagamento:', error);
      Alert.alert('Erro', 'Erro de conexão. Tente novamente.');
      success = false;
    }
    */
    // --- FIM DO CÓDIGO REAL (COM BACKEND) - COMENTADO ---

    // --- CÓDIGO DE SIMULAÇÃO (ATIVO) ---
    if (!success) {
      success = await simulateSavePaymentMethodsApi(updatedPaymentMethods);
    }
    // --- FIM DO CÓDIGO DE SIMULAÇÃO ---


    if (success) {
      setSuccessMessage('Métodos de pagamento atualizados com sucesso!');
      setSuccessModalVisible(true);
    } else {
      console.log('Falha ao salvar métodos de pagamento.');
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
      <Text style={styles.header}>Formas de Pagamento</Text>

      <Text style={styles.label}>Marque as opções de pagamento desejadas:</Text>

      <TouchableOpacity style={styles.checkboxRow} onPress={() => setPixEnabled(!pixEnabled)}>
        <Ionicons
          name={pixEnabled ? 'checkbox-outline' : 'square-outline'}
          size={24}
          color={pixEnabled ? '#19C37D' : '#888'}
        />
        <Text style={styles.checkboxText}>Pix</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.checkboxRow} onPress={() => setCreditCardEnabled(!creditCardEnabled)}>
        <Ionicons
          name={creditCardEnabled ? 'checkbox-outline' : 'square-outline'}
          size={24}
          color={creditCardEnabled ? '#19C37D' : '#888'}
        />
        <Text style={styles.checkboxText}>Cartão de crédito</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.checkboxRow} onPress={() => setDebitCardEnabled(!debitCardEnabled)}>
        <Ionicons
          name={debitCardEnabled ? 'checkbox-outline' : 'square-outline'}
          size={24}
          color={debitCardEnabled ? '#19C37D' : '#888'}
        />
        <Text style={styles.checkboxText}>Cartão de débito</Text>
      </TouchableOpacity>

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
    marginBottom: 16,
    color: '#333',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 4,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  checkboxText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#19C37D',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 30, // Mais espaço antes do botão de salvar
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
