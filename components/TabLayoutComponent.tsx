import React from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from './useColorScheme';
import { useClientOnlyValue } from './useClientOnlyValue';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Entypo>['name'];
  color: string;
  size?: number;
}) {
  return <Entypo style={{ marginBottom: -3 }} {...props} />;
}

interface TabLayoutComponentProps {
  // Você pode adicionar props específicas aqui se precisar personalizar algo
  showHeader?: boolean;
}

export default function TabLayoutComponent({ showHeader = false }: TabLayoutComponentProps) {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: showHeader ? useClientOnlyValue(false, true) : false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="buscar"
        options={{
          title: 'Buscar',
          tabBarIcon: ({ color }) => <TabBarIcon name="magnifying-glass" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="pedidos"
        options={{
          title: 'Pedidos',
          tabBarIcon: ({ color }) => <TabBarIcon name="clipboard" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
} 