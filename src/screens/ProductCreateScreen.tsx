import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductStackParamList } from '../navigation/ProductStack';

import SuccessModal from '../components/SuccessModal';

type ProductCreateScreenProps = StackScreenProps<ProductStackParamList, 'CreateProduct'>;

export default function ProductCreateScreen({ navigation }: ProductCreateScreenProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState<'Kg' | 'Unid.'>('Kg');

  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddProduct = () => {
    setErrorMessage('');

    // --- REMOVIDO/COMENTADO: Lógica de validação de campos vazios ---
    // if (name.trim() === '' || type.trim() === '' || price.trim() === '') {
    //   setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
    //   return;
    // }

    console.log('handleAddProduct: Tentando mostrar modal de sucesso (validação ignorada).');
    setSuccessModalVisible(true);
    console.log('handleAddProduct: isSuccessModalVisible definido para true.');
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleAdvanceFromSuccessModal = () => {
    console.log('handleAdvanceFromSuccessModal: Botão Avançar clicado. Escondendo modal.');
    setSuccessModalVisible(false);
    navigation.navigate('ProductList');
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
        placeholder="Banana"
      />

      <Text style={styles.label}>Tipo:</Text>
      <TextInput
        style={styles.input}
        value={type}
        onChangeText={(text) => { setType(text); setErrorMessage(''); }}
        placeholder="Fruta"
      />

      <Text style={styles.label}>Preço:</Text>
      <View style={styles.priceRow}>
        <TextInput
          style={[styles.input, styles.priceInput]}
          value={price}
          onChangeText={(text) => { setPrice(text); setErrorMessage(''); }}
          keyboardType="numeric"
          placeholder="5,90"
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
