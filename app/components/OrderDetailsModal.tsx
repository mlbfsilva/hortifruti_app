import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface OrderDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  order?: {
    id: string;
    value: number;
    timeToFinish?: string;
    products?: Array<{
      name: string;
      quantity: number;
      unit: string;
    }>;
  };
}

export default function OrderDetailsModal({ visible, onClose, order }: OrderDetailsModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Detalhes do Pedido #{order?.id}</Text>
          
          {order && (
            <>
              <Text style={styles.modalText}>
                Valor: R$ {order.value.toFixed(2)}
              </Text>
              {order.timeToFinish && (
                <Text style={styles.modalText}>
                  Tempo para finalizar: {order.timeToFinish}
                </Text>
              )}
              {order.products && order.products.length > 0 && (
                <View style={styles.productsSection}>
                  <Text style={styles.modalText}>Produtos:</Text>
                  {order.products.map((product, index) => (
                    <Text key={index} style={styles.productText}>
                      • {product.quantity} {product.unit} de {product.name}
                    </Text>
                  ))}
                </View>
              )}
            </>
          )}

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#000',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  productsSection: {
    marginTop: 10,
  },
  productText: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 10,
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
}); 