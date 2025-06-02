// src/navigation/ProfileStack.tsx
import React from 'react';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import StoreProfileScreen from '../screens/StoreProfileScreen';
import EditStoreInfoScreen from '../screens/EditStoreInfoScreen';
import EditAddressScreen from '../screens/EditAddressScreen';
import EditPaymentMethodsScreen from '../screens/EditPaymentMethodsScreen';
// NOVAS IMPORTAÇÕES PARA AS TELAS DE PROMOÇÃO
import PromotionsScreen from '../screens/PromotionsScreen'; // Vamos criar esta tela
import EditPromotionScreen from '../screens/EditPromotionScreen'; // Vamos criar esta tela


// Importar os tipos de perfil e o novo tipo Promotion
import { StoreProfile, StoreAddress, PaymentMethods, Promotion } from '../types/profile';

// 1. DEFINE E EXPORTE O TIPO DOS PARÂMETROS DA SUA PILHA DE PERFIL
export type ProfileStackParamList = {
  StoreProfile: { profile: StoreProfile };
  EditStoreInfo: { profile: StoreProfile };
  EditAddress: { address: StoreAddress };
  EditPaymentMethods: { paymentMethods: PaymentMethods };
  // NOVAS ROTAS PARA PROMOÇÕES
  Promotions: undefined; // A tela de lista de promoções não recebe parâmetros iniciais
  EditPromotion: { promotion: Promotion }; // A tela de edição de promoção recebe um objeto Promotion
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
        // contentStyle: { backgroundColor: 'lightgreen' }, // Remova esta linha de depuração se ainda estiver aqui
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
      {/* NOVAS TELAS DE PROMOÇÃO */}
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
