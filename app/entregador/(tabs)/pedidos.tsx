import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';

interface PedidoDisponivel {
  id: string;
  loja: string;
  numero?: string;
  distancia: string;
  endereco: string;
  valor: string;
  status: string;
}

export default function PedidosEntregador() {
  const [pedidos, setPedidos] = useState<PedidoDisponivel[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarPedidos();
  }, []);

  const buscarPedidos = async () => {
    setCarregando(true);
    try {
      const { data, error } = await supabase
        .from('solicitacoes_pedidos')
        .select('*')
        .or('status.eq.aceito,status.eq.em_andamento')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Erro ao buscar pedidos: ", error.message);
      } else {
        setPedidos(data as PedidoDisponivel[]);
      }
    } catch (error) {
      console.error("Erro ao buscar pedidos: ", error);
    } finally {
      setCarregando(false);
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'aceito':
        return 'Aguardando Retirada';
      case 'em_andamento':
        return 'Em Andamento';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aceito':
        return '#f1c40f';
      case 'em_andamento':
        return '#2ecc71';
      default:
        return '#666';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meus Pedidos</Text>
      </View>

      <ScrollView style={styles.content}>
        {carregando ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#000" />
            <Text style={styles.loadingText}>Carregando pedidos...</Text>
          </View>
        ) : pedidos.length === 0 ? (
          <View style={styles.emptyContainer}>
            <FontAwesome5 name="clipboard-list" size={50} color="#ccc" />
            <Text style={styles.emptyText}>Nenhum pedido encontrado</Text>
            <Text style={styles.emptySubtext}>Você ainda não aceitou nenhum pedido</Text>
          </View>
        ) : (
          pedidos.map((pedido) => (
            <View key={pedido.id} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderId}>Pedido #{pedido.numero || pedido.id}</Text>
                <Text style={[
                  styles.orderStatus,
                  { color: getStatusColor(pedido.status) }
                ]}>
                  {getStatusText(pedido.status)}
                </Text>
              </View>
              
              <View style={styles.orderInfo}>
                <View style={styles.infoRow}>
                  <FontAwesome5 name="store" size={14} color="#666" />
                  <Text style={styles.infoText}>{pedido.loja}</Text>
                </View>
                <View style={styles.infoRow}>
                  <FontAwesome5 name="map-marker-alt" size={14} color="#666" />
                  <Text style={styles.infoText}>{pedido.endereco}</Text>
                </View>
                <View style={styles.infoRow}>
                  <FontAwesome5 name="map-marker-distance" size={14} color="#666" />
                  <Text style={styles.infoText}>Distância: {pedido.distancia} km</Text>
                </View>
              </View>

              <View style={styles.orderFooter}>
                <View style={styles.totalRow}>
                  <FontAwesome5 name="dollar-sign" size={16} color="#2ecc71" />
                  <Text style={styles.orderTotal}>R$ {pedido.valor}</Text>
                </View>
              </View>
            </View>
          ))
        )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
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
    marginBottom: 15,
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
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  orderFooter: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 5,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
}); 