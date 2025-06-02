import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductStackParamList } from '../navigation/ProductStack';

import SuccessModal from '../components/SuccessModal';
import { Product } from '../types/product'; // Importar o tipo Product

// Importar a lista mockada de produtos para simular a adição
import { mockProductsData as globalMockProductsData } from './ProductEditScreen'; //  Importar a lista global

// Função simulada para adicionar um produto (simula uma chamada de API)
const simulateAddProductApi = async (newProduct: Product): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => { // Simula um atraso de rede
      globalMockProductsData.push(newProduct); // Adiciona o novo produto à lista global
      console.log('Produto adicionado à lista mockada:', newProduct);
      resolve(true); // Sucesso
    }, 500); // 0.5 segundos de atraso
  });
};
// --- FIM DOS DADOS MOCKADOS ---


type ProductCreateScreenProps = StackScreenProps<ProductStackParamList, 'CreateProduct'>;

export default function ProductCreateScreen({ navigation }: ProductCreateScreenProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState<'Kg' | 'Unid.'>('Kg');

  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddProduct = async () => { 
    setErrorMessage('');

    if (name.trim() === '' || type.trim() === '' || price.trim() === '') {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const priceValue = parseFloat(price.replace(',', '.'));
    if (isNaN(priceValue)) {
      setErrorMessage('Preço inválido.');
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(), // Gera um ID único simples
      name,
      type,
      price: priceValue,
      unit,
    };

    let success = false; // Variável para controlar o resultado da inclusão

    // --- CÓDIGO REAL (COM BACKEND) - COMENTADO ---
    /*
    try {
      console.log('Tentando adicionar produto ao backend:', newProduct);
      const response = await fetch('https://sua-api.com/produtos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${seuTokenDeAutenticacao}`, // Se precisar de autenticação
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) { // Verifica se a resposta foi 2xx (sucesso)
        const responseData = await response.json(); // Se a API retornar o produto criado com ID
        console.log('Produto adicionado com sucesso ao backend:', responseData);
        success = true; // Define success como true se a API retornar sucesso
      } else {
        const errorData = await response.json(); // Tenta ler a mensagem de erro da API
        console.error('Erro ao adicionar produto no backend:', response.status, errorData);
        setErrorMessage(`Erro ao adicionar: ${errorData.message || 'Tente novamente.'}`);
        success = false; // Define success como false em caso de erro da API
      }
    } catch (error) {
      console.error('Erro de rede ou na requisição de inclusão:', error);
      setErrorMessage('Erro de conexão. Tente novamente.');
      success = false; // Define success como false em caso de erro de rede
    }
    */
    // --- FIM DO CÓDIGO REAL (COM BACKEND) - COMENTADO ---

    // --- CÓDIGO DE SIMULAÇÃO (ATIVO) ---
    // Este bloco só é executado se o bloco de código real acima estiver comentado.
    if (!success) { // Se o código real não foi executado ou falhou
      success = await simulateAddProductApi(newProduct);
    }
    // --- FIM DO CÓDIGO DE SIMULAÇÃO ---


    if (success) { // 'success' virá da chamada da API real ou da simulação
      console.log('handleAddProduct: Produto adicionado com sucesso!');
      setSuccessModalVisible(true); // Exibe o modal de sucesso
    } else {
     
      console.log('handleAddProduct: Falha ao adicionar produto.');
     
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleAdvanceFromSuccessModal = () => {
    setSuccessModalVisible(false);
    navigation.navigate('ProductList'); // Navega para a lista de produtos após o sucesso
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Novo Produto</Text>

      <TouchableOpacity style={styles.imagePicker}>
        <Ionicons name="camera" size={40} color="#888" />
      </TouchableOpacity>

      <Text style={styles.label}>Produto:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => { setName(text); setErrorMessage(''); }}
        placeholder="Produto"
      />

      <Text style={styles.label}>Tipo:</Text>
      <TextInput
        style={styles.input}
        value={type}
        onChangeText={(text) => { setType(text); setErrorMessage(''); }}
        placeholder="Tipo"
      />

      <Text style={styles.label}>Preço:</Text>
      <View style={styles.priceRow}>
        <TextInput
          style={[styles.input, styles.priceInput]}
          value={price}
          onChangeText={(text) => { setPrice(text); setErrorMessage(''); }}
          keyboardType="numeric"
          placeholder="R$ 0,00"
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

      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddProduct}
      >
        <Text style={styles.addButtonText}>Adicionar Produto</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={handleCancel}
      >
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>

      <SuccessModal
        isVisible={isSuccessModalVisible}
        onAdvance={handleAdvanceFromSuccessModal}
        message="Produto Adicionado com Sucesso!"
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
    marginBottom: 24,
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
    marginTop: 12,
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    fontSize: 15,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  priceInput: {
    flex: 1,
    marginRight: 8,
  },
  unitButton: {
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: 4,
    backgroundColor: '#fff',
  },
  unitButtonActive: {
    backgroundColor: '#007AFF',
  },
  unitButtonText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  unitButtonTextActive: {
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#19C37D',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderColor: '#FF6347',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  cancelButtonText: {
    color: '#FF6347',
    fontWeight: '600',
    fontSize: 16,
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
});
