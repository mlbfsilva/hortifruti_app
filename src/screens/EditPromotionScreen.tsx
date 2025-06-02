// src/screens/EditPromotionScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';

// Importar a lista de parâmetros do ProfileStack
import { ProfileStackParamList } from '../navigation/ProfileStack';

// IMPORTAR O TIPO 'Promotion' DIRETAMENTE DE 'src/types/profile.ts'
import { Promotion } from '../types/profile';

// IMPORTAR O NOVO COMPONENTE ConfirmationModal
import ConfirmationModal from '../components/ConfirmationModal';

// Importar a lista mockada de promoções para simular a exclusão
import { mockPromotionsData } from './PromotionsScreen'; // <--- NOVO

// Função simulada para remover uma promoção (simula uma chamada de API)
const simulateDeletePromotionApi = async (promotionId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => { // Simula um atraso de rede
      const initialLength = mockPromotionsData.length;
      const index = mockPromotionsData.findIndex(p => p.id === promotionId);
      if (index > -1) {
        mockPromotionsData.splice(index, 1); // Remove o item
        console.log(`Promoção ${promotionId} removida da lista mockada.`);
        resolve(true); // Sucesso
      } else {
        console.log(`Promoção ${promotionId} não encontrada na lista mockada.`);
        resolve(false); // Falha (não encontrado)
      }
    }, 500); // 0.5 segundos de atraso
  });
};
// --- FIM DOS DADOS MOCKADOS ---


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

  // ESTADO PARA CONTROLAR A VISIBILIDADE DO MODAL DE EXCLUSÃO
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false); // <--- NOVO

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

  // FUNÇÃO PARA ABRIR O MODAL DE CONFIRMAÇÃO DE EXCLUSÃO
  const handleDelete = () => {
    setDeleteModalVisible(true); // <--- SUBSTITUI Alert.alert
  };

  // FUNÇÃO PARA CONFIRMAR A EXCLUSÃO (chamada pelo modal)
  const confirmDelete = async () => { // <--- AGORA É ASYNC
    setDeleteModalVisible(false); // Fecha o modal imediatamente

    let success = false; // Variável para controlar o resultado da exclusão

    // --- CÓDIGO REAL (COM BACKEND) - COMENTADO ---
    /*
    try {
      console.log(`Tentando excluir promoção ${initialPromotion?.id} do backend...`);
      const response = await fetch(`https://sua-api.com/promocoes/${initialPromotion?.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${seuTokenDeAutenticacao}`, // Se precisar de autenticação
        },
      });

      if (response.ok) { // Verifica se a resposta foi 2xx (sucesso)
        console.log(`Promoção ${initialPromotion?.productName} excluída com sucesso do backend.`);
        success = true; // Define success como true se a API retornar sucesso
      } else {
        const errorData = await response.json(); // Tenta ler a mensagem de erro da API
        console.error('Erro ao excluir promoção no backend:', response.status, errorData);
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
    if (!success) { // Se o código real não foi executado ou falhou
      if (initialPromotion?.id) { // Garante que há um ID para excluir
        success = await simulateDeletePromotionApi(initialPromotion.id);
      } else {
        console.error('ID da promoção não encontrado para exclusão simulada.');
        success = false;
      }
    }
    // --- FIM DO CÓDIGO DE SIMULAÇÃO ---


    if (success) { // 'success' virá da chamada da API real ou da simulação
      console.log(`Promoção ${initialPromotion?.productName} excluída com sucesso!`);
      Alert.alert('Excluído', 'Promoção excluída com sucesso!');
      // NAVEGA DE VOLTA E, O IDEAL, ATUALIZA A TELA ANTERIOR (PromotionsScreen)
      // PromotionsScreen precisará usar useFocusEffect para recarregar mockPromotionsData
      navigation.goBack();
    } else {
      console.log(`Falha ao excluir promoção ${initialPromotion?.productName}.`);
      Alert.alert('Erro', 'Não foi possível excluir a promoção.');
    }
  };

  // FUNÇÃO PARA CANCELAR A EXCLUSÃO (chamada pelo modal)
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

      {/* RENDERIZAR O ConfirmationModal PARA EXCLUSÃO DA PROMOÇÃO */}
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
