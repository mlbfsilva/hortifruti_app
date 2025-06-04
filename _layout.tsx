// app/_layout.tsx

import { Tabs } from 'expo-router';

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2196F3',
      }}
    >
      <Tabs.Screen
        name="pedidos"
        options={{
          title: 'Pedidos',
          tabBarIcon: () => '📋',
        }}
      />

      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: () => '📊',
        }}
      />

      <Tabs.Screen
        name="produtos"
        options={{
          title: 'Produtos',
          tabBarIcon: () => '📦',
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: () => '👤',
        }}
      />
    </Tabs>
  );
}