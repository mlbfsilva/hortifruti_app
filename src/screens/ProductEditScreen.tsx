// src/screens/ProductEditScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from 'react-native'; // <--- IMPORTAR Image
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';

import { ProductStackParamList } from '../navigation/ProductStack';
import ConfirmationModal from '../components/ConfirmationModal';
import SuccessModal from '../components/SuccessModal';

import { Product } from '../types/product';

type ProductEditScreenProps = StackScreenProps<ProductStackParamList, 'EditProduct'>;

// --- DADOS MOCKADOS (SIMULANDO UM BANCO DE DADOS/API) ---
export let mockProductsData: Product[] = [
  { id: '1', name: 'Banana', type: 'Fruta', price: 5.9, unit: 'Kg', imageUrl: require('../assets/images/banana.png') },
  { id: '2', name: 'Maçã', type: 'Fruta', price: 6.5, unit: 'Kg', imageUrl: require('../assets/images/maca.png') },
  { id: '3', name: 'Alface', type: 'Verdura', price: 3.2, unit: 'Unid.', imageUrl: require('../assets/images/alface.png') },
  { id: '4', name: 'Tomate', type: 'Fruta', price: 4.8, unit: 'Kg', imageUrl: require('../assets/images/tomate.png') },
];

// Função simulada para remover um produto
const simulateDeleteProductApi = async (productId: string): Promise<boolean> => { /* ... */ return true; };
// Função simulada para salvar/atualizar um produto
const simulateSaveProductApi = async (updatedProduct: Product): Promise<boolean> => { /* ... */ return true; };
// --- FIM DOS DADOS MOCKADOS ---


export default function ProductEditScreen({ route, navigation }: ProductEditScreenProps) {
  const { product: initialProduct } = route.params;

  const [unit, setUnit] = useState<'Kg' | 'Unid.'>(initialProduct.unit === 'Kg' ? 'Kg' : 'Unid.');
  const [name, setName] = useState(initialProduct.name);
  const [type, setType] = useState(initialProduct.type);
  const [price, setPrice] = useState(initialProduct.price.toString().replace('.', ','));

  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');


  const handleSave = async () => { /* ... */ };
  const handleAdvanceFromSuccessModal = () => { /* ... */ };
  const handleDelete = () => { /* ... */ };
  const confirmDelete = async () => { /* ... */ };
  const cancelDelete = () => { /* ... */ };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Editar Produto</Text>

      {/* NOVO: EXIBIR IMAGEM DO PRODUTO OU PLACEHOLDER DA CÂMERA */}
      {initialProduct.imageUrl ? (
        <Image source={initialProduct.imageUrl} style={styles.productImage} />
      ) : (
        <TouchableOpacity style={styles.imagePicker}>
          <Ionicons name="camera" size={40} color="#888" />
        </TouchableOpacity>
      )}

      <Text style={styles.label}>Produto:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Tipo:</Text>
      <TextInput style={styles.input} value={type} onChangeText={setType} />
      <Text style={styles.label}>Preço:</Text>
      <View style={styles.priceRow}>
        <TextInput
          style={[styles.input, { flex: 1, marginRight: 8 }]}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={[styles.unitButton, unit === 'Kg' && styles.unitButtonActive]}
          onPress={() => setUnit('Kg')}
        >
          <Text style={[styles.unitButtonText, unit === 'Kg' && styles.unitButtonTextActive]}>Kg</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.unitButton, unit === 'Unid.' && styles.unitButtonActive]}
          onPress={() => setUnit('Unid.')}
        >
          <Text style={[styles.unitButtonText, unit === 'Unid.' && styles.unitButtonTextActive]}>Unid.</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar Alterações</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Excluir Produto</Text>
      </TouchableOpacity>

      <ConfirmationModal
        isVisible={isDeleteModalVisible}
        title="Excluir Produto"
        message={`Tem certeza que deseja excluir "${initialProduct.name}"?`}
        confirmText="Sim, Excluir"
        cancelText="Não"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        confirmButtonColor="#FF6347"
        confirmButtonTextColor="white"
      />

      <SuccessModal
        isVisible={isSuccessModalVisible}
        onAdvance={handleAdvanceFromSuccessModal}
        message={successMessage}
      />
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
  imagePicker: { // Estilo para o placeholder da câmera
    alignSelf: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 16,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  productImage: { // NOVO: Estilo para a imagem do produto
    alignSelf: 'center',
    width: 80,
    height: 80,
    borderRadius: 16,
    marginBottom: 24,
    resizeMode: 'cover', // Garante que a imagem preencha o espaço
  },
  label: {
    fontWeight: '500',
    fontSize: 15,
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    fontSize: 15,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  unitButton: {
    borderWidth: 1,
    borderColor: '#19C37D',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: 4,
    backgroundColor: '#fff',
  },
  unitButtonActive: {
    backgroundColor: '#19C37D',
  },
  unitButtonText: {
    color: '#19C37D',
    fontWeight: '600',
  },
  unitButtonTextActive: {
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#19C37D',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
