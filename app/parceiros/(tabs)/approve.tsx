import { useRouter } from 'expo-router';
import { useState } from 'react';
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

export default function ApproveOrdersScreen() {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const router = useRouter();

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

  const navigateToRecurringOrders = () => {
    router.push('/pedidos/recurring');
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
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/pedidos')}>
          <Text style={styles.backButton}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Pedidos</Text>
        <View style={styles.notificationContainer}>
          <TouchableOpacity onPress={navigateToRecurringOrders}>
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab]}
          onPress={() => router.push('/pedidos')}
        >
          <Text style={[styles.tabText]}>Lista de Pedidos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>Aprovar Pedidos</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.orderList}>
        {orders.map(renderOrderCard)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    fontSize: 24,
    color: '#000',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginLeft: -20,
  },
  notificationContainer: {
    width: 24,
  },
  notificationBadge: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  notificationText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 25,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#2196F3',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
  },
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
