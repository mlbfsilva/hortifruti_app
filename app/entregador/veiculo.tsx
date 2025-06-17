import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function Veiculo() {
  const params = useLocalSearchParams();
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleConfirmar = async () => {
    if (!selectedOption) {
      Alert.alert("Erro", "Selecione um tipo de veículo.");
      return;
    }

    const { data, error } = await supabase
      .from("tipoentrega")
      .insert([{
        tipo: params.selectedOption,
        veiculo: selectedOption,
      }]);

    if (error) {
      Alert.alert("Erro ao salvar", error.message);
      return;
    }

    router.push('/entregador/(tabs)');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>De que forma deseja fazer a entrega?</Text>

      <TouchableOpacity
        style={[
          styles.optionButton,
          selectedOption === 'moto' && styles.selectedOption,
        ]}
        onPress={() => handleOptionSelect('moto')}
      >
        <Text style={styles.optionText}>Moto</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.optionButton,
          selectedOption === 'carro' && styles.selectedOption,
        ]}
        onPress={() => handleOptionSelect('carro')}
      >
        <Text style={styles.optionText}>Carro</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.confirmButton,
          !selectedOption && styles.disabledButton,
        ]}
        onPress={handleConfirmar}
        disabled={!selectedOption}
      >
        <Text style={styles.confirmButtonText}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 40,
    textAlign: 'center',
  },
  optionButton: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  selectedOption: {
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
  },
  optionText: {
    fontSize: 18,
  },
  confirmButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#666',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
