import { Stack } from 'expo-router';

export default function PedidosLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="approve" />
      <Stack.Screen name="recurring" />
    </Stack>
  );
} 