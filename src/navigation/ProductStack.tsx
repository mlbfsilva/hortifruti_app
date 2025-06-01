import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'; // Importe o createStackNavigator
import ProductListScreen from '../screens/ProductListScreen';
import ProductEditScreen from '../screens/ProductEditScreen';
import ProductCreateScreen from '../screens/ProductCreateScreen';

// 1. DEFINE E EXPORTE O TIPO DOS PARÂMETROS DA SUA PILHA DE NAVEGAÇÃO
// Isso é crucial para que o TypeScript saiba quais rotas existem e quais parâmetros elas esperam.
export type ProductStackParamList = {
  ProductList: undefined; // A tela ProductList não recebe parâmetros
  EditProduct: { // A tela EditProduct espera um objeto 'product'
    product: {
      id: string;
      name: string;
      type: string;
      price: number;
      unit: 'Kg' | 'Unid.' | string;
    };
  };
  CreateProduct: undefined; // A tela CreateProduct não recebe parâmetros
};

// Passe o ProductStackParamList para o createStackNavigator
const Stack = createStackNavigator<ProductStackParamList>();

export default function ProductStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProduct"
        component={ProductEditScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateProduct"
        component={ProductCreateScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}