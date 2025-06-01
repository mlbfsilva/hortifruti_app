// src/screens/EditPaymentMethodsScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';

// Importar a lista de parâmetros do ProfileStack
import { ProfileStackParamList } from '../navigation/ProfileStack'; // Ajuste o caminho se necessário

// IMPORTAR O TIPO 'PaymentMethods' DIRETAMENTE DE 'src/types/profile.ts'
import { PaymentMethods } from '../types/profile'; // <--- CORREÇÃO AQUI

// Definir o tipo das props para esta tela
type EditPaymentMethodsScreenProps = StackScreenProps<ProfileStackParamList, 'EditPaymentMethods'>;

export default function EditPaymentMethodsScreen({ route, navigation }: EditPaymentMethodsScreenProps) {
  // Obter os métodos de pagamento passados via rota
  const { paymentMethods: initialPaymentMethods } = route.params;

  const [pixEnabled, setPixEnabled] = useState(initialPaymentMethods.pix);
  const [creditCardEnabled, setCreditCardEnabled] = useState(initialPaymentMethods.creditCard);
  const [debitCardEnabled, setDebitCardEnabled] = useState(initialPaymentMethods.debitCard);

  const handleSave = () => {
    // Aqui você implementaria a lógica para salvar os métodos de pagamento atualizados
    const updatedPaymentMethods: PaymentMethods = {
      pix: pixEnabled,
      creditCard: creditCardEnabled,
      debitCard: debitCardEnabled,
    };
    console.log('Métodos de pagamento atualizados:', updatedPaymentMethods);
    Alert.alert('Sucesso', 'Formas de pagamento atualizadas com sucesso!');
    navigation.goBack();
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
