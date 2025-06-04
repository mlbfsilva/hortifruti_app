import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// IMPORTAÇÃO CORRIGIDA: Caminho relativo correto para o OrderDetailsModal
import { useRouter } from 'expo-router';
import OrderDetailsModal from '../../components/OrderDetailsModal';

// Interfaces de tipos (copiadas do OrderDetailsModal.tsx e ajustadas para esta tela)
interface OrderProduct {
  name: string;
  quantity: number;
  unit: string;
}

interface Order {
  id: string;
  customerName: string; // Mantido para uso nesta tela
  total: number; // Mantido para uso nesta tela
  status: 'pending' | 'approved' | 'rejected'; // Mantido para uso nesta tela
  items: { name: string; quantity: number; price: number }[]; // Mantido para uso nesta tela
  
  // PROPRIEDADES QUE O OrderDetailsModal ESPERA (ADICIONADAS AQUI):
  value: number; 
  timeToFinish: string;
  products: OrderProduct[];
}

// Dados de exemplo para as ordens (AGORA COM AS NOVAS PROPRIEDADES E DADOS DE TESTE)
const sampleOrders: Order[] = [
  {
    id: '1',
    customerName: 'Cliente A',
    total: 150.00,
    status: 'pending',
    items: [
      { name: 'Maçã', quantity: 5, price: 5.00 },
      { name: 'Banana', quantity: 10, price: 3.00 },
      { name: 'Morango', quantity: 2, price: 20.00 },
    ],
    value: 150.00, // Exemplo de valor para o modal
    timeToFinish: '20min',
    products: [
      { name: 'Maçã', quantity: 5, unit: 'unidades' },
      { name: 'Banana', quantity: 10, unit: 'unidades' },
      { name: 'Morango', quantity: 2, unit: 'bandejas' },
    ],
  },
  {
    id: '2',
    customerName: 'Cliente B',
    total: 80.50,
    status: 'pending',
    items: [
      { name: 'Pão', quantity: 2, price: 8.00 },
      { name: 'Leite', quantity: 1, price: 6.50 },
    ],
    value: 80.50,
    timeToFinish: '15min',
    products: [
      { name: 'Pão', quantity: 2, unit: 'unidades' },
      { name: 'Leite', quantity: 1, unit: 'litro' },
    ],
  },
  {
    id: '3',
    customerName: 'Cliente C',
    total: 200.00,
    status: 'approved',
    items: [
      { name: 'Carne', quantity: 1, price: 100.00 },
      { name: 'Arroz', quantity: 1, price: 15.00 },
      { name: 'Feijão', quantity: 1, price: 12.00 },
    ],
    value: 200.00,
    timeToFinish: '30min',
    products: [
      { name: 'Carne', quantity: 1, unit: 'kg' },
      { name: 'Arroz', quantity: 1, unit: 'kg' },
      { name: 'Feijão', quantity: 1, unit: 'kg' },
    ],
  },
];

export default function PedidosScreen() {
  const [orders, setOrders] = React.useState<Order[]>(sampleOrders);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
  const router = useRouter();

  const handleApprove = (orderId: string) => {
    setOrders((prevOrders: Order[]) =>
      prevOrders.map((order: Order) =>
        order.id === orderId ? { ...order, status: 'approved' } : order
      )
    );
    setIsModalVisible(false);
  };

  const handleReject = (orderId: string) => {
    setOrders((prevOrders: Order[]) =>
      prevOrders.map((order: Order) =>
        order.id === orderId ? { ...order, status: 'rejected' } : order
      )
    );
    setIsModalVisible(false);
  };

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciar Pedidos</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {orders.map((order: Order) => (
          <TouchableOpacity
            key={order.id}
            style={styles.orderCard}
            onPress={() => openOrderDetails(order)}
          >
            <Text style={styles.orderText}>Pedido ID: {order.id}</Text>
            <Text style={styles.orderText}>Cliente: {order.customerName}</Text>
            <Text style={styles.orderText}>Total: R$ {order.total.toFixed(2)}</Text>
            <Text
              style={[
                styles.statusText,
                order.status === 'pending' && styles.statusPending,
                order.status === 'approved' && styles.statusApproved,
                order.status === 'rejected' && styles.statusRejected,
              ]}
            >
              Status: {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedOrder && (
        <OrderDetailsModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          order={selectedOrder}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  orderCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  statusPending: {
    color: '#FFA500', // Laranja
  },
  statusApproved: {
    color: '#28a745', // Verde
  },
  statusRejected: {
    color: '#dc3545', // Vermelho
  },
});