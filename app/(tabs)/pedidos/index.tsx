import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import OrderDetailsModal from '../../components/OrderDetailsModal';

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
    id: '001',
    value: 54.90,
    timeToFinish: '30min',
    products: [
      { name: 'Banana', quantity: 3, unit: 'Kg' },
      { name: 'Limão', quantity: 8, unit: 'Unid.' },
      { name: 'Manga', quantity: 2, unit: 'Unid.' },
    ],
  },
  {
    id: '002',
    value: 54.90,
    timeToFinish: '30min',
    products: [
      { name: 'Banana', quantity: 3, unit: 'Kg' },
      { name: 'Limão', quantity: 8, unit: 'Unid.' },
      { name: 'Manga', quantity: 2, unit: 'Unid.' },
    ],
  },
];

export default function OrderListScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('list');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = (order: Order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedOrder(null);
  };

  const navigateToApproveOrders = () => {
    setActiveTab('approve');
    router.push('/(tabs)/pedidos/approve');
  };

  const navigateToRecurringOrders = () => {
    router.push('/(tabs)/pedidos/recurring');
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.backButtonText}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Pedidos</Text>
      <View style={styles.headerIcons}>
        <TouchableOpacity onPress={navigateToRecurringOrders}>
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTabs = () => (
    <View style={styles.tabBar}>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'list' && styles.activeTabButton]}
        onPress={() => setActiveTab('list')}
      >
        <Text style={[styles.tabText, activeTab === 'list' && styles.activeTabText]}>Lista de Pedidos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'approve' && styles.activeTabButton]}
        onPress={navigateToApproveOrders}
      >
        <Text style={[styles.tabText, activeTab === 'approve' && styles.activeTabText]}>Aprovar Pedidos</Text>
      </TouchableOpacity>
    </View>
  );

  const renderOrderCard = (order: Order) => (
    <View key={order.id} style={styles.orderCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.orderId}>Pedido #{order.id}</Text>
        <TouchableOpacity style={styles.viewMoreButton} onPress={() => openModal(order)}>
          <Text style={styles.viewMoreText}>Ver Mais</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.orderInfoContent}>
        <Text style={styles.orderDetail}>Valor: R$ {order.value.toFixed(2).replace('.', ',')}</Text>
        <Text style={styles.orderDetail}>Tempo para finalizar: {order.timeToFinish}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderTabs()}
      <ScrollView style={styles.orderList}>
        {MOCK_ORDERS.map(renderOrderCard)}
      </ScrollView>
      {selectedOrder && (
        <OrderDetailsModal
          visible={isModalVisible}
          order={selectedOrder}
          onClose={closeModal}
        />
      )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginLeft: -30,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationBadge: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 10,
  },
  notificationText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderRadius: 25,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: '#2196F3',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: 'white',
  },
  orderList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  orderCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'flex-start',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  orderInfoContent: {
    width: '100%',
  },
  orderId: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5,
  },
  orderValue: {
    fontSize: 14,
    color: '#424242',
    marginBottom: 3,
  },
  orderTime: {
    fontSize: 14,
    color: '#424242',
    marginBottom: 3,
  },
  viewMoreButton: {
    paddingHorizontal: 15,
  },
  viewMoreText: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: '500',
  },
  orderDetail: {
    fontSize: 14,
    color: '#424242',
    marginBottom: 3,
  },
}); 