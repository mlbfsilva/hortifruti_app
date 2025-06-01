// src/screens/EditStoreInfoScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';

// Importar a lista de parâmetros do ProfileStack
import { ProfileStackParamList } from '../navigation/ProfileStack'; // Ajuste o caminho se necessário

// IMPORTAR O TIPO 'StoreProfile' DIRETAMENTE DE 'src/types/profile.ts'
import { StoreProfile } from '../types/profile'; // <--- CORREÇÃO AQUI

// Definir o tipo das props para esta tela
type EditStoreInfoScreenProps = StackScreenProps<ProfileStackParamList, 'EditStoreInfo'>;

export default function EditStoreInfoScreen({ route, navigation }: EditStoreInfoScreenProps) {
  // Obter os dados do perfil da loja passados via rota
  const { profile: initialProfile } = route.params;

  const [name, setName] = useState(initialProfile.name);
  const [email, setEmail] = useState(initialProfile.email);
  const [phone, setPhone] = useState(initialProfile.phone || ''); // Telefone pode ser opcional
  const [status, setStatus] = useState<'Aberto' | 'Fechado' | 'Em Férias'>(initialProfile.status);
  const [openingFrom, setOpeningFrom] = useState(initialProfile.openingHours.from);
  const [openingTo, setOpeningTo] = useState(initialProfile.openingHours.to);

  const handleSave = () => {
    // Aqui você implementaria a lógica para salvar as informações atualizadas
    // Por exemplo, chamar uma API ou atualizar um estado global
    const updatedProfile: StoreProfile = {
      ...initialProfile,
      name,
      email,
      phone,
      status,
      openingHours: {
        from: openingFrom,
        to: openingTo,
      },
    };
    console.log('Perfil atualizado:', updatedProfile);
    Alert.alert('Sucesso', 'Informações da loja atualizadas com sucesso!');
    navigation.goBack(); // Volta para a tela anterior
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={28} color="#333" />
      </TouchableOpacity>
      <Text style={styles.header}>Editar Informações da Loja</Text>

      <Text style={styles.label}>Nome do Parceiro:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>E-mail:</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

      <Text style={styles.label}>Telefone:</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

      <Text style={styles.label}>Horário de Funcionamento:</Text>
      <View style={styles.timeInputRow}>
        <TextInput
          style={[styles.input, styles.timeInput]}
          value={openingFrom}
          onChangeText={setOpeningFrom}
          placeholder="00:00"
          keyboardType="numeric"
        />
        <Text style={styles.timeSeparator}>até</Text>
        <TextInput
          style={[styles.input, styles.timeInput]}
          value={openingTo}
          onChangeText={setOpeningTo}
          placeholder="00:00"
          keyboardType="numeric"
        />
      </View>

      {/* Exemplo de seleção de status (pode ser um Picker, Radio Buttons, etc.) */}
      <Text style={styles.label}>Status:</Text>
      <View style={styles.statusRow}>
        <TouchableOpacity
          style={[styles.statusButton, status === 'Aberto' && styles.statusButtonActive]}
          onPress={() => setStatus('Aberto')}
        >
          <Text style={[styles.statusButtonText, status === 'Aberto' && styles.statusButtonTextActive]}>Aberto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.statusButton, status === 'Fechado' && styles.statusButtonActive]}
          onPress={() => setStatus('Fechado')}
        >
          <Text style={[styles.statusButtonText, status === 'Fechado' && styles.statusButtonTextActive]}>Fechado</Text>
        </TouchableOpacity>
        {/* Adicione mais opções de status se necessário */}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 48,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
  },
  label: {
    fontWeight: '500',
    fontSize: 15,
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    fontSize: 15,
  },
  timeInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  timeInput: {
    flex: 1,
    marginRight: 8,
  },
  timeSeparator: {
    fontSize: 15,
    color: '#666',
    marginHorizontal: 4,
  },
  statusRow: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 16,
  },
  statusButton: {
    borderWidth: 1,
    borderColor: '#19C37D',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: '#fff',
  },
  statusButtonActive: {
    backgroundColor: '#19C37D',
  },
  statusButtonText: {
    color: '#19C37D',
    fontWeight: '600',
  },
  statusButtonTextActive: {
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#19C37D',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
