import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert} from 'react-native';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

export default function criarContaParceiros(){
    const [nomeParceiro, setNomeParceiro] = useState();
    const [segunda, setSegunda] = useState();
    const [segundafim, setSegundaFim] = useState();
    const [tercafim, setTercaFim] = useState();
    const [quarta, setQuarta] = useState();
    const [quartafim, setQuartaFim] = useState();
    const [quinta, setQuinta] = useState();
    const [quintafim, setQuintaFim] = useState();
    const [sexta, setSexta] = useState();
    const [sextafim, setSextaFim] = useState();
    const [sabado, sexSabado] = useState();
    const [sabadofim, sexSabadoFim] = useState();
    const [domingo, setDomingo] = useState();
    const [domingofim, setDomingoFim] = useState();

    const handleConfirmar = () => {
        if (!nomeParceiro) {
            Alert.alert(
            "Atenção",
            "Campo nome incompleto. Para avançar, preencha o campo corretamente.",
            [{ text: "OK" }]
);
            return;
        }
    }
    const handleVoltar = () => {
        router.back();
    };

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleVoltar} style={styles.backButton}>
                <AntDesign name="left" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Cadastro</Text>
            </View>
            <View style={styles.infoPage}>
                <Text style={styles.pageTitle}>Cadastro para Parceiros</Text>
                <Text style={styles.pageParagrafo}>Para iniciar o cadastro informe o e-mail e a senha que será usada para acessar o aplicativo</Text>
            </View>
        </View>
    )
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
  pageTitle: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  pageParagrafo: {
    color: '#000',
    fontSize: 16,
    alignItems: 'center',
    marginLeft: 14,
    marginRight: 14,
    marginTop: 12,
  },
  infoPage: {
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
  }
});