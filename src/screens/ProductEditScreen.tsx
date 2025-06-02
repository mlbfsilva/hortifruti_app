// src/screens/ProductEditScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';

// Importar a lista de parâmetros do ProductStack
import { ProductStackParamList } from '../navigation/ProductStack'; // Ajuste o caminho se necessário

// IMPORTAR O NOVO COMPONENTE ConfirmationModal
import ConfirmationModal from '../components/ConfirmationModal'; // <--- NOVO

// Definir o tipo das props para esta tela
type ProductEditScreenProps = StackScreenProps<ProductStackParamList, 'EditProduct'>;

export default function ProductEditScreen({ route, navigation }: ProductEditScreenProps) {
  const { product: initialProduct } = route.params;

  const [unit, setUnit] = useState<'Kg' | 'Unid.'>(initialProduct.unit === 'Kg' ? 'Kg' : 'Unid.');
  const [name, setName] = useState(initialProduct.name);
  const [type, setType] = useState(initialProduct.type);
  const [price, setPrice] = useState(initialProduct.price.toString().replace('.', ','));

  // ESTADO PARA CONTROLAR A VISIBILIDADE DO MODAL DE EXCLUSÃO
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false); // <--- NOVO

  const handleSave = () => {
    // Lógica para salvar as alterações do produto
    Alert.alert('Sucesso', 'Produto atualizado com sucesso!'); // Este Alert ainda pode não ser visível no Canvas
    navigation.goBack();
  };

  // FUNÇÃO PARA ABRIR O MODAL DE CONFIRMAÇÃO DE EXCLUSÃO
  const handleDelete = () => {
    setDeleteModalVisible(true); // <--- SUBSTITUI Alert.alert
  };

  // FUNÇÃO PARA CONFIRMAR A EXCLUSÃO (chamada pelo modal)
  const confirmDelete = () => {
    setDeleteModalVisible(false); // Fecha o modal
    // --- SUA LÓGICA REAL DE EXCLUSÃO DE PRODUTO AQUI ---
    console.log(`Produto ${initialProduct.name} excluído!`);
    // Alert.alert('Excluído', 'Produto excluído com sucesso!'); // Este Alert ainda pode não ser visível no Canvas
    navigation.goBack(); // Volta para a tela anterior
  };

  // FUNÇÃO PARA CANCELAR A EXCLUSÃO (chamada pelo modal)
  const cancelDelete = () => {
    setDeleteModalVisible(false); // Fecha o modal
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

      {/* RENDERIZAR O ConfirmationModal PARA EXCLUSÃO */}
      <ConfirmationModal
        isVisible={isDeleteModalVisible}
        title="Excluir Produto"
        message={`Tem certeza que deseja excluir "${initialProduct.name}"?`}
        confirmText="Sim, Excluir"
        cancelText="Não"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        confirmButtonColor="#FF6347" // Cor vermelha para exclusão
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
    backgroundColor: '#FF6347', // Um tom de vermelho para o botão de excluir
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
