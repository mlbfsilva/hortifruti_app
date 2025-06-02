import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

interface SuccessModalProps {
  isVisible: boolean;
  onAdvance: () => void;
  message?: string; // Mensagem customizável, padrão "Produto Adicionado com Sucesso!"
}

export default function SuccessModal({ isVisible, onAdvance, message = "Produto Adicionado\ncom Sucesso!" }: SuccessModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onAdvance} // Permite fechar o modal ao pressionar o botão de voltar no Android
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalMessage}>{message}</Text>

          <TouchableOpacity
            style={styles.advanceButton}
            onPress={onAdvance}
          >
            <Text style={styles.advanceButtonText}>Avançar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escuro transparente
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%', // Largura do pop-up
    maxWidth: 300, // Largura máxima para telas maiores
  },
  modalMessage: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  advanceButton: {
    backgroundColor: '#19C37D', // Fundo verde
    borderRadius: 8,
    padding: 12,
    elevation: 2,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  advanceButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
