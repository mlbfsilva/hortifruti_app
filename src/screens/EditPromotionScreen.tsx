// src/screens/EditPromotionScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';

import { ProfileStackParamList } from '../navigation/ProfileStack';
import { Promotion } from '../types/profile';

import ConfirmationModal from '../components/ConfirmationModal';
import SuccessModal from '../components/SuccessModal';

import { mockPromotionsData } from './PromotionsScreen';

// Função simulada para remover uma promoção (simula uma chamada de API)
const simulateDeletePromotionApi = async (promotionId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const initialLength = mockPromotionsData.length;
      const index = mockPromotionsData.findIndex(p => p.id === promotionId);
      if (index > -1) {
        mockPromotionsData.splice(index, 1);
        console.log(`Promoção ${promotionId} removida da lista mockada.`);
        resolve(true);
      } else {
        console.log(`Promoção ${promotionId} não encontrada na lista mockada.`);
        resolve(false);
      }
    }, 500);
  });
};

// Função simulada para adicionar/atualizar uma promoção
const simulateSavePromotionApi = async (promotion: Promotion, isNew: boolean): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (isNew) {
        mockPromotionsData.push(promotion);
        console.log('simulateSavePromotionApi: Nova promoção adicionada à lista mockada:', promotion); // <--- CONSOLE.LOG
      } else {
        const index = mockPromotionsData.findIndex(p => p.id === promotion.id);
        if (index > -1) {
          mockPromotionsData[index] = promotion;
          console.log('simulateSavePromotionApi: Promoção atualizada na lista mockada:', promotion); // <--- CONSOLE.LOG
        } else {
          console.log('simulateSavePromotionApi: Promoção não encontrada para atualização, adicionando como nova (não deveria ocorrer na edição):', promotion);
          mockPromotionsData.push(promotion);
        }
      }
      resolve(true);
    }, 500);
  });
};


type EditPromotionScreenProps = StackScreenProps<ProfileStackParamList, 'EditPromotion'>;

