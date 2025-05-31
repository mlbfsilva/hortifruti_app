import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ProductListScreen from '../screens/ProductListScreen';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

function Placeholder({ title }: { title: string }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{title}</Text>
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
      <Tab.Screen name="Produtos" component={ProductListScreen} />
      <Tab.Screen name="Perfil" children={() => <Placeholder title="Perfil" />} />
    </Tab.Navigator>
  );
} 