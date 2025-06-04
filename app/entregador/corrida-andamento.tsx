import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function CorridaAndamento() {
  const router = useRouter();
  const { endereco, complemento } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Corrida em andamento</Text>
      </View>

      <View style={styles.mapContainer}>
        <Image
          source={require('../../assets/images/mapa-brasilia.png')}
          style={styles.mapImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.enderecoContainer}>
          <MaterialIcons name="location-on" size={24} color="#666" />
          <View style={styles.enderecoTexto}>
            <Text style={styles.endereco}>Endereço: Brasília - DF</Text>
            <Text style={styles.complemento}>Complemento: 0000</Text>
          </View>
        </View>

        <View style={styles.estimativaContainer}>
          <Text style={styles.estimativaLabel}>Chegada estimada:</Text>
          <Text style={styles.estimativaTexto}>20 min</Text>
        </View>

        <View style={styles.statusContainer}>
          <View style={styles.statusDot} />
          <Text style={styles.statusTexto}>Entrega</Text>
        </View>

        <TouchableOpacity 
          style={styles.botaoConfirmar}
          onPress={() => {
            // Implementar confirmação de entrega
            console.log('Entrega confirmada');
          }}
        >
          <Text style={styles.botaoTexto}>CONFIRMAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  mapContainer: {
    height: 200,
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flex: 1,
    padding: 16,
  },
  enderecoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  enderecoTexto: {
    flex: 1,
    marginLeft: 12,
  },
  endereco: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  complemento: {
    fontSize: 14,
    color: '#666',
  },
  estimativaContainer: {
    marginBottom: 20,
  },
  estimativaLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  estimativaTexto: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    marginRight: 8,
  },
  statusTexto: {
    fontSize: 16,
    color: '#666',
  },
  botaoConfirmar: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
}); 