// src/screens/StoreProfileScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

import { ProfileStackParamList } from '../navigation/ProfileStack';
import { StoreProfile, StoreAddress, PaymentMethods } from '../types/profile';

import ExitConfirmationModal from '../components/ExitConfirmationModal';

// --- DADOS MOCKADOS (SIMULANDO UM BANCO DE DADOS/API) ---
// AGORA EXPORTAMOS E USAMOS 'let' para que possam ser modificados e importados
export let mockStoreProfile: StoreProfile = {
  id: 'store-123',
  name: 'Hortifruti Gostinho Bom',
  email: 'hortifrutigostinhobom.com.br',
  phone: '(XX) XXXX-XXXX',
  status: 'Aberto',
  openingHours: {
    from: '09:00',
    to: '17:00',
  },
};

export let mockStoreAddress: StoreAddress = {
  cep: '99999-999',
  state: 'Distrito Federal',
  city: 'Taguatinga',
  street: 'QS 07',
  number: 'S/N',
  complement: 'Loja',
};

export let mockPaymentMethods: PaymentMethods = {
  pix: true,
  creditCard: true,
  debitCard: true,
};
// --- FIM DOS DADOS MOCKADOS ---


type StoreProfileScreenProps = StackScreenProps<ProfileStackParamList, 'StoreProfile'>;

export default function StoreProfileScreen({ navigation }: StoreProfileScreenProps) {
  // Use estados locais para os dados do perfil, endereço e métodos de pagamento
  // Eles serão atualizados via useFocusEffect
  const [profileData, setProfileData] = useState<StoreProfile>(mockStoreProfile);
  const [addressData, setAddressData] = useState<StoreAddress>(mockStoreAddress);
  const [paymentMethodsData, setPaymentMethodsData] = useState<PaymentMethods>(mockPaymentMethods);

  // Use useFocusEffect para recarregar os dados sempre que a tela for focada
  useFocusEffect(
    useCallback(() => {
      // Crie uma NOVA instância de objeto a partir dos dados globais mutáveis
      setProfileData({ ...mockStoreProfile }); // <--- CHAVE DA CORREÇÃO: Usar spread para criar nova referência
      setAddressData({ ...mockStoreAddress }); // <--- CHAVE DA CORREÇÃO: Usar spread para criar nova referência
      setPaymentMethodsData({ ...mockPaymentMethods }); // Já estava correto, mas mantendo o padrão
      return () => {
        // Opcional: Lógica de limpeza quando a tela perde o foco
      };
    }, [])
  );


  const [isExitModalVisible, setExitModalVisible] = useState(false);

  const handleLogout = () => {
    setExitModalVisible(true);
  };

  const confirmLogout = () => {
    setExitModalVisible(false);
    console.log('Usuário confirmou a saída da conta!');
  };

  const cancelLogout = () => {
    setExitModalVisible(false);
    console.log('Saída cancelada.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Perfil da Loja</Text>

      <View style={styles.profileHeader}>
        <View style={styles.imagePlaceholder}>
          <Ionicons name="camera" size={40} color="#888" />
        </View>
        <Text style={styles.storeName}>{profileData.name}</Text>
        <Text style={styles.storeStatus}>Status: {profileData.status}</Text>
      </View>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('EditStoreInfo', { profile: profileData })}
      >
        <Text style={styles.menuItemText}>Informações de Loja</Text>
        <Ionicons name="chevron-forward" size={24} color="#888" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('EditAddress', { address: addressData })}
      >
        <Text style={styles.menuItemText}>Endereço da Loja</Text>
        <Ionicons name="chevron-forward" size={24} color="#888" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('EditPaymentMethods', { paymentMethods: paymentMethodsData })}
      >
        <Text style={styles.menuItemText}>Formas de Pagamento</Text>
        <Ionicons name="chevron-forward" size={24} color="#888" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('Promotions')}
      >
        <Text style={styles.menuItemText}>Promoções</Text>
        <Ionicons name="pricetags-outline" size={24} color="#888" />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.menuItem, styles.logoutButton]} onPress={handleLogout}>
        <Text style={[styles.menuItemText, styles.logoutButtonText]}>Sair</Text>
        <Ionicons name="log-out-outline" size={24} color="#FF6347" />
      </TouchableOpacity>

      <ExitConfirmationModal
        isVisible={isExitModalVisible}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
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
    color: '#19C37D',
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
    backgroundColor: '#ffe6e6',
    borderColor: '#FF6347',
    borderWidth: 1,
  },
  logoutButtonText: {
    color: '#FF6347',
    fontWeight: '600',
  },
});
