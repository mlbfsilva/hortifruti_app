import React, { useState } from "react";
import {StyleSheet, View, Text, Alert, Pressable, TouchableOpacity, ScrollView,} from "react-native";
import { router } from "expo-router";


export default function criarContaParceirosAnalise() {
  const [check, setCheck] = useState<boolean>(false);

  const handleConfirmar = () => {
    router.push("./algumlugar");

  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Análise para Parceiros</Text>
        <Text style={styles.infoPage}>
          Agora suas informações serão processadas por uma equipe responsável que irá confirmar seu cadastro. Você será notificado no Aplicativo e E-mail.
        </Text>
        <Text style={styles.pageParagrafo}>
          Aguarde a conclusão do cadastro para poder utilizar o aplicativo como parceiro
        </Text>


        <TouchableOpacity style={styles.confimButton} onPress={handleConfirmar}>
          <Text style={styles.confirmButtonText}>Próximo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  confimButton: {
    width: "100%",
    height: 48,
    backgroundColor: "#1DFF3F",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  confirmButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  pageTitle: {
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  pageParagrafo: {
    color: "#000",
    fontSize: 16,
    marginHorizontal: 14,
    marginTop: 12,
    alignItems: 'center',
    fontWeight: 'bold',
  },
  infoPage: {
    marginTop: 24,
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    alignItems: 'center',
  },
  ladocontainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    paddingHorizontal: 10,
  },
  checkbox: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
});
