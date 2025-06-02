import { Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          paddingVertical: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: '#666',
      }}
    >
      {/* Aba "Pedidos" */}
      <Tabs.Screen
        name="(tabs)/pedidos"
        options={{
          title: 'Pedidos',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>📋</Text>
          ),
        }}
      />

      {/* Aba "Dashboard" */}
      <Tabs.Screen
        name="(tabs)/dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>📊</Text>
          ),
        }}
      />

      {/* Aba "Produtos" */}
      <Tabs.Screen
        name="(tabs)/produtos"
        options={{
          title: 'Produtos',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>📦</Text>
          ),
        }}
      />

      {/* Aba "Perfil" */}
      <Tabs.Screen
        name="(tabs)/perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>👤</Text>
          ),
        }}
      />
    </Tabs>
  );
}