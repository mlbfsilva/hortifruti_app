import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

import { ProductStackParamList } from '../navigation/ProductStack';
import { Product } from '../types/product';

import { mockProductsData as globalMockProductsData } from './ProductEditScreen';

type ProductListScreenNavigationProp = StackNavigationProp<
  ProductStackParamList,
  'ProductList'
>;

type Props = {
  navigation: ProductListScreenNavigationProp;
};

export default function ProductListScreen({ navigation }: Props) {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  useFocusEffect(
    useCallback(() => {
      setProducts([...globalMockProductsData]);
      return () => {};
    }, [])
  );

  const filteredProducts = products.filter(product =>
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
        renderItem={({ item }) => {
          console.log('Renderizando imagem:', item.imageUrl); 
          return (
            <View style={styles.card}>
              {item.imageUrl && (
                <Image source={item.imageUrl} style={styles.productImage} />
              )}
              <View style={styles.productInfo}>
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
          );
        }}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateProduct')}
      >
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
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
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