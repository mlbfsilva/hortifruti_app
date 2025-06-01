import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';

const mockProducts = [
  { id: '1', name: 'Banana', type: 'Fruta', price: 5.9, unit: 'Kg' },
  { id: '2', name: 'Maçã', type: 'Fruta', price: 6.5, unit: 'Kg' },
  { id: '3', name: 'Alface', type: 'Verdura', price: 3.2, unit: 'Unidade' },
  { id: '4', name: 'Tomate', type: 'Fruta', price: 4.8, unit: 'Kg' },
];

// Defina o tipo das rotas do seu stack
type RootStackParamList = {
  ProductList: undefined;
  EditProduct: { product: {
    id: string;
    name: string;
    type: string;
    price: number;
    unit: 'Kg' | 'Unid.' | string;
  }};
  // ... outras rotas se necessário
};

// Defina o tipo do navigation para esta tela
type ProductListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductList'
>;

type Props = {
  navigation: ProductListScreenNavigationProp;
};

export default function ProductListScreen({ navigation }: Props) {
  const [search, setSearch] = useState('');

  // Filtra os produtos conforme o texto digitado
  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Produtos</Text>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#888" style={{ marginLeft: 8 }} />
        <TextInput
          style={{ flex: 1, color: '#222', marginLeft: 8 }}
          placeholder="Pesquisar"
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.productName}>Produto: {item.name}</Text>
              <Text style={styles.productType}>Tipo: {item.type}</Text>
              <Text style={styles.productPrice}>Preço: R$ {item.price.toFixed(2)} {item.unit}</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProduct', { product: item })}
            >
              <Ionicons name="pencil" size={22} color="#444" />
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Adicionar Produto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 48,
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    height: 36,
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  productName: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 2,
  },
  productType: {
    color: '#666',
    fontSize: 14,
    marginBottom: 2,
  },
  productPrice: {
    color: '#222',
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#19C37D',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
}); 