// src/screens/EditPromotionScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';

// Importar a lista de parâmetros do ProfileStack
import { ProfileStackParamList } from '../navigation/ProfileStack'; // Ajuste o caminho se necessário

// IMPORTAR O TIPO 'Promotion' DIRETAMENTE DE 'src/types/profile.ts'
import { Promotion } from '../types/profile'; // <--- CORREÇÃO AQUI

// Definir o tipo das props para esta tela
type EditPromotionScreenProps = StackScreenProps<ProfileStackParamList, 'EditPromotion'>;

export default function EditPromotionScreen({ route, navigation }: EditPromotionScreenProps) {
  // A promoção pode vir via params se estiver editando, ou ser nova
  const initialPromotion = route.params?.promotion;

  const [productName, setProductName] = useState(initialPromotion?.productName || '');
  const [productType, setProductType] = useState(initialPromotion?.productType || '');
  const [promotionPrice, setPromotionPrice] = useState(initialPromotion?.promotionPrice?.toString().replace('.', ',') || '');
  const [unit, setUnit] = useState<'Kg' | 'Unid.'>(initialPromotion?.unit === 'Kg' ? 'Kg' : 'Unid.');

  const isEditing = !!initialPromotion; // Verifica se está editando ou criando

  const handleSave = () => {
    if (productName.trim() === '' || productType.trim() === '' || promotionPrice.trim() === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const priceValue = parseFloat(promotionPrice.replace(',', '.'));
    if (isNaN(priceValue)) {
      Alert.alert('Erro', 'Preço da promoção inválido.');
      return;
    }

    const newOrUpdatedPromotion: Promotion = {
      id: initialPromotion?.id || Date.now().toString(), // Gera um ID simples para novos
      productId: initialPromotion?.productId || 'new-product-id', // Você precisaria de um seletor de produto real
      productName,
      productType,
      promotionPrice: priceValue,
      unit,
    };

    if (isEditing) {
      console.log('Promoção atualizada:', newOrUpdatedPromotion);
      Alert.alert('Sucesso', 'Promoção atualizada com sucesso!');
    } else {
      console.log('Nova promoção adicionada:', newOrUpdatedPromotion);
      Alert.alert('Sucesso', 'Promoção adicionada com sucesso!');
    }
    navigation.goBack();
  };

  const handleDelete = () => {
    Alert.alert(
      'Excluir Promoção',
      'Tem certeza que deseja excluir esta promoção?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            console.log('Promoção excluída!');
            Alert.alert('Excluído', 'Promoção excluída com sucesso!');
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={28} color="#333" />
      </TouchableOpacity>
      <Text style={styles.header}>{isEditing ? 'Editar Promoção' : 'Adicionar Promoção'}</Text>

      {/* Placeholder da Imagem */}
      <TouchableOpacity style={styles.imagePicker}>
        <Ionicons name="camera" size={40} color="#888" />
      </TouchableOpacity>

      <Text style={styles.label}>Produto:</Text>
      <TextInput
        style={styles.input}
        value={productName}
        onChangeText={setProductName}
        placeholder="Banana"
        editable={!isEditing} // Não editável se estiver editando (assumindo que o produto é fixo)
      />

      <Text style={styles.label}>Tipo:</Text>
      <TextInput
        style={styles.input}
        value={productType}
        onChangeText={setProductType}
        placeholder="Fruta"
        editable={!isEditing} // Não editável se estiver editando
      />

      <Text style={styles.label}>Promoção:</Text>
      <View style={styles.priceRow}>
        <TextInput
          style={[styles.input, styles.priceInput]}
          value={promotionPrice}
          onChangeText={setPromotionPrice}
          keyboardType="numeric"
          placeholder="1,99"
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

      {isEditing && ( // Botão de excluir só aparece se estiver editando
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Excluir Promoção</Text>
        </TouchableOpacity>
      )}
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
    borderColor: '#007AFF', // Cor azul para os botões de unidade
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: 4,
    backgroundColor: '#fff',
  },
  unitButtonActive: {
    backgroundColor: '#007AFF', // Cor azul quando ativo
  },
  unitButtonText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  unitButtonTextActive: {
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#19C37D',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
