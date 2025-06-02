import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ProductsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Produtos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666',
  },
});