import React, { useState } from "react";
import { StyleSheet, View, Text, Alert, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import AnimatedCheckbox from 'react-native-checkbox-reanimated';

export default function CriarContaParceiroFormaPagamento() {
  const [pix, setPix] = useState(false);
  const [debito, setDebito] = useState(false);
  const [credito, setCredito] = useState(false);

  const handleCadastro = () => {
    const selecionados = [];
    if (pix) selecionados.push("PIX");
    if (debito) selecionados.push("Cartão de débito");
    if (credito) selecionados.push("Cartão de crédito");

    if (selecionados.length === 0) {
      Alert.alert("Erro", "Selecione pelo menos uma forma de pagamento.");
      return;
    }

    Alert.alert(
      "Pagamento(s) selecionado(s)",
      selecionados.join(", "),
      [{ text: "OK", onPress: () => router.push("./proximaEtapa") }]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Cadastro para Parceiros</Text>
        <Text style={styles.infopage}>
          Para finalizar o cadastro, adicione informações sobre a forma de pagamento aceita pelo parceiro.
        </Text>

        <View style={styles.opcao}>
          <Pressable onPress={() => setPix(!pix)} style={styles.checkbox}>
            <AnimatedCheckbox
              checked={pix}
              highlightColor="#1DFF3F"
              checkmarkColor="#ffffff"
              boxOutlineColor="#1DFF3F"
            />
          </Pressable>
          <Text style={styles.label}>PIX</Text>
        </View>
        <View style={styles.separador} />

        <View style={styles.opcao}>
          <Pressable onPress={() => setDebito(!debito)} style={styles.checkbox}>
            <AnimatedCheckbox
              checked={debito}
              highlightColor="#1DFF3F"
              checkmarkColor="#ffffff"
              boxOutlineColor="#1DFF3F"
            />
          </Pressable>
          <Text style={styles.label}>Cartão de débito</Text>
        </View>
        <View style={styles.separador} />

        <View style={styles.opcao}>
          <Pressable onPress={() => setCredito(!credito)} style={styles.checkbox}>
            <AnimatedCheckbox
              checked={credito}
              highlightColor="#1DFF3F"
              checkmarkColor="#ffffff"
              boxOutlineColor="#1DFF3F"
            />
          </Pressable>
          <Text style={styles.label}>Cartão de crédito</Text>
        </View>
        <View style={styles.separador} />

        <TouchableOpacity style={styles.confimButton} onPress={handleCadastro}>
          <Text style={styles.confirmButtonText}>Cadastrar-se</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  infopage: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
    marginTop: 10,
    marginBottom: 30,
  },
  opcao: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  separador: {
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 16,
  },
  confimButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#1DFF3F',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
