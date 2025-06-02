// src/screens/ProductEditScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack'; // Importe StackScreenProps

import { ProductStackParamList } from '../navigation/ProductStack'; // Importe ProductStackParamList
import ConfirmationModal from '../components/ConfirmationModal';

// Importe o tipo Product
import { Product } from '../types/product';

// --- NOVO: Definição do tipo das props para esta tela ---
type ProductEditScreenProps = StackScreenProps<ProductStackParamList, 'EditProduct'>;
// --- FIM DO NOVO ---

// --- DADOS MOCKADOS (SIMULANDO UM BANCO DE DADOS/API) ---
// Em um aplicativo real, esta lista viria de um estado global ou de uma API.
// Para este exemplo, vamos simular a remoção daqui.
export let mockProductsData: Product[] = [ // <--- 'export' é necessário para ProductListScreen
  { id: '1', name: 'Banana', type: 'Fruta', price: 5.9, unit: 'Kg' },
  { id: '2', name: 'Maçã', type: 'Fruta', price: 6.5, unit: 'Kg' },
  { id: '3', name: 'Alface', type: 'Verdura', price: 3.2, unit: 'Unid.' },
  { id: '4', name: 'Tomate', type: 'Fruta', price: 4.8, unit: 'Kg' },
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
// --- FIM DOS DADOS MOCKADOS ---


export default function ProductEditScreen({ route, navigation }: ProductEditScreenProps) {
  const { product: initialProduct } = route.params;

  const [unit, setUnit] = useState<'Kg' | 'Unid.'>(initialProduct.unit === 'Kg' ? 'Kg' : 'Unid.');
  const [name, setName] = useState(initialProduct.name);
  const [type, setType] = useState(initialProduct.type);
  const [price, setPrice] = useState(initialProduct.price.toString().replace('.', ','));

  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleSave = () => {
    Alert.alert('Sucesso', 'Produto atualizado com sucesso!');
    navigation.goBack();
  };

  const handleDelete = () => {
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => { // <--- AGORA É ASYNC
    setDeleteModalVisible(false); // Fecha o modal imediatamente

    let success = false; // Variável para controlar o resultado da exclusão

    // --- CÓDIGO REAL (COM BACKEND) - COMENTADO ---
    /*
    try {
      console.log(`Tentando excluir produto ${initialProduct.id} do backend...`);
      const response = await fetch(`https://sua-api.com/produtos/${initialProduct.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${seuTokenDeAutenticacao}`, // Se precisar de autenticação
        },
      });

      if (response.ok) { // Verifica se a resposta foi 2xx (sucesso)
        console.log(`Produto ${initialProduct.name} excluído com sucesso do backend.`);
        success = true; // Define success como true se a API retornar sucesso
      } else {
        const errorData = await response.json(); // Tenta ler a mensagem de erro da API
        console.error('Erro ao excluir produto no backend:', response.status, errorData);
        success = false; // Define success como false em caso de erro da API
      }
    } catch (error) {
      console.error('Erro de rede ou na requisição de exclusão:', error);
      success = false; // Define success como false em caso de erro de rede
    }
    */
    // --- FIM DO CÓDIGO REAL (COM BACKEND) - COMENTADO ---

    // --- CÓDIGO DE SIMULAÇÃO (ATIVO) ---
    // Este bloco só é executado se o bloco de código real acima estiver comentado.
    // Em um aplicativo real, você removeria este bloco e ativaria o código do backend.
    if (!success) { // Se o código real não foi executado ou falhou
      success = await simulateDeleteProductApi(initialProduct.id);
    }
    // --- FIM DO CÓDIGO DE SIMULAÇÃO ---


    if (success) { // 'success' virá da chamada da API real ou da simulação
      console.log(`Produto ${initialProduct.name} excluído com sucesso!`);
      Alert.alert('Excluído', 'Produto excluído com sucesso!');
      // 2. NAVEGA DE VOLTA E, O IDEAL, ATUALIZA A TELA ANTERIOR
      // Em um app real, a tela anterior (ProductListScreen) precisaria recarregar seus dados.
      // Isso pode ser feito via:
      // - Um listener de foco (useFocusEffect do React Navigation) para recarregar dados da API
      // - Um estado global (Context API, Redux, Zustand) onde a exclusão atualizaria a lista
      // - Passando uma função de callback via params (menos comum para exclusão)
      navigation.goBack();
    } else {
      console.log(`Falha ao excluir produto ${initialProduct.name}.`);
      Alert.alert('Erro', 'Não foi possível excluir o produto.');
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
