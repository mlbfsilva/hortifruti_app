// src/screens/ProductEditScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';

import { ProductStackParamList } from '../navigation/ProductStack';
import ConfirmationModal from '../components/ConfirmationModal';
import SuccessModal from '../components/SuccessModal';

import { Product } from '../types/product'; // Certifique-se de que o tipo Product está importado

// Definição do tipo das props para esta tela
type ProductEditScreenProps = StackScreenProps<ProductStackParamList, 'EditProduct'>;

// --- DADOS MOCKADOS (AGORA COM IMAGENS LOCAIS) ---
// Certifique-se de que as imagens estão na pasta src/assets/images/
export let mockProductsData: Product[] = [ // 'export' é necessário para ProductListScreen
  { id: '1', name: 'Banana', type: 'Fruta', price: 5.9, unit: 'Kg', imageUrl: require('../assets/images/banana.png') },
  { id: '2', name: 'Maçã', type: 'Fruta', price: 6.5, unit: 'Kg', imageUrl: require('../assets/images/maca.png') },
  { id: '3', name: 'Alface', type: 'Verdura', price: 3.2, unit: 'Unid.', imageUrl: require('../assets/images/alface.png') },
  { id: '4', name: 'Tomate', type: 'Fruta', price: 4.8, unit: 'Kg', imageUrl: require('../assets/images/tomate.png') },
];

// Função simulada para remover um produto (simula uma chamada de API)
const simulateDeleteProductApi = async (productId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => { // Simula um atraso de rede
      const initialLength = mockProductsData.length;
      mockProductsData = mockProductsData.filter(p => p.id !== productId);
      if (mockProductsData.length < initialLength) {
        console.log(`Produto ${productId} removido da lista mockada.`);
        resolve(true); // Sucesso
      } else {
        console.log(`Produto ${productId} não encontrado na lista mockada.`);
        resolve(false); // Falha (não encontrado)
      }
    }, 500); // 0.5 segundos de atraso
  });
};

// Função simulada para salvar/atualizar um produto
const simulateSaveProductApi = async (updatedProduct: Product): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockProductsData.findIndex(p => p.id === updatedProduct.id);
      if (index > -1) {
        mockProductsData[index] = updatedProduct; // Atualiza o produto existente
        console.log('simulateSaveProductApi: Produto atualizado na lista mockada:', updatedProduct);
        resolve(true);
      } else {
        console.log('simulateSaveProductApi: Produto não encontrado para atualização, adicionando como novo (não deveria ocorrer na edição):', updatedProduct);
        mockProductsData.push(updatedProduct); // Isso não deve acontecer para uma atualização de um produto existente
        resolve(true);
      }
    }, 500);
  });
};
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


  const handleSave = async () => {
    // Validação básica
    if (name.trim() === '' || type.trim() === '' || price.trim() === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    const priceValue = parseFloat(price.replace(',', '.'));
    if (isNaN(priceValue)) {
      Alert.alert('Erro', 'Preço inválido.');
      return;
    }

    const updatedProduct: Product = {
      ...initialProduct, // Mantém o ID original
      name,
      type,
      price: priceValue,
      unit,
    };

    let success = false;

    // --- CÓDIGO REAL (COM BACKEND) - COMENTADO ---
    /*
    try {
      console.log(`Tentando atualizar produto ${updatedProduct.id} no backend...`);
      const response = await fetch(`https://sua-api.com/produtos/${updatedProduct.id}`, {
        method: 'PUT', // Geralmente PUT para atualização
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${seuTokenDeAutenticacao}`,
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Produto atualizado com sucesso no backend:', responseData);
        success = true;
      } else {
        const errorData = await response.json();
        console.error('Erro ao atualizar produto no backend:', response.status, errorData);
        Alert.alert('Erro', `Não foi possível salvar as alterações: ${errorData.message || 'Tente novamente.'}`);
        success = false;
      }
    } catch (error) {
      console.error('Erro de rede ou na requisição de salvar:', error);
      Alert.alert('Erro', 'Erro de conexão. Tente novamente.');
      success = false;
    }
    */
    // --- FIM DO CÓDIGO REAL (COM BACKEND) - COMENTADO ---

    // --- CÓDIGO DE SIMULAÇÃO (ATIVO) ---
    if (!success) { // Se o código real não foi executado ou falhou
      success = await simulateSaveProductApi(updatedProduct);
    }
    // --- FIM DO CÓDIGO DE SIMULAÇÃO ---


    if (success) {
      setSuccessMessage('Produto atualizado com sucesso!');
      setSuccessModalVisible(true);
    } else {
      console.log(`Falha ao salvar alterações no produto ${initialProduct.name}.`);
    }
  };

  const handleAdvanceFromSuccessModal = () => {
    setSuccessModalVisible(false);
    navigation.goBack();
  };


  const handleDelete = () => {
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    setDeleteModalVisible(false);

    let success = false;

    if (!success) {
      success = await simulateDeleteProductApi(initialProduct.id);
    }

    if (success) {
      Alert.alert('Excluído', 'Produto excluído com sucesso!');
      navigation.goBack();
    } else {
      console.log(`Falha ao excluir produto ${initialProduct.name}.`);
    }
  };

  const cancelDelete = () => {
    setDeleteModalVisible(false);
    console.log('Exclusão cancelada.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Editar Produto</Text>
      <TouchableOpacity style={styles.imagePicker}>
        <Ionicons name="camera" size={40} color="#888" />
      </TouchableOpacity>
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
  imagePicker: {
    alignSelf: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 16,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
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
