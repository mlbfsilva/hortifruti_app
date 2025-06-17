import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Order {
  id: string;
  value: number;
  timeToFinish: string;
  products: Array<{
    name: string;
    quantity: number;
    unit: string;
  }>;
}

const MOCK_ORDERS: Order[] = [
  {
    id: '006',
    value: 54.90,
    timeToFinish: '30min',
    products: [
      { name: 'Banana', quantity: 3, unit: 'Kg' },
      { name: 'Limão', quantity: 8, unit: 'Unid.' },
      { name: 'Manga', quantity: 2, unit: 'Unid.' },
    ],
  },
  {
    id: '007',
    value: 54.90,
    timeToFinish: '30min',
    products: [
      { name: 'Morango', quantity: 5, unit: 'Cx' },
      { name: 'Cenoura', quantity: 1, unit: 'Kg' },
      { name: 'Alface', quantity: 1, unit: 'Unid.' },
    ],
  },
  {
    id: '008',
    value: 54.90,
    timeToFinish: '30min',
    products: [
      { name: 'Maçã', quantity: 4, unit: 'Kg' },
      { name: 'Pera', quantity: 2, unit: 'Kg' },
      { name: 'Uva', quantity: 1, unit: 'Cx' },
    ],
  },
];

export default function ApproveOrdersList() {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  const handleApprove = (orderId: string) => {
    setOrders(orders.filter(order => order.id !== orderId));
    Alert.alert(
      'Pedido Aceito',
      'O pedido foi aceito com sucesso!',
      [{ text: 'OK' }]
    );
  };

  const handleReject = (orderId: string) => {
    setOrders(orders.filter(order => order.id !== orderId));
    Alert.alert(
      'Pedido Recusado',
      'O pedido foi recusado.',
      [{ text: 'OK' }]
    );
  };

  const renderOrderCard = (order: Order) => (
    <View key={order.id} style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>Pedido #{order.id}</Text>
        <Text style={styles.orderValue}>Valor: R$ {order.value.toFixed(2)}</Text>
      </View>

      <View style={styles.productsContainer}>
        <Text style={styles.productsTitle}>Produtos:</Text>
        {order.products.map((product, index) => (
          <Text key={index} style={styles.productItem}>
            {product.quantity} {product.unit} de {product.name}
          </Text>
        ))}
      </View>

      <Text style={styles.timeToFinish}>
        Tempo para finalizar: {order.timeToFinish}
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.acceptButton]}
          onPress={() => handleApprove(order.id)}
        >
          <Text style={styles.buttonText}>Aceitar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.rejectButton]}
          onPress={() => handleReject(order.id)}
        >
          <Text style={styles.buttonText}>Recusar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.orderList}>
      {orders.map(renderOrderCard)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  orderList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  orderId: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  orderValue: {
    fontSize: 16,
    color: '#666',
  },
  productsContainer: {
    marginBottom: 15,
  },
  productsTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  productItem: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
    marginBottom: 3,
  },
  timeToFinish: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
  },
  rejectButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
}); 