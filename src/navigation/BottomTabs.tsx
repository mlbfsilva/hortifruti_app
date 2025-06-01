import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native'; // <--- Importe StyleSheet também

// IMPORTE OS SEUS STACKS REAIS
import ProductStack from './ProductStack';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();

// Componente Placeholder com fundo e texto bem visíveis para depuração
function Placeholder({ title }: { title: string }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'purple' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>{title}</Text>
    </View>
  );
}

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
      <Tab.Screen name="Pedidos" children={() => <Placeholder title="Pedidos" />} />
      <Tab.Screen name="Dashboard" children={() => <Placeholder title="Dashboard" />} />
      <Tab.Screen name="Produtos" component={ProductStack} />
      <Tab.Screen name="Perfil" component={ProfileStack} />
    </Tab.Navigator>
  );
}
