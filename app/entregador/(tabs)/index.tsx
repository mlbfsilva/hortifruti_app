import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { createClient } from '@supabase/supabase-js';
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

export default function HomeEntregador() {
  const router = useRouter();
  const [pedidosDisponiveis, setPedidosDisponiveis] = useState<PedidoDisponivel[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(()=>{buscarPedidosDisponiveis();}, []);

  const buscarPedidosDisponiveis = async () => {
    setCarregando(true);
    const {data, error} = await supabase
    .from('solicitacoes_pedidos')
    .select('*')
    .eq('status', 'disponivel');

    if (error) {
      console.error("Erro ao buscar pedidos: ", error.message);
    }else {
      setPedidosDisponiveis(data as PedidoDisponivel[]);
    }
    setCarregando(false);
  }

  const aceitarPedidos = async (id: string) =>{
    const {error} = await supabase
    .from('solicitacoes_pedidos')
    .update({status: 'em_andamento'})
    .eq('id', id);

    if(error){
      console.error('Erro ao aceitar pedido: ', error.message);
      return false;
    }
    return true;
  };

  
  const handleAceitar = async (id: string) =>{
    const sucesso = await 
    aceitarPedidos(id);
    if(sucesso){
      router.push({
        pathname: '/entregador/pedido-aceito',
        params: {id}
      });
    }else {
      alert('Erro ao aceitar o pedido.');
    }
  };

  const handleRecusar = (id: string) => {
    console.log('Pedido recusado: ', id);
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

        {carregando ? (
          <ActivityIndicator size="large" color="#000" />
        ) : pedidosDisponiveis.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum pedido disponível no momento.</Text>
        ) : (
          pedidosDisponiveis.map((solicitacoes_pedidos) => (
            <View key={solicitacoes_pedidos.id} style={styles.pedidoCard}>
              <View style={styles.pedidoInfo}>
                <View style={styles.lojaRow}>
                  <FontAwesome5 name="store" size={16} color="#666" />
                  <Text style={styles.lojaText}>{solicitacoes_pedidos.endereco}</Text>
                  {solicitacoes_pedidos.numero && (
                    <>
                      <FontAwesome5 name="search" size={16} color="#666" style={styles.icon} />
                      <Text style={styles.pedidoNumero}>Pedido {solicitacoes_pedidos.numero}</Text>
                    </>
                  )}
                </View>
                <View style={styles.detalhesRow}>
                  <View style={styles.detalheItem}>
                    <FontAwesome5 name="map-marker-alt" size={16} color="#666" />
                    <Text style={styles.detalheText}>{solicitacoes_pedidos.distancia}</Text>
                  </View>
                  <View style={styles.detalheItem}>
                    <FontAwesome5 name="dollar-sign" size={16} color="#666" />
                    <Text style={styles.detalheText}>{solicitacoes_pedidos.valor}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.botoesContainer}>
                <TouchableOpacity 
                  style={[styles.botao, styles.botaoAceitar]} 
                  onPress={() => handleAceitar(solicitacoes_pedidos.id)}
                >
                  <Text style={styles.botaoTexto}>Aceitar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.botao, styles.botaoRecusar]}
                  onPress={() => handleRecusar(solicitacoes_pedidos.id)}
                >
                  <Text style={[styles.botaoTexto, styles.botaoTextoRecusar]}>Recusar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
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