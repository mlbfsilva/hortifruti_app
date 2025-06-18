import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface PedidoDisponivel {
  id: string;
  loja: string;
  numero?: string;
  distancia: string;
  endereco: string;
  valor: string;
}

export default function PedidoAceito() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [pedido, setPedido] = useState<PedidoDisponivel | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (id) {
      buscarPedido();
    }
  }, [id]);

  const buscarPedido = async () => {
    setCarregando(true);
    try {
      const { data, error } = await supabase
        .from('solicitacoes_pedidos')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error("Erro ao buscar pedido: ", error.message);
      } else {
        setPedido(data as PedidoDisponivel);
      }
    } catch (error) {
      console.error("Erro ao buscar pedido: ", error);
    } finally {
      setCarregando(false);
    }
  };

  const handleConfirmarRetirada = async () => {
    if (pedido) {
      try {
        const { error } = await supabase
          .from('solicitacoes_pedidos')
          .update({ status: 'em_andamento' })
          .eq('id', pedido.id);

        if (error) {
          console.error('Erro ao confirmar retirada: ', error.message);
          alert('Erro ao confirmar retirada.');
          return;
        }
        
        router.push('/entregador/corrida-andamento');
      } catch (error) {
        console.error('Erro ao confirmar retirada: ', error);
        alert('Erro ao confirmar retirada.');
      }
    }
  };

  if (carregando) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
          <Text style={styles.titulo}>Pedido Aceito</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={styles.loadingText}>Carregando informações do pedido...</Text>
        </View>
      </View>
    );
  }

  if (!pedido) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
          <Text style={styles.titulo}>Pedido Aceito</Text>
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>Pedido não encontrado</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text style={styles.titulo}>Pedido Aceito</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.pedidoHeader}>
            <View style={styles.pedidoTag}>
              <MaterialCommunityIcons name="shopping" size={16} color="#FFF" />
              <Text style={styles.pedidoId}>Pedido #{pedido.numero || id}</Text>
            </View>
            <View style={styles.statusTag}>
              <Text style={styles.statusText}>Aguardando Retirada</Text>
            </View>
          </View>

          <View style={styles.secao}>
            <Text style={styles.subtitulo}>Informações do Pedido:</Text>
            <View style={styles.infoItem}>
              <MaterialCommunityIcons name="store" size={20} color="#666" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Retirar em:</Text>
                <Text style={styles.infoTexto}>{pedido.loja}</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <MaterialCommunityIcons name="clock-outline" size={20} color="#666" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Tempo para retirada:</Text>
                <Text style={styles.infoTexto}>15 minutos</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <MaterialCommunityIcons name="currency-usd" size={20} color="#666" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Valor da entrega:</Text>
                <Text style={styles.infoTexto}>R$ {pedido.valor}</Text>
              </View>
            </View>
          </View>

          <View style={styles.divisor} />

          <View style={styles.secao}>
            <Text style={styles.subtitulo}>Informações da Entrega:</Text>
            <View style={styles.infoItem}>
              <MaterialCommunityIcons name="map-marker" size={20} color="#666" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Endereço de entrega:</Text>
                <Text style={styles.infoTexto}>{pedido.endereco}</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <MaterialCommunityIcons name="map-marker-distance" size={20} color="#666" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Distância:</Text>
                <Text style={styles.infoTexto}>{pedido.distancia} km</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.botoesContainer}>
        <TouchableOpacity 
          style={styles.botaoConfirmar}
          activeOpacity={0.8}
          onPress={handleConfirmarRetirada}
        >
          <Text style={styles.botaoTexto}>CONFIRMAR RETIRADA</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.botaoCancelar}
          activeOpacity={0.8}
          onPress={() => router.back()}
        >
          <Text style={styles.botaoTexto}>CANCELAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
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
  errorText: {
    fontSize: 16,
    color: '#ff0000',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pedidoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  pedidoTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  pedidoId: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  statusTag: {
    backgroundColor: '#FFF9C4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#FBC02D',
    fontSize: 12,
    fontWeight: '500',
  },
  secao: {
    marginVertical: 16,
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  infoTexto: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  divisor: {
    height: 1,
    backgroundColor: '#eee',
    marginHorizontal: -16,
  },
  botoesContainer: {
    padding: 16,
    gap: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  botaoConfirmar: {
    backgroundColor: '#000',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  botaoCancelar: {
    backgroundColor: '#000',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
}); 