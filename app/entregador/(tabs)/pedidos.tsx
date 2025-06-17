import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// Dados de exemplo dos pedidos
const pedidosExemplo = [
  {
    id: '001',
    status: 'Em andamento',
    endereco: 'Rua das Flores, 123 - Centro',
    itens: ['Maçã Gala (2kg)', 'Banana Prata (1kg)', 'Laranja Lima (3kg)'],
    total: 'R$ 45,90',
    horario: '15:30'
  },
  {
    id: '002',
    status: 'Aguardando coleta',
    endereco: 'Av. Principal, 456 - Jardim',
    itens: ['Tomate Italiano (1kg)', 'Alface Americana (2un)', 'Cenoura Nacional (1kg)'],
    total: 'R$ 28,50',
    horario: '16:00'
  },
  {
    id: '003',
    status: 'Em andamento',
    endereco: 'Rua do Comércio, 789 - Centro',
    itens: ['Batata Inglesa (3kg)', 'Cebola Nacional (1kg)', 'Alho Nacional (500g)'],
    total: 'R$ 32,75',
    horario: '16:30'
  }
];

export default function PedidosEntregador() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meus Pedidos</Text>
      </View>

      <ScrollView style={styles.content}>
        {pedidosExemplo.map((pedido) => (
          <View key={pedido.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>Pedido #{pedido.id}</Text>
              <Text style={[
                styles.orderStatus,
                { color: pedido.status === 'Em andamento' ? '#2ecc71' : '#f1c40f' }
              ]}>
                {pedido.status}
              </Text>
            </View>
            
            <View style={styles.orderInfo}>
              <Text style={styles.orderAddress}>{pedido.endereco}</Text>
              <Text style={styles.orderTime}>Horário: {pedido.horario}</Text>
            </View>

            <View style={styles.orderItems}>
              {pedido.itens.map((item, index) => (
                <Text key={index} style={styles.orderItem}>• {item}</Text>
              ))}
            </View>

            <View style={styles.orderFooter}>
              <Text style={styles.orderTotal}>Total: {pedido.total}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  orderInfo: {
    marginBottom: 10,
  },
  orderAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  orderTime: {
    fontSize: 14,
    color: '#666',
  },
  orderItems: {
    marginBottom: 10,
  },
  orderItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  orderFooter: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
}); 