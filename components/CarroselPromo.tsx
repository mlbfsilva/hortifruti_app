import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

type Categoria = {
  id: string;
  title: string;
};

const categorias: Categoria[] = [
  { id: "1", title: "Frutas" },
  { id: "2", title: "Grãos e produtos naturais" },
  { id: "3", title: "Hortaliças" },
  { id: "4", title: "Raízes e temperos" }, 
];

export const CarroselCategorias = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.getStartedText}>Promoção do dia:</Text>
      
      <FlatList
        data={categorias}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item }) => (
          <View style={styles.box}>
            <Text style={styles.cardText}>{item.title}</Text> {}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
    marginVertical: 30,
  },
  flatListContent: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  box: {
    height: 80,
    width: 180,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.10)',
    backgroundColor: '#FCFCFE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '400',
  },
});

export default CarroselCategorias;
