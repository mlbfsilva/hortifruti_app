import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert} from 'react-native';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import { ScrollView } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export default function criarContaParceirosInfo(){
    const [nomeParceiro, setNomeParceiro] = useState('');
    const [segunda, setSegunda] = useState('');
    const [segundafim, setSegundaFim] = useState('');
    const[terca, setTerca] = useState('');
    const [tercafim, setTercaFim] = useState('');
    const [quarta, setQuarta] = useState('');
    const [quartafim, setQuartaFim] = useState('');
    const [quinta, setQuinta] = useState('');
    const [quintafim, setQuintaFim] = useState('');
    const [sexta, setSexta] = useState('');
    const [sextafim, setSextaFim] = useState('');
    const [sabado, setSabado] = useState('');
    const [sabadofim, setSabadoFim] = useState('');
    const [domingo, setDomingo] = useState('');
    const [domingofim, setDomingoFim] = useState('');

    const handleConfirmar =() => {
        if (!nomeParceiro){
            Alert.alert(
                "Atenção",
                "Para avançar complete o Nome do Parceiro",
                [{text: "OK"}]

            );
            return;
        }

        router.push('./parceiros/criar-conta-endereco')
    }
    /* const handleProximaPagina = () => {
          router.push('./parceiros/criar-conta-info');
    } */

    return(
        <ScrollView>
            <View style={styles.container}>
            <View style={styles.infoPage}>
                <Text style={styles.pageTitle}>Cadastro para Parceiros</Text>
                <Text style={styles.pageParagrafo}>Para finalizar o cadastro, adicione informações sobre o parceiro.</Text>
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.label}>Nome do Parceiro:</Text>
                <TextInput 
                    style={styles.input}
                    value={nomeParceiro}
                    onChangeText={setNomeParceiro}
                    keyboardType="default"
                />

                <Text style={styles.label}>Horário de Funcionamento por dia da semana:</Text>
                <Text style={styles.label}>Domingo:</Text>
                <Text style={styles.label}>Hora Início:</Text>
                <TextInputMask
                    type={'datetime'}
                    options={{
                    format: 'HH:mm',
                    }}
                    style={styles.input}
                    value={domingo}
                    onChangeText={setDomingo}
                    keyboardType="numeric"
                    placeholder="__:__"
                    refInput={ref => {}} 
                />
                <Text style={styles.label}>Hora Fim:</Text>
                <TextInputMask
                    type={'datetime'}
                    options={{
                    format: 'HH:mm',
                    }}
                    style={styles.input}
                    value={domingofim}
                    onChangeText={setDomingoFim}
                    keyboardType="numeric"
                    placeholder="__:__"
                />
                <View style={styles.separador}/>

                <Text style={styles.label}>Segunda:</Text>
                <Text style={styles.label}>Hora Início:</Text>
                <TextInputMask
                    type={'datetime'}
                    options={{
                    format: 'HH:mm',
                    }}
                    style={styles.input}
                    value={segunda}
                    onChangeText={setSegunda}
                    keyboardType="numeric"
                    placeholder="__:__"
                />
                <Text style={styles.label}>Hora Fim:</Text>
                <TextInputMask
                    type={'datetime'}
                    options={{
                    format: 'HH:mm',
                    }}
                    style={styles.input}
                    value={segundafim}
                    onChangeText={setSegundaFim}
                    keyboardType="numeric"
                    placeholder="__:__"
                />
                <View style={styles.separador}/>

                <Text style={styles.label}>Terça:</Text>
                <Text style={styles.label}>Hora Início:</Text>
                <TextInputMask
                    type={'datetime'}
                    options={{
                    format: 'HH:mm',
                    }}
                    style={styles.input}
                    value={terca}
                    onChangeText={setTerca}
                    keyboardType="numeric"
                    placeholder="__:__"
                />
                <Text style={styles.label}>Hora Fim:</Text>
                <TextInputMask
                    type={'datetime'}
                    options={{
                    format: 'HH:mm',
                    }}
                    style={styles.input}
                    value={tercafim}
                    onChangeText={setTercaFim}
                    keyboardType="numeric"
                    placeholder="__:__"
                />
                <View style={styles.separador}/>

                <Text style={styles.label}>Quarta:</Text>
                <Text style={styles.label}>Hora Início:</Text>
                <TextInputMask
                    type={'datetime'}
                    options={{
                    format: 'HH:mm',
                    }}
                    style={styles.input}
                    value={quarta}
                    onChangeText={setQuarta}
                    keyboardType="numeric"
                    placeholder="__:__"
                />
                <Text style={styles.label}>Hora Fim:</Text>
                <TextInputMask
                    type={'datetime'}
                    options={{
                    format: 'HH:mm',
                    }}
                    style={styles.input}
                    value={quartafim}
                    onChangeText={setQuartaFim}
                    keyboardType="numeric"
                    placeholder="__:__"
                />
                <View style={styles.separador}/>

                <Text style={styles.label}>Quinta:</Text>
                <Text style={styles.label}>Hora Início:</Text>
                <TextInputMask
                    type={'datetime'}
                    options={{
                    format: 'HH:mm',
                    }}
                    style={styles.input}
                    value={quinta}
                    onChangeText={setQuinta}
                    keyboardType="numeric"
                    placeholder="__:__"
                />
                <Text style={styles.label}>Hora Fim:</Text>
                <TextInputMask
                    type={'datetime'}
                    options={{
                    format: 'HH:mm',
                    }}
                    style={styles.input}
                    value={quintafim}
                    onChangeText={setQuintaFim}
                    keyboardType="numeric"
                    placeholder="__:__"
                />
                <View style={styles.separador}/>

                <Text style={styles.label}>Sexta:</Text>
                <Text style={styles.label}>Hora Início:</Text>
                <TextInputMask
                    type={'datetime'}
                    options={{
                    format: 'HH:mm',
                    }}
                    style={styles.input}
                    value={sexta}
                    onChangeText={setSexta}
                    keyboardType="numeric"
                    placeholder="__:__"
                />
                <Text style={styles.label}>Hora Fim:</Text>
                <TextInputMask
                    type={'datetime'}
                    options={{
                    format: 'HH:mm',
                    }}
                    style={styles.input}
                    value={sextafim}
                    onChangeText={setSextaFim}
                    keyboardType="numeric"
                    placeholder="__:__"
                />
                <View style={styles.separador}/>

                <Text style={styles.label}>Sábado:</Text>
                <Text style={styles.label}>Hora Início:</Text>
                <TextInputMask
                    type={'datetime'}
                    options={{
                    format: 'HH:mm',
                    }}
                    style={styles.input}
                    value={sabado}
                    onChangeText={setSabado}
                    keyboardType="numeric"
                    placeholder="__:__"
                />
                <Text style={styles.label}>Hora Fim:</Text>
                <TextInputMask
                    type={'datetime'}
                    options={{
                    format: 'HH:mm',
                    }}
                    style={styles.input}
                    value={sabadofim}
                    onChangeText={setSabadoFim}
                    keyboardType="numeric"
                    placeholder="__:__"
                />
                <TouchableOpacity style={styles.confimButton} onPress={handleConfirmar}>
                    <Text style={styles.confirmButtonText}>Próximo</Text>
                </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
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
  formContainer: {
    flex: 1,
    padding: 20,
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
  },
  separador: {
    borderBottomWidth: 1,
    borderColor: '#000',
    marginBottom: 16
  }
});