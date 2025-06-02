import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

interface ExitConfirmationModalProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ExitConfirmationModal({ isVisible, onConfirm, onCancel }: ExitConfirmationModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onCancel} // Permite fechar o modal ao pressionar o botão de voltar no Android
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Tem certeza que{"\n"}deseja sair da conta?</Text>

          <TouchableOpacity
            style={[styles.button, styles.confirmButton]}
            onPress={onConfirm}
          >
            <Text style={styles.confirmButtonText}>Sim, quero sair</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onCancel}
          >
            <Text style={styles.cancelButtonText}>Não</Text>
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
  modalTitle: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  button: {
    borderRadius: 8,
    padding: 12,
    elevation: 2,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  confirmButton: {
    backgroundColor: 'transparent', // Sem fundo
    borderColor: '#FF6347', // Borda vermelha
    borderWidth: 1,
  },
  confirmButtonText: {
    color: '#FF6347', // Texto vermelho
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#f2f2f2', // Fundo cinza claro
  },
  cancelButtonText: {
    color: '#333', // Texto escuro
    fontWeight: 'bold',
    fontSize: 16,
  },
});
