// src/screens/DashboardScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DashboardScreen() {
  console.log('DashboardScreen: Componente DashboardScreen montado!'); 
  return (
    <View style={styles.container}>
    
      {/* <Text style={styles.header}>Tela de Dashboard</Text> */}
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
