// src/navigation/ProfileStack.tsx
import React from 'react';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import StoreProfileScreen from '../screens/StoreProfileScreen';
import EditStoreInfoScreen from '../screens/EditStoreInfoScreen';
import EditAddressScreen from '../screens/EditAddressScreen';
import EditPaymentMethodsScreen from '../screens/EditPaymentMethodsScreen';

// Importar os tipos de perfil
import { StoreProfile, StoreAddress, PaymentMethods } from '../types/profile';

export type ProfileStackParamList = {
  StoreProfile: { profile: StoreProfile };
  EditStoreInfo: { profile: StoreProfile };
  EditAddress: { address: StoreAddress };
  EditPaymentMethods: { paymentMethods: PaymentMethods };
};

const Stack = createStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
  return (
    // Adicione um estilo para o container do navegador para depuração
    <Stack.Navigator
      initialRouteName="StoreProfile"
      screenOptions={{
        headerShown: false, // <--- ADIÇÃO AQUI: Fundo da tela do stack
      }}
    >
      <Stack.Screen
        name="StoreProfile"
        component={StoreProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditStoreInfo"
        component={EditStoreInfoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditAddress"
        component={EditAddressScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditPaymentMethods"
        component={EditPaymentMethodsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
