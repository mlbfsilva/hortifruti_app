// src/screens/PedidosScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PedidosScreen() {
  console.log('PedidosScreen: Componente PedidosScreen montado!'); 
  return (
    <View style={styles.container}>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Cor de fundo branca, completamente "em branco"
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
