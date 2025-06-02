// src/navigation/ProfileStack.tsx
import React from 'react';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import StoreProfileScreen from '../screens/StoreProfileScreen';
import EditStoreInfoScreen from '../screens/EditStoreInfoScreen';
import EditAddressScreen from '../screens/EditAddressScreen';
import EditPaymentMethodsScreen from '../screens/EditPaymentMethodsScreen';
import PromotionsScreen from '../screens/PromotionsScreen';
import EditPromotionScreen from '../screens/EditPromotionScreen';


import { StoreProfile, StoreAddress, PaymentMethods, Promotion } from '../types/profile';

// 1. DEFINE E EXPORTE O TIPO DOS PARÂMETROS DA SUA PILHA DE PERFIL
export type ProfileStackParamList = {
  StoreProfile: { profile: StoreProfile };
  EditStoreInfo: { profile: StoreProfile };
  EditAddress: { address: StoreAddress };
  EditPaymentMethods: { paymentMethods: PaymentMethods };
  Promotions: undefined;
  // parâmetro 'promotion' opcional usando '?'
  EditPromotion: { promotion?: Promotion }; 
  // Outras rotas relacionadas ao perfil podem ser adicionadas aqui
};

// Passe o ProfileStackParamList para o createStackNavigator
const Stack = createStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="StoreProfile"
      screenOptions={{
        headerShown: false,
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
      <Stack.Screen
        name="Promotions"
        component={PromotionsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditPromotion"
        component={EditPromotionScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
