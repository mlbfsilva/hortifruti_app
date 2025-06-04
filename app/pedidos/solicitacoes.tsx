import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface OrderProduct {
  name: string;
  quantity: number;
  unit: string;
}

interface Order {
  id: string;
  value: number;
  products: OrderProduct[];
  recurrence: string;
}

const MOCK_ORDERS: Order[] = [
  {
    id: '033',
    value: 102.00,
    products: [
      { name: 'Banana', quantity: 3, unit: 'Kg' },
      { name: 'Limão', quantity: 8, unit: 'Unid.' },
      { name: 'Manga', quantity: 2, unit: 'Unid.' },
    ],
    recurrence: '1x por Semana',
  },
  {
    id: '045',
    value: 32.90,
    products: [
      { name: 'Banana', quantity: 3, unit: 'Kg' },
      { name: 'Limão', quantity: 8, unit: 'Unid.' },
      { name: 'Manga', quantity: 2, unit: 'Unid.' },
    ],
    recurrence: '2x por Semana',
  },
  {
    id: '049',
    value: 54.90,
    products: [
      { name: 'Banana', quantity: 3, unit: 'Kg' },
      { name: 'Limão', quantity: 8, unit: 'Unid.' },
      { name: 'Manga', quantity: 2, unit: 'Unid.' },
    ],
    recurrence: '1x por Semana',
  },
];

export default function RequestRecurringOrdersScreen() {
  const [activeTab, setActiveTab] = useState('solicitacoes');

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => console.log('Voltar')}>
        <Text style={styles.backButton}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Pedidos Recorrente</Text>
      <View style={styles.headerRight}>
        <View style={styles.notificationBadge}>
          <Text style={styles.notificationText}>3</Text>
        </View>
      </View>
    </View>
  );

  const renderTabs = () => (
    <View style={styles.tabBar}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'mensais' && styles.activeTab]}
        onPress={() => setActiveTab('mensais')}
      >
        <Text style={[styles.tabText, activeTab === 'mensais' && styles.activeTabText]}>
          Pedidos Mensais
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'semanais' && styles.activeTab]}
        onPress={() => setActiveTab('semanais')}
      >
        <Text style={[styles.tabText, activeTab === 'semanais' && styles.activeTabText]}>
          Pedidos Semanais
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'solicitacoes' && styles.activeTab]}
        onPress={() => setActiveTab('solicitacoes')}
      >
        <Text style={[styles.tabText, activeTab === 'solicitacoes' && styles.activeTabText]}>
          Solicitações Pedidos Recorrentes
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderOrderCard = (order: Order) => (
    <View key={order.id} style={styles.orderCard}>
      <Text style={styles.orderId}>Pedido #{order.id}</Text>
      <Text style={styles.orderLabel}>Produtos:</Text>
      {order.products.map((product, index) => (
        <Text key={index} style={styles.productItem}>
          {product.quantity} {product.unit} de {product.name}
        </Text>
      ))}
      <Text style={styles.orderValue}>Valor: R$ {order.value.toFixed(2).replace('.', ',')}</Text>
      <Text style={styles.recurrence}>Recorrência: {order.recurrence}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.acceptButton]}
          onPress={() => console.log('Aceitar pedido', order.id)}
        >
          <Text style={styles.buttonText}>Aceitar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.rejectButton]}
          onPress={() => console.log('Recusar pedido', order.id)}
        >
          <Text style={styles.buttonText}>Recusar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderTabs()}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {MOCK_ORDERS.map(renderOrderCard)}
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
  backButton: {
    fontSize: 24,
    color: '#000',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginLeft: -24, // Compensa o espaço do botão voltar
  },
  headerRight: {
    width: 24, // Mesmo tamanho do botão voltar para manter simetria
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
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#2196F3',
  },
  tabText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
  },
  activeTabText: {
    color: 'white',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  orderLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  productItem: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
    marginBottom: 2,
  },
  orderValue: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
  },
  recurrence: {
    fontSize: 14,
    color: '#333',
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