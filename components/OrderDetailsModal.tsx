import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface OrderProduct {
  name: string;
  quantity: number;
  unit: string;
}

interface Order {
  id: string;
  value: number;
  timeToFinish: string;
  products: OrderProduct[];
  status?: 'pending' | 'approved' | 'rejected';
}

interface OrderDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  order?: Order;
  onApprove?: (orderId: string) => void;
  onReject?: (orderId: string) => void;
}

export default function OrderDetailsModal({ visible, onClose, order, onApprove, onReject }: OrderDetailsModalProps) {
  if (!order) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>

          <Text style={styles.orderTitle}>Pedido #{order.id}</Text>
          <Text style={styles.orderInfo}>Valor: R$ {order.value.toFixed(2)}</Text>
          
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>Tempo para finalizar: {order.timeToFinish}</Text>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Produtos</Text>
            <View style={styles.productHeader}>
              <Text style={styles.productHeaderText}>Produtos</Text>
              <Text style={styles.productHeaderText}>Qtd.</Text>
            </View>
            
            {order.products.map((product, index) => (
              <View key={index} style={styles.productItem}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productQuantity}>{product.quantity} {product.unit}</Text>
              </View>
            ))}
          </View>

          {/* Seção do Entregador */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Entregador</Text>
            <View style={styles.deliverymanContainer}>
              {/* A tag Image e o estilo deliverymanImage foram removidos aqui */}
              <View style={styles.deliverymanInfo}>
                <Text style={styles.deliverymanName}>Luiz Henrique</Text>
                <Text style={styles.arrivalTime}>Chega em: 17min</Text>
              </View>
            </View>
          </View>

          {/* Botões de Aprovar/Rejeitar */}
          {order.status === 'pending' && onApprove && onReject && (
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.actionButton, styles.approveButton]}
                onPress={() => onApprove(order.id)}
              >
                <Text style={styles.actionButtonText}>Aprovar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.rejectButton]}
                onPress={() => onReject(order.id)}
              >
                <Text style={styles.actionButtonText}>Rejeitar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
  },
  orderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
  },
  orderInfo: {
    fontSize: 16,
    marginBottom: 10,
  },
  timeContainer: {
    backgroundColor: '#FFE066',
    padding: 10,
    borderRadius: 15,
    marginVertical: 15,
    alignSelf: 'flex-start',
  },
  timeText: {
    fontSize: 16,
    fontWeight: '500',
  },
  sectionContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  productHeaderText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  productName: {
    fontSize: 16,
    flex: 1,
  },
  productQuantity: {
    fontSize: 16,
    marginLeft: 20,
  },
  deliverymanContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliverymanInfo: {
    marginLeft: 15,
  },
  deliverymanName: {
    fontSize: 16,
    fontWeight: '500',
  },
  arrivalTime: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  actionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  approveButton: {
    backgroundColor: '#28a745',
  },
  rejectButton: {
    backgroundColor: '#dc3545',
  },
  actionButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});