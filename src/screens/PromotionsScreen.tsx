// src/screens/PromotionsScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'; // <--- IMPORTAR Image
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

import { ProfileStackParamList } from '../navigation/ProfileStack';
import { Promotion } from '../types/profile';

// --- DADOS MOCKADOS (SIMULANDO UM BANCO DE DADOS/API) ---
// Adicionando imagens fictícias para as promoções.
// Certifique-se de que estas imagens existem em src/assets/images/
export let mockPromotionsData: Promotion[] = [
  { id: 'promo1', productId: '1', productName: 'Banana', productType: 'Fruta', promotionPrice: 1.99, unit: 'Kg', imageUrl: require('../assets/images/banana.png') }, // <--- COM IMAGEM
  { id: 'promo2', productId: '2', productName: 'Maçã', productType: 'Fruta', promotionPrice: 1.50, unit: 'Kg', imageUrl: require('../assets/images/maca.png') },     // <--- COM IMAGEM
  { id: 'promo3', productId: '3', productName: 'Alface', productType: 'Verdura', promotionPrice: 0.99, unit: 'Unid.', imageUrl: require('../assets/images/alface.png') }, // <--- COM IMAGEM
];
// --- FIM DOS DADOS MOCKADOS ---

type PromotionsScreenProps = StackScreenProps<ProfileStackParamList, 'Promotions'>;

export default function PromotionsScreen({ navigation }: PromotionsScreenProps) {
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  useFocusEffect(
    useCallback(() => {
      setPromotions([...mockPromotionsData]);
      return () => {};
    }, [])
  );

  const handleAddPromotion = () => {
    navigation.navigate('EditPromotion', {});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={28} color="#333" />
      </TouchableOpacity>
      <Text style={styles.header}>Promoções</Text>

      <Text style={styles.subHeader}>Adicione as promoções sobre seus produtos:</Text>

      <FlatList
        data={promotions}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={({ item }) => (
          <View style={styles.promotionCard}>
            {/* NOVO: EXIBIR IMAGEM */}
            {item.imageUrl && ( // Verifica se a imagem existe
              <Image source={item.imageUrl} style={styles.promotionImage} />
            )}
            <View style={styles.promotionInfo}>
              <Text style={styles.promotionText}>Produto: {item.productName}</Text>
              <Text style={styles.promotionText}>Promoção: R$ {item.promotionPrice.toFixed(2)} {item.unit}</Text>
            </View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate('EditPromotion', { promotion: item })}
            >
              <Ionicons name="pencil-outline" size={22} color="#444" />
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddPromotion}
      >
        <Text style={styles.addButtonText}>Adicionar Promoção</Text>
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  subHeader: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  promotionCard: {
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
  // NOVO: Estilo para a imagem da promoção
  promotionImage: {
    width: 60, // Ajuste o tamanho conforme o design
    height: 60,
    borderRadius: 8, // Borda arredondada para a imagem
    marginRight: 16,
  },
  promotionInfo: {
    flex: 1,
  },
  promotionText: {
    fontSize: 15,
    color: '#333',
    marginBottom: 4,
  },
  editButton: {
    padding: 8,
  },
  addButton: {
    backgroundColor: '#19C37D',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 16,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
