import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { supabase } from "../../lib/supabase";

export default function CriarContaEntregador() {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

async function handleCadastro() {
    if (!nomeCompleto || !telefone || !cpf || !email) {
      Alert.alert("Erro", "Todos os campos devem ser preenchidos!");
      return;
    }

    const { data, error } = await supabase
      .from("entregador")
      .insert([{ 
        nome_entregador: nomeCompleto,
        telefone: telefone,
        cpf: cpf,
        email:email 
      }]);

    if (error) {
      Alert.alert("Erro", error.message);
    } else {
        router.push({
          pathname: "/entregador/confirmar-telefone",
          params: { nomeCompleto, telefone, cpf, email },
        });
      }
  };

  const handleVoltar = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleVoltar} style={styles.backButton}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cadastro:</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.welcomeText}>Seja bem-vindo ao Hortfrut</Text>
        <Text style={styles.subtitleText}>
          Preencha seus dados abaixo{'\n'}para realizar o cadastro
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Nome Completo:</Text>
          <TextInput
            style={styles.input}
            value={nomeCompleto}
            onChangeText={setNomeCompleto}
            autoCapitalize="words"
          />

          <Text style={styles.label}>CPF:</Text>
          <TextInput
            style={styles.input}
            value={cpf}
            onChangeText={setCpf}
            keyboardType="numeric"
            maxLength={11}
          />

          <Text style={styles.label}>Telefone:</Text>
          <TextInput
            style={styles.input}
            value={telefone}
            onChangeText={setTelefone}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.confirmButton} onPress={handleCadastro}>
            <Text style={styles.confirmButtonText}>CONFIRMAR</Text>
          </TouchableOpacity>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  content: {
    padding: 20,
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  form: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
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
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 