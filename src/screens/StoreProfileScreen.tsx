// src/screens/StoreProfileScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';

// Importar a lista de parâmetros do ProfileStack
import { ProfileStackParamList } from '../navigation/ProfileStack'; // Ajuste o caminho se necessário

// IMPORTAR OS TIPOS DE PERFIL DIRETAMENTE DE 'src/types/profile.ts'
import { StoreProfile, StoreAddress, PaymentMethods } from '../types/profile'; // <--- CORREÇÃO AQUI

// Definir o tipo das props para esta tela, usando ProfileStackParamList
type StoreProfileScreenProps = StackScreenProps<ProfileStackParamList, 'StoreProfile'>;

// Dados mockados para simular o perfil da loja (você substituirá isso por dados reais)
const mockStoreProfile: StoreProfile = {
  id: 'store-123',
  name: 'Hortifruti Gostinho Bom',
  email: 'hortifrutigostinhobom.com.br',
  phone: '(XX) XXXX-XXXX', // Exemplo
  status: 'Aberto',
  openingHours: {
    from: '09:00',
    to: '17:00',
  },
};

const mockStoreAddress: StoreAddress = {
  cep: '99999-999',
  state: 'Distrito Federal',
  city: 'Taguatinga',
  street: 'QS 07',
  number: 'S/N', // Exemplo
  complement: 'Loja',
};

const mockPaymentMethods: PaymentMethods = {
  pix: true,
  creditCard: true,
  debitCard: true,
};

export default function StoreProfileScreen({ navigation }: StoreProfileScreenProps) {
  // Para fins de demonstração, estamos usando dados mockados.
  // Em um aplicativo real, você carregaria esses dados de um estado global ou API.
  const profile = mockStoreProfile;
  const address = mockStoreAddress;
  const paymentMethods = mockPaymentMethods;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Perfil da Loja</Text>

      <View style={styles.profileHeader}>
        <View style={styles.imagePlaceholder}>
          <Ionicons name="camera" size={40} color="#888" />
        </View>
        <Text style={styles.storeName}>{profile.name}</Text>
        <Text style={styles.storeStatus}>Status: {profile.status}</Text>
      </View>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('EditStoreInfo', { profile: profile })}
      >
        <Text style={styles.menuItemText}>Informações de Loja</Text>
        <Ionicons name="chevron-forward" size={24} color="#888" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('EditAddress', { address: address })}
      >
        <Text style={styles.menuItemText}>Endereço da Loja</Text>
        <Ionicons name="chevron-forward" size={24} color="#888" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('EditPaymentMethods', { paymentMethods: paymentMethods })}
      >
        <Text style={styles.menuItemText}>Formas de Pagamento</Text>
        <Ionicons name="chevron-forward" size={24} color="#888" />
      </TouchableOpacity>

      {/* Adicione outras opções de menu aqui, como "Promoções" ou "Sair" */}
      <TouchableOpacity style={[styles.menuItem, styles.logoutButton]}>
        <Text style={[styles.menuItemText, styles.logoutButtonText]}>Sair</Text>
        <Ionicons name="log-out-outline" size={24} color="#FF6347" />
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
  header: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  imagePlaceholder: {
    backgroundColor: '#f2f2f2',
    borderRadius: 50,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  storeName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  storeStatus: {
    fontSize: 16,
    color: '#19C37D', // Cor para status "Aberto"
    fontWeight: '500',
    marginTop: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#ffe6e6', // Fundo mais claro para o botão de sair
    borderColor: '#FF6347',
    borderWidth: 1,
  },
  logoutButtonText: {
    color: '#FF6347',
    fontWeight: '600',
  },
});
