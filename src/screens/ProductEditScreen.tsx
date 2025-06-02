// src/screens/ProductEditScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';

import { ProductStackParamList } from '../navigation/ProductStack';
import ConfirmationModal from '../components/ConfirmationModal';
import SuccessModal from '../components/SuccessModal';

import { Product } from '../types/product';

// Definição do tipo das props para esta tela
type ProductEditScreenProps = StackScreenProps<ProductStackParamList, 'EditProduct'>;

// --- DADOS MOCKADOS (SIMULANDO UM BANCO DE DADOS/API) ---
export let mockProductsData: Product[] = [
  { id: '1', name: 'Banana', type: 'Fruta', price: 5.9, unit: 'Kg', imageUrl: require('../assets/images/banana.png') },
  { id: '2', name: 'Maçã', type: 'Fruta', price: 6.5, unit: 'Kg', imageUrl: require('../assets/images/maca.png') },
  { id: '3', name: 'Alface', type: 'Verdura', price: 3.2, unit: 'Unid.', imageUrl: require('../assets/images/alface.png') },
  { id: '4', name: 'Tomate', type: 'Fruta', price: 4.8, unit: 'Kg', imageUrl: require('../assets/images/tomate.png') },
];

const simulateDeleteProductApi = async (productId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const initialLength = mockProductsData.length;
      mockProductsData = mockProductsData.filter(p => p.id !== productId);
      if (mockProductsData.length < initialLength) {
        console.log(`Produto ${productId} removido da lista mockada.`);
        resolve(true);
      } else {
        console.log(`Produto ${productId} não encontrado na lista mockada.`);
        resolve(false);
      }
    }, 500);
  });
};

const simulateSaveProductApi = async (updatedProduct: Product): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockProductsData.findIndex(p => p.id === updatedProduct.id);
      if (index > -1) {
        mockProductsData [index] = updatedProduct;
        console.log('simulateSaveProductApi: Produto atualizado na lista mockada:', updatedProduct);
        resolve(true);
      } else {
        console.log('simulateSaveProductApi: Produto não encontrado para atualização, adicionando como novo (não deveria ocorrer na edição):', updatedProduct);
        mockProductsData.push(updatedProduct);
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
  const [errorMessage, setErrorMessage] = useState(''); // Para exibir erros na tela


  const handleSave = async () => {
    setErrorMessage(''); // Limpa mensagens de erro anteriores
    // Validação básica
    if (name.trim() === '' || type.trim() === '' || price.trim() === '') {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    const priceValue = parseFloat(price.replace(',', '.'));
    if (isNaN(priceValue)) {
      setErrorMessage('Preço inválido.');
      return;
    }

    const updatedProduct: Product = {
      ...initialProduct,
      name,
      type,
      price: priceValue,
      unit,
    };

    let success = false;

    // --- CÓDIGO REAL (COM BACKEND) - COMENTADO ---
    /*
    try {
      const response = await fetch(`https://sua-api.com/produtos/${updatedProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        success = true;
      } else {
        const errorData = await response.json();
        setErrorMessage(`Não foi possível salvar: ${errorData.message || 'Tente novamente.'}`);
        success = false;
      }
    } catch (error) {
      setErrorMessage('Erro de conexão. Tente novamente.');
      success = false;
    }
    */
    // --- FIM DO CÓDIGO REAL (COM BACKEND) - COMENTADO ---

    // --- CÓDIGO DE SIMULAÇÃO (ATIVO) ---
    if (!success) {
      success = await simulateSaveProductApi(updatedProduct);
    }
    // --- FIM DO CÓDIGO DE SIMULAÇÃO ---


    if (success) {
      setSuccessMessage('Produto atualizado com sucesso!');
      setSuccessModalVisible(true);
    } else {
      setErrorMessage('Falha ao salvar as alterações.');
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

    // --- CÓDIGO REAL (COM BACKEND) - COMENTADO ---
    /*
    try {
      const response = await fetch(`https://sua-api.com/produtos/${initialProduct.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        success = true;
      } else {
        const errorData = await response.json();
        Alert.alert('Erro', `Não foi possível excluir o produto: ${errorData.message || 'Tente novamente.'}`);
        success = false;
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro de conexão. Tente novamente.');
      success = false;
    }
    */
    // --- FIM DO CÓDIGO REAL (COM BACKEND) - COMENTADO ---

    // --- CÓDIGO DE SIMULAÇÃO (ATIVO) ---
    if (!success) {
      success = await simulateDeleteProductApi(initialProduct.id);
    }
    // --- FIM DO CÓDIGO DE SIMULAÇÃO ---

    if (success) {
      Alert.alert('Excluído', 'Produto excluído com sucesso!'); // ESTE ALERT AINDA PODE CAUSAR PROBLEMA NO CANVAS
      navigation.goBack();
    } else {
      Alert.alert('Erro', 'Não foi possível excluir o produto.'); // ESTE ALERT AINDA PODE CAUSAR PROBLEMA NO CANVAS
    }
  };

  const cancelDelete = () => {
    setDeleteModalVisible(false);
    console.log('Exclusão cancelada.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Editar Produto</Text>
      {/* NOVO: EXIBIR IMAGEM DO PRODUTO OU PLACEHOLDER DA CÂMERA */}
      {initialProduct.imageUrl ? (
        <Image source={initialProduct.imageUrl} style={styles.productImage} resizeMode="contain" />
      ) : (
        <TouchableOpacity style={styles.imagePicker}>
          <Ionicons name="camera" size={40} color="#888" />
        </TouchableOpacity>
      )}
      <Text style={styles.label}>Produto:</Text>
      <TextInput style={styles.input} value={name} onChangeText={(text) => { setName(text); setErrorMessage(''); }} /> {/* Limpar erro ao digitar */}
      <Text style={styles.label}>Tipo:</Text>
      <TextInput style={styles.input} value={type} onChangeText={(text) => { setType(text); setErrorMessage(''); }} /> {/* Limpar erro ao digitar */}
      <Text style={styles.label}>Preço:</Text>
      <View style={styles.priceRow}>
        <TextInput
          style={[styles.input, { flex: 1, marginRight: 8 }]}
          value={price}
          onChangeText={(text) => { setPrice(text); setErrorMessage(''); }} /* Limpar erro ao digitar */
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

      {/* Exibir mensagem de erro de validação */}
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

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

      {/* RENDERIZAR O SuccessModal PARA SUCESSO AO SALVAR */}
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
  productImage: { // <--- ESTILOS PARA A IMAGEM DO PRODUTO
    width: 150,       // Defina uma largura máxima
    height: 150,      // Defina uma altura máxima
    borderRadius: 8,
    marginBottom: 24,
    alignSelf: 'center', // Centralizar a imagem
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
  errorMessage: { // Estilo para mensagem de erro na tela
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
});
