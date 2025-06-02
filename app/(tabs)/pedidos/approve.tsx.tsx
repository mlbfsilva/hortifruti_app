import { useNavigation } from 'expo-router'; // Para o botão de voltar
import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import OrderDetailsModal from '../../../components/OrderDetailsModal'; // <-- Ajustado o caminho!

interface OrderProduct {
  name: string;
  quantity: number;
  unit?: string;
}

interface Order {
  id: string;
  value: number;
  timeToFinish: string;
  products: OrderProduct[];
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
      { name: 'Arroz', quantity: 2, unit: 'Kg' },
      { name: 'Feijão', quantity: 1, unit: 'Kg' },
      { name: 'Frango', quantity: 1, unit: 'Kg' },
    ],
  },
];

export default function ApproveOrdersScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('approve'); // 'approve' ativa ao iniciar
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => { setModalVisible(true); };
  const closeModal = () => { setModalVisible(false); };

  const goToOrderList = () => {
    navigation.navigate('index'); // Navega para a OrderListScreen (index da pasta pedidos)
  };

  const renderOrderCard = (order: Order) => (
    <View key={order.id} style={styles.orderCard}>
      <View style={styles.orderHeader}>
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

      <Text style={styles.timeToFinish}>
        Tempo para finalizar: {order.timeToFinish}
      </Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.acceptButton]}
          onPress={openModal} // CHAMA O MODAL AQUI
        >
          <Text style={styles.buttonText}>Aceitar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.rejectButton]}
          onPress={openModal} // CHAMA O MODAL AQUI TAMBÉM
        >
          <Text style={styles.buttonText}>Recusar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pedidos</Text>
        <View style={styles.headerIcons}>
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>3</Text>
          </View>
        </View>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'list' && styles.activeTabButton]}
          onPress={goToOrderList} // Navega para a OrderListScreen
        >
          <Text style={[styles.tabText, activeTab === 'list' && styles.activeTabText]}>Lista de Pedidos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'approve' && styles.activeTabButton]}
          onPress={() => setActiveTab('approve')} // Apenas muda a aba ativa localmente
        >
          <Text style={[styles.tabText, activeTab === 'approve' && styles.activeTabText]}>Aprovar Pedidos</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {MOCK_ORDERS.map(renderOrderCard)}
      </ScrollView>

      {/* O Modal de Detalhes de Pedido */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <OrderDetailsModal visible={isModalVisible} onClose={closeModal} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
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
    color: '#fff',
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
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 15,
  },
  orderCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '500',
  },
  orderValue: {
    fontSize: 14,
    color: '#424242',
  },
  productsContainer: {
    marginBottom: 10,
  },
  productsLabel: {
    fontSize: 14,
    color: '#424242',
    marginBottom: 5,
  },
  productItem: {
    fontSize: 14,
    color: '#424242',
    marginLeft: 10,
    marginBottom: 2,
  },
  timeToFinish: {
    fontSize: 14,
    color: '#424242',
    marginBottom: 15,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});