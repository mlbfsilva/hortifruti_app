// components/Carrossel.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function Carrossel() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      <View style={styles.card}>
        <Card1/>
        <TouchableOpacity style={styles.botao}>
          <Text style={styles.textoBotao}>Pedir novamente</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function Card1(){
  return <View style={[styles.card,{backgroundColor: '#fff'}]}/>;
}

function Botao(){
  return <View style={[styles.botao]}/>
}
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  card: {
    width: 200,
    height: 108,
    flexShrink: 0,
    borderRadius: 10,
    padding: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },  
  botao: {
    backgroundColor: '#999',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 5,
  },
  textoBotao: {
    color: 'white',
    fontSize: 12,
  },
});
