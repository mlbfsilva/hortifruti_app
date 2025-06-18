import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function TipoEntrega() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleConfirmar = () => {
    if (!selectedOption) return;

    router.push({
      pathname: '/entregador/veiculo',
      params: { selectedOption },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Como deseja fazer entrega?</Text>

      <TouchableOpacity
        style={[
          styles.optionButton,
          selectedOption === 'fixo' && styles.selectedOption,
        ]}
        onPress={() => handleOptionSelect('fixo')}
      >
        <Text style={styles.optionText}>Fixo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.optionButton,
          selectedOption === 'livre' && styles.selectedOption,
        ]}
        onPress={() => handleOptionSelect('livre')}
      >
        <Text style={styles.optionText}>Livre</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.confirmButton,
          !selectedOption && styles.disabledButton,
        ]}
        onPress={handleConfirmar}
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
