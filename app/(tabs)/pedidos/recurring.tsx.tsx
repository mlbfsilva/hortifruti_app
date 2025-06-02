import { useNavigation } from 'expo-router'; // Para o botão de voltar e navegação de abas
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface OrderProduct {
  name: string;
  quantity: number;
  unit?: string;
}

interface Order {
  id: string;
  value: number;
  timeToFinish: string;
  recurrence: string;
  products: OrderProduct[];
}

const MOCK_RECURRING_ORDERS: Order[] = [
  { id: '001', value: 54.90, timeToFinish: '30min', recurrence: '2x por Semana', products: [{ name: 'Banana', quantity: 3, unit: 'Kg' }] },
  { id: '002', value: 54.90, timeToFinish: '30min', recurrence: '2x por Semana', products: [{ name: 'Limão', quantity: 8, unit: 'Unid.' }] },
  { id: '003', value: 54.90, timeToFinish: '30min', recurrence: '2x por Semana', products: [{ name: 'Manga', quantity: 2, unit: 'Unid.' }] },
  { id: '004', value: 54.90, timeToFinish: '30min', recurrence: '2x por Semana', products: [{ name: 'Maçã', quantity: 5, unit: 'Unid.' }] },
];

export default function RecurringOrdersScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('semanais'); // 'semanais' ativa ao iniciar

  const goToMensalOrders = () => {
      navigation.navigate('recurring'); // Navega para a própria tela se for a rota principal para "Mensais"
      setActiveTab('mensais');
  }

  const goToSemanalOrders = () => {
      navigation.navigate('recurring'); // Navega para a própria tela se for a rota principal para "Semanais"
      setActiveTab('semanais');
  }

  const goToSolicitacoes = () => {
      // Se "Solicitações" for uma sub-rota ou outra tela, usar navigation.navigate
      // Por enquanto, apenas atualiza a aba ativa
      setActiveTab('solicitacoes');
  }

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}> {/* Botão de voltar */}
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
        style={[styles.tabButton, activeTab === 'mensais' && styles.activeTabButton]}
        onPress={goToMensalOrders}
      >
        <Text style={[styles.tabText, activeTab === 'mensais' && styles.activeTabText]}>Pedidos Mensais</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'semanais' && styles.activeTabButton]}
        onPress={goToSemanalOrders}
      >
        <Text style={[styles.tabText, activeTab === 'semanais' && styles.activeTabText]}>Pedidos Semanais</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'solicitacoes' && styles.activeTabButton]}
        onPress={goToSolicitacoes}
      >
        <Text style={[styles.tabText, activeTab === 'solicitacoes' && styles.activeTabText]}>Solicitações Pedidos Recorrentes</Text>
      </TouchableOpacity>
    </View>
  );

  const renderOrderCard = (order: Order) => (
    <View key={order.id} style={styles.orderCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.orderId}>Pedido #{order.id}</Text>
        <Text style={styles.orderValue}>Valor: R$ {order.value.toFixed(2)}</Text>
      </View>

      <View style={styles.productsContainer}>
        <Text style={styles.productsLabel}>Produtos:</Text>
        {order.products.map((product, index) => (
          <Text key={index} style={styles.productItem}>
            {product.quantity} {product.unit} de {product.name}
          </Text>
        ))}
      </View>

      <Text style={styles.orderDetail}>Recorrência: {order.recurrence}</Text>
      <Text style={styles.orderDetail}>Tempo para finalizar: {order.timeToFinish}</Text>

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

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderTabs()}
      <ScrollView style={styles.orderList}>
        {MOCK_RECURRING_ORDERS.map(renderOrderCard)}
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
    elevation: 2,
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
});