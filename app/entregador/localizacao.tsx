import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';

export default function Localizacao() {
  const handlePermitirLocalizacao = async () => {
    try {
      // Aqui você pode adicionar a lógica de permissão de localização
      // Por enquanto vamos apenas redirecionar
      router.push('/entregador/tipo-entrega');
    } catch (error) {
      console.log('Erro ao solicitar permissão:', error);
    }
  };

  const handlePular = () => {
    router.push('/entregador/tipo-entrega');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Bem vindo ao HortFrut
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.permitirButton}
          onPress={handlePermitirLocalizacao}
        >
          <Text style={styles.permitirButtonText}>Permitir localização</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.pularButton}
          onPress={handlePular}
        >
          <Text style={styles.pularButtonText}>Pular</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: '40%',
    paddingBottom: '20%',
  },
  welcomeText: {
    fontSize: 24,
    textAlign: 'center',
    color: '#000',
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  permitirButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permitirButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pularButton: {
    width: '100%',
    alignItems: 'center',
  },
  pularButtonText: {
    color: '#000',
    fontSize: 16,
  },
}); 