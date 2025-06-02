import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
// IMPORTE OS SEUS STACKS E TELAS REAIS
import ProductStack from './ProductStack';
import ProfileStack from './ProfileStack';
// PedidosScreen e DashboardScreen não precisam ser importados se usarmos 'children' com View diretamente
// import PedidosScreen from '../screens/PedidosScreen';
// import DashboardScreen from '../screens/DashboardScreen';

const Tab = createBottomTabNavigator();



export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = '';
          if (route.name === 'Pedidos') iconName = 'list';
          else if (route.name === 'Dashboard') iconName = 'stats-chart';
          else if (route.name === 'Produtos') iconName = 'pricetags'; 
          else if (route.name === 'Perfil') iconName = 'person';    
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#222',
        tabBarInactiveTintColor: '#aaa',
        headerShown: false,
        
      })}
    >
      {/* TELAS DE PEDIDOS E DASHBOARD USAM 'children' COM View BRANCA */}
      <Tab.Screen name="Pedidos" children={() => (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }} /> // Tela branca
      )} />
      <Tab.Screen name="Dashboard" children={() => (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }} /> // Tela branca
      )} />

      {/* ABAS DE PRODUTOS E PERFIL */}
      <Tab.Screen name="Produtos" component={ProductStack} />
      <Tab.Screen name="Perfil" component={ProfileStack} />
    </Tab.Navigator>
  );
}
