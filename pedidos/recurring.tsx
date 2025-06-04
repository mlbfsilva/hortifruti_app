import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface OrderProduct {
  name: string;
  quantity: number;
  unit: string;
}

interface Order {
  id: string;
  value: number;
  timeToFinish: string;
  recurrence: string;
  products: OrderProduct[];
}

const MOCK_SIMPLE_ORDERS: Order[] = [
  {
    id: '001',
    value: 54.90,
    timeToFinish: '30min',
    recurrence: '2x por Semana',
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
    recurrence: '2x por Semana',
    products: [
      { name: 'Maçã', quantity: 2, unit: 'Kg' },
      { name: 'Pera', quantity: 4, unit: 'Unid.' },
    ],
  },
  {
    id: '003',
    value: 54.90,
    timeToFinish: '30min',
    recurrence: '2x por Semana',
    products: [
      { name: 'Banana', quantity: 3, unit: 'Kg' },
      { name: 'Limão', quantity: 8, unit: 'Unid.' },
    ],
  },
  {
    id: '004',
    value: 54.90,
    timeToFinish: '30min',
    recurrence: '2x por Semana',
    products: [
      { name: 'Banana', quantity: 3, unit: 'Kg' },
      { name: 'Limão', quantity: 8, unit: 'Unid.' },
    ],
  },
];

const MOCK_REQUESTS: Order[] = [
  {
    id: '033',
    value: 102.00,
    timeToFinish: '30min',
    recurrence: '1x por Semana',
    products: [
      { name: 'Banana', quantity: 3, unit: 'Kg' },
      { name: 'Limão', quantity: 8, unit: 'Unid.' },
      { name: 'Manga', quantity: 2, unit: 'Unid.' },
    ],
  },
  {
    id: '045',
    value: 32.90,
    timeToFinish: '30min',
    recurrence: '2x por Semana',
    products: [
      { name: 'Banana', quantity: 3, unit: 'Kg' },
      { name: 'Limão', quantity: 8, unit: 'Unid.' },
      { name: 'Manga', quantity: 2, unit: 'Unid.' },
    ],
  },
];

export default function RecurringOrdersScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('monthly');

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backButtonText}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Pedidos Recorrente</Text>
      <View style={styles.headerIcons}>
        <View style={styles.notificationBadge}>
          <Text style={styles.notificationText}>3</Text>
        </View>
      </View>
    </View>
  );

  const renderTabs = () => (
    <View style={styles.tabBar}>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'monthly' && styles.activeTabButton]}
        onPress={() => setActiveTab('monthly')}
      >
        <Text style={[styles.tabText, activeTab === 'monthly' && styles.activeTabText]}>
          Pedidos Mensais
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'weekly' && styles.activeTabButton]}
        onPress={() => setActiveTab('weekly')}
      >
        <Text style={[styles.tabText, activeTab === 'weekly' && styles.activeTabText]}>
          Pedidos Semanais
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'requests' && styles.activeTabButton]}
        onPress={() => setActiveTab('requests')}
      >
        <Text style={[styles.tabText, activeTab === 'requests' && styles.activeTabText]}>
          Solicitações
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderSimpleOrderCard = (order: Order) => (
    <View key={order.id} style={styles.simpleCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.orderId}>Pedido #{order.id}</Text>
        <TouchableOpacity>
          <Text style={styles.viewMore}>Ver Mais</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.orderValue}>Valor: R$ {order.value.toFixed(2)}</Text>
      <Text style={styles.orderDetail}>Tempo para finalizar: {order.timeToFinish}</Text>
    </View>
  );

  const renderRequestCard = (order: Order) => (
    <View key={order.id} style={styles.requestCard}>
      <Text style={styles.orderId}>Pedido #{order.id}</Text>
      
      <View style={styles.productsContainer}>
        <Text style={styles.productsLabel}>Produtos:</Text>
        {order.products.map((product, index) => (
          <Text key={index} style={styles.productItem}>
            {product.quantity} {product.unit} de {product.name}
          </Text>
        ))}
      </View>

      <Text style={styles.orderValue}>Valor: R$ {order.value.toFixed(2)}</Text>
      <Text style={styles.orderDetail}>Recorrência: {order.recurrence}</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.acceptButton]}
          onPress={() => console.log('Aceitar pedido', order.id)}
        >
          <Text style={styles.buttonText}>Aceitar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.rejectButton]}
          onPress={() => console.log('Recusar pedido', order.id)}
        >
          <Text style={styles.buttonText}>Recusar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'requests':
        return MOCK_REQUESTS.map(renderRequestCard);
      case 'monthly':
      case 'weekly':
      default:
        return MOCK_SIMPLE_ORDERS.map(renderSimpleOrderCard);
    }
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderTabs()}
      <ScrollView style={styles.orderList}>
        {renderContent()}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
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
  },
  notificationText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 25,
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
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
    textAlign: 'center',
  },
  activeTabText: {
    color: 'white',
  },
  orderList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  simpleCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  requestCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  orderValue: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  orderDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  viewMore: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: '500',
  },
  productsContainer: {
    marginBottom: 10,
  },
  productsLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  productItem: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
    marginBottom: 2,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
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
    fontSize: 14,
    fontWeight: '500',
  },
}); 