// src/screens/PromotionsScreen.tsx
import React, { useState } from 'react'; // Importar useState
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native'; // <--- IMPORTAR useFocusEffect
import { useCallback } from 'react'; // <--- IMPORTAR useCallback

import { ProfileStackParamList } from '../navigation/ProfileStack';
import { Promotion } from '../types/profile';

// --- DADOS MOCKADOS (SIMULANDO UM BANCO DE DADOS/API) ---
// Em um aplicativo real, esta lista viria de um estado global ou de uma API.
// Para este exemplo, vamos simular a remoção daqui.
export let mockPromotionsData: Promotion[] = [ // <--- ADICIONAR 'export' AQUI
  { id: 'promo1', productId: '1', productName: 'Banana', productType: 'Fruta', promotionPrice: 1.99, unit: 'Kg' },
  { id: 'promo2', productId: '2', productName: 'Maçã', productType: 'Fruta', promotionPrice: 1.50, unit: 'Kg' },
  { id: 'promo3', productId: '3', productName: 'Alface', productType: 'Verdura', promotionPrice: 0.99, unit: 'Unid.' },
];
// --- FIM DOS DADOS MOCKADOS ---

// Definir o tipo das props para esta tela
type PromotionsScreenProps = StackScreenProps<ProfileStackParamList, 'Promotions'>;

export default function PromotionsScreen({ navigation }: PromotionsScreenProps) {
  const [promotions, setPromotions] = useState<Promotion[]>([]); // <--- NOVO: Estado para a lista de promoções

  // Use useFocusEffect para recarregar os dados sempre que a tela for focada
  useFocusEffect(
    useCallback(() => {
      // Quando a tela é focada, atualize a lista de promoções com os dados globais mockados
      setPromotions(mockPromotionsData); // <--- ATUALIZA O ESTADO COM OS DADOS GLOBAIS
      return () => {
        // Opcional: Lógica de limpeza quando a tela perde o foco
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={28} color="#333" />
      </TouchableOpacity>
      <Text style={styles.header}>Promoções</Text>

      <Text style={styles.subHeader}>Adicione as promoções sobre seus produtos:</Text>

      <FlatList
        data={promotions} // <--- USAR O ESTADO 'promotions'
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={({ item }) => (
          <View style={styles.promotionCard}>
            <View style={styles.imagePlaceholder} />
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
        onPress={() => { /* Lógica para adicionar nova promoção (navegar para EditPromotion sem params) */ }}
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
  imagePlaceholder: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    width: 60,
    height: 60,
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