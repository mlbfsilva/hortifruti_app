// src/screens/StoreProfileScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

import { ProfileStackParamList } from '../navigation/ProfileStack';
import { StoreProfile, StoreAddress, PaymentMethods } from '../types/profile';

import ExitConfirmationModal from '../components/ExitConfirmationModal';

// --- DADOS MOCKADOS (SIMULANDO UM BANCO DE DADOS/API) ---
export let mockStoreProfile: StoreProfile = {
  id: 'store-123',
  name: 'Hortifruti Gostinho Bom',
  email: 'hortifrutigostinhobom.com.br',
  phone: '(XX) XXXX-XXXX',
  status: 'Aberto', // O status inicial pode ser definido aqui, mas será atualizado
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

const getStoreStatus = (openingHours: { from: string; to: string }): 'Aberto' | 'Fechado' | 'Em Férias' => {
  console.log('getStoreStatus: Horário de funcionamento recebido:', openingHours);

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  console.log(`getStoreStatus: Horário atual do dispositivo: ${currentHour}:${currentMinute}`);

  const [openHour, openMinute] = openingHours.from.split(':').map(Number);
  const [closeHour, closeMinute] = openingHours.to.split(':').map(Number);

  console.log(`getStoreStatus: Horário de abertura parseado: ${openHour}:${openMinute}`);
  console.log(`getStoreStatus: Horário de fechamento parseado: ${closeHour}:${closeMinute}`);


  const currentTimeInMinutes = currentHour * 60 + currentMinute;
  const openTimeInMinutes = openHour * 60 + openMinute;
  const closeTimeInMinutes = closeHour * 60 + closeMinute;

  console.log(`getStoreStatus: Tempo atual em minutos: ${currentTimeInMinutes}`);
  console.log(`getStoreStatus: Tempo de abertura em minutos: ${openTimeInMinutes}`);
  console.log(`getStoreStatus: Tempo de fechamento em minutos: ${closeTimeInMinutes}`);


  // Ajuste para lidar com horários de fechamento no dia seguinte (ex: abre 22h, fecha 04h)
  if (openTimeInMinutes > closeTimeInMinutes) {
    if (currentTimeInMinutes >= openTimeInMinutes || currentTimeInMinutes <= closeTimeInMinutes) {
      console.log('getStoreStatus: Retornando: Aberto (passa meia-noite)');
      return 'Aberto';
    } else {
      console.log('getStoreStatus: Retornando: Fechado (passa meia-noite)');
      return 'Fechado';
    }
  } else {
    if (currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes <= closeTimeInMinutes) {
      console.log('getStoreStatus: Retornando: Aberto');
      return 'Aberto';
    } else {
      console.log('getStoreStatus: Retornando: Fechado');
      return 'Fechado';
    }
  }
};


export default function StoreProfileScreen({ navigation }: StoreProfileScreenProps) {
  const [profileData, setProfileData] = useState<StoreProfile>(mockStoreProfile);
  const [addressData, setAddressData] = useState<StoreAddress>(mockStoreAddress);
  const [paymentMethodsData, setPaymentMethodsData] = useState<PaymentMethods>(mockPaymentMethods);

  useFocusEffect(
    useCallback(() => {
      console.log('StoreProfileScreen: useFocusEffect acionado.'); // <--- CONSOLE.LOG
      console.log('StoreProfileScreen: mockStoreProfile.openingHours no foco:', mockStoreProfile.openingHours); // <--- CONSOLE.LOG

      const currentCalculatedStatus = getStoreStatus(mockStoreProfile.openingHours);
      setProfileData({ ...mockStoreProfile, status: currentCalculatedStatus });
      setAddressData({ ...mockStoreAddress });
      setPaymentMethodsData({ ...mockPaymentMethods });

      const intervalId = setInterval(() => {
        console.log('StoreProfileScreen: setInterval - mockStoreProfile.openingHours:', mockStoreProfile.openingHours); // <--- CONSOLE.LOG
        const updatedStatus = getStoreStatus(mockStoreProfile.openingHours);
        if (updatedStatus !== mockStoreProfile.status) {
          mockStoreProfile.status = updatedStatus;
          setProfileData({ ...mockStoreProfile });
        }
      }, 60 * 1000); // A cada 1 minuto

      return () => {
        clearInterval(intervalId);
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
        <Text style={[
            styles.storeStatus,
            profileData.status === 'Fechado' && styles.statusClosed,
            profileData.status === 'Em Férias' && styles.statusVacation,
          ]}
        >
          Status: {profileData.status}
        </Text>
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
  statusClosed: {
    color: '#FF6347',
  },
  statusVacation: {
    color: '#FFA500',
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
