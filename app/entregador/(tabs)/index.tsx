import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface PedidoDisponivel {
  id: string;
  loja: string;
  numero?: string;
  distancia: string;
  valor: string;
}

export default function HomeEntregador() {
  const router = useRouter();

  const pedidosDisponiveis: PedidoDisponivel[] = [
    {
      id: '1',
      loja: 'Loja 01',
      numero: '#131',
      distancia: '2.5 km',
      valor: 'R$ 15,00'
    },
    {
      id: '2',
      loja: 'Loja 02',
      numero: '#138',
      distancia: '1.8 km',
      valor: 'R$ 12,00'
    },
    {
      id: '3',
      loja: 'Loja 03',
      numero: '#134',
      distancia: '3.2 km',
      valor: 'R$ 18,00'
    }
  ];

  const handleAceitar = (id: string) => {
    router.push({
      pathname: '/entregador/pedido-aceito',
      params: { id }
    });
  };

  const handleRecusar = (id: string) => {
    console.log('Pedido recusado:', id);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Olá, Entregador!</Text>
        <Text style={styles.subText}>Encontre entregas disponíveis</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Entregas Hoje</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>R$ 0,00</Text>
          <Text style={styles.statLabel}>Ganhos Hoje</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Entregas Disponíveis</Text>
        {pedidosDisponiveis.map((pedido) => (
          <View key={pedido.id} style={styles.pedidoCard}>
            <View style={styles.pedidoInfo}>
              <View style={styles.lojaRow}>
                <FontAwesome5 name="store" size={16} color="#666" />
                <Text style={styles.lojaText}>{pedido.loja}</Text>
                {pedido.numero && (
                  <>
                    <FontAwesome5 name="search" size={16} color="#666" style={styles.icon} />
                    <Text style={styles.pedidoNumero}>Pedido {pedido.numero}</Text>
                  </>
                )}
              </View>
              <View style={styles.detalhesRow}>
                <View style={styles.detalheItem}>
                  <FontAwesome5 name="map-marker-alt" size={16} color="#666" />
                  <Text style={styles.detalheText}>{pedido.distancia}</Text>
                </View>
                <View style={styles.detalheItem}>
                  <FontAwesome5 name="dollar-sign" size={16} color="#666" />
                  <Text style={styles.detalheText}>{pedido.valor}</Text>
                </View>
              </View>
            </View>
            <View style={styles.botoesContainer}>
              <TouchableOpacity 
                style={[styles.botao, styles.botaoAceitar]} 
                onPress={() => handleAceitar(pedido.id)}
              >
                <Text style={styles.botaoTexto}>Aceitar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.botao, styles.botaoRecusar]}
                onPress={() => handleRecusar(pedido.id)}
              >
                <Text style={[styles.botaoTexto, styles.botaoTextoRecusar]}>Recusar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
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
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subText: {
    fontSize: 16,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  pedidoCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pedidoInfo: {
    marginBottom: 15,
  },
  lojaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  lojaText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  icon: {
    marginLeft: 15,
  },
  pedidoNumero: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  detalhesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detalheItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detalheText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  botao: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  botaoAceitar: {
    backgroundColor: '#000',
  },
  botaoRecusar: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  botaoTextoRecusar: {
    color: '#000',
  },
}); 