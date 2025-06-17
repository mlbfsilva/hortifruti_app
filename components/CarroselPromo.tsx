import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, ViewStyle } from 'react-native';
import { ResponsiveCard } from './Responsivecard';

const { width: screenWidth } = Dimensions.get('window');

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

// Componente Separador de Itens para CarroselCategorias
const CategoriaItemSeparator = () => <View style={{ width: 12 }} />;

export const CarroselCategorias = () => {
  const renderItem = ({ item, index }: { item: Categoria; index: number }) => {
    const ITEM_SPACING = 12; // Espaçamento entre os cartões
    const isLastItem = index === categorias.length - 1; // Verifica se é o último item
    const marginRight = isLastItem ? 0 : ITEM_SPACING; // Define marginRight condicionalmente

    return (
      <ResponsiveCard style={{ ...styles.box, marginRight } as ViewStyle}>
        <Text style={styles.cardText}>{item.title}</Text>
      </ResponsiveCard>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.getStartedText}>Promoção do dia:</Text>
      
      <FlatList
        data={categorias}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        renderItem={renderItem}
        ItemSeparatorComponent={CategoriaItemSeparator}
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
    paddingHorizontal: 16,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
    marginVertical: 30,
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '400',
  },
});

export default CarroselCategorias;