export default function EditPromotionScreen({ route, navigation }: EditPromotionScreenProps) {
  const initialPromotion = route.params?.promotion;

  const [productName, setProductName] = useState(initialPromotion?.productName || '');
  const [productType, setProductType] = useState(initialPromotion?.productType || '');
  const [promotionPrice, setPromotionPrice] = useState(initialPromotion?.promotionPrice?.toString().replace('.', ',') || '');
  const [unit, setUnit] = useState<'Kg' | 'Unid.'>(initialPromotion?.unit === 'Kg' ? 'Kg' : 'Unid.');

  const isEditing = !!initialPromotion;

  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');


  const handleSave = async () => {
    console.log('handleSave: Botão Salvar Alterações clicado.'); // <--- CONSOLE.LOG
    if (productName.trim() === '' || productType.trim() === '' || promotionPrice.trim() === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      console.log('handleSave: Validação falhou - campos vazios.'); // <--- CONSOLE.LOG
      return;
    }

    const priceValue = parseFloat(promotionPrice.replace(',', '.'));
    if (isNaN(priceValue)) {
      Alert.alert('Erro', 'Preço da promoção inválido.');
      console.log('handleSave: Validação falhou - preço inválido.'); // <--- CONSOLE.LOG
      return;
    }

    const newOrUpdatedPromotion: Promotion = {
      id: initialPromotion?.id || Date.now().toString(),
      productId: initialPromotion?.productId || 'new-product-id',
      productName,
      productType,
      promotionPrice: priceValue,
      unit,
      imageUrl: initialPromotion?.imageUrl,
    };
    console.log('handleSave: Objeto de promoção a ser salvo:', newOrUpdatedPromotion); // <--- CONSOLE.LOG


    let success = false;

    // --- CÓDIGO REAL (COM BACKEND) - COMENTADO ---
    /*
    try {
      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing ? `https://sua-api.com/promocoes/${newOrUpdatedPromotion.id}` : 'https://sua-api.com/promocoes';
      console.log(`Tentando ${isEditing ? 'atualizar' : 'adicionar'} promoção ao backend:`, newOrUpdatedPromotion);

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrUpdatedPromotion),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(`Promoção ${isEditing ? 'atualizada' : 'adicionada'} com sucesso ao backend:`, responseData);
        success = true;
      } else {
        const errorData = await response.json();
        console.error(`Erro ao ${isEditing ? 'atualizar' : 'adicionar'} promoção no backend:`, response.status, errorData);
        Alert.alert('Erro', `Não foi possível ${isEditing ? 'salvar' : 'adicionar'} a promoção: ${errorData.message || 'Tente novamente.'}`);
        success = false;
      }
    } catch (error) {
      console.error('Erro de rede ou na requisição de salvar promoção:', error);
      Alert.alert('Erro', 'Erro de conexão. Tente novamente.');
      success = false;
    }
    */
    // --- FIM DO CÓDIGO REAL (COM BACKEND) - COMENTADO ---

    // --- CÓDIGO DE SIMULAÇÃO (ATIVO) ---
    if (!success) {
      success = await simulateSavePromotionApi(newOrUpdatedPromotion, !isEditing);
      console.log('handleSave: Resultado da simulação de salvar:', success); // <--- CONSOLE.LOG
    }
    // --- FIM DO CÓDIGO DE SIMULAÇÃO ---


    if (success) {
      setSuccessMessage(isEditing ? 'Promoção atualizada com Sucesso!' : 'Promoção Adicionada com Sucesso!');
      setSuccessModalVisible(true);
      console.log('handleSave: Modal de sucesso ativado.'); // <--- CONSOLE.LOG
    } else {
      console.log(`handleSave: Falha ao ${isEditing ? 'salvar' : 'adicionar'} promoção.`); // <--- CONSOLE.LOG
    }
  };

  const handleAdvanceFromSuccessModal = () => {
    setSuccessModalVisible(false);
    console.log('handleAdvanceFromSuccessModal: Modal de sucesso fechado. Voltando...'); // <--- CONSOLE.LOG
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
      const response = await fetch(`https://sua-api.com/promocoes/${initialPromotion?.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        success = true;
      } else {
        const errorData = await response.json();
        Alert.alert('Erro', `Não foi possível excluir a promoção: ${errorData.message || 'Tente novamente.'}`);
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
      if (initialPromotion?.id) {
        success = await simulateDeletePromotionApi(initialPromotion.id);
      } else {
        console.error('ID da promoção não encontrado para exclusão simulada.');
        success = false;
      }
    }
    // --- FIM DO CÓDIGO DE SIMULAÇÃO ---

    if (success) {
      Alert.alert('Excluído', 'Promoção excluída com sucesso!');
      navigation.goBack();
    } else {
      console.log(`Falha ao excluir promoção ${initialPromotion?.productName}.`);
    }
  };

  const cancelDelete = () => {
    setDeleteModalVisible(false);
    console.log('Exclusão de promoção cancelada.');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={28} color="#333" />
      </TouchableOpacity>
      <Text style={styles.header}>{isEditing ? 'Editar Promoção' : 'Adicionar Promoção'}</Text>

      {/* EXIBIR IMAGEM DO PRODUTO DA PROMOÇÃO OU PLACEHOLDER DA CÂMERA */}
      {initialPromotion?.imageUrl ? (
        <Image source={initialPromotion.imageUrl} style={styles.promotionProductImage} />
      ) : (
        <TouchableOpacity style={styles.imagePicker}>
          <Ionicons name="camera" size={40} color="#888" />
        </TouchableOpacity>
      )}

      <Text style={styles.label}>Produto:</Text>
      <TextInput
        style={styles.input}
        value={productName}
        onChangeText={setProductName}
        placeholder="Produto"
        // REMOVIDO: editable={!isEditing}
      />

      <Text style={styles.label}>Tipo:</Text>
      <TextInput
        style={styles.input}
        value={productType}
        onChangeText={setProductType}
        placeholder="Tipo"
        // REMOVIDO: editable={!isEditing}
      />

      <Text style={styles.label}>Promoção:</Text>
      <View style={styles.priceRow}>
        <TextInput
          style={[styles.input, styles.priceInput]}
          value={promotionPrice}
          onChangeText={setPromotionPrice}
          keyboardType="numeric"
          placeholder="R$"
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

      {isEditing && (
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Excluir Promoção</Text>
        </TouchableOpacity>
      )}

      <ConfirmationModal
        isVisible={isDeleteModalVisible}
        title="Excluir Promoção"
        message={`Tem certeza que deseja excluir a promoção para "${initialPromotion?.productName || 'este item'}"?`}
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
  promotionProductImage: { // Estilo para a imagem do produto da promoção
    alignSelf: 'center',
    width: 80,
    height: 80,
    borderRadius: 16,
    marginBottom: 24,
    resizeMode: 'cover',
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
