import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert} from 'react-native';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import { ScrollView } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export default function criarContaParceirosEndereco(){
    const [cep, setCep] = useState('');
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');

    const handleConfirmar = () => {
        router.push('./parceiros/criar-conta-forma-pagamento')
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.infoPage}>
                    <Text style={styles.pageTitle}>Cadastro para Parceiros</Text>
                    <Text style={styles.pageParagrafo}>Para finalizar o cadastro, adicione informações sobre o parceiro.</Text>
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.label}>CEP do Parceiro:</Text>
                    <TextInput
                        style={styles.input}
                        value={cep}
                        onChangeText={setCep}
                        keyboardType="numeric"
                        placeholder="___.___.___-__"
                    />
                    <Text style={styles.label}>Estado:</Text>
                    <TextInput
                        style={styles.input}
                        value={estado}
                        onChangeText={setCep}
                        keyboardType="default"
                    />
                    <Text style={styles.label}>Cidade:</Text>
                    <TextInput
                        style={styles.input}
                        value={cidade}
                        onChangeText={setCidade}
                        keyboardType="default"
                    />
                    <Text style={styles.label}>Rua:</Text>
                    <TextInput
                        style={styles.input}
                        value={rua}
                        onChangeText={setRua}
                        keyboardType="default"
                    />
                    <View style={styles.ladocontainer}>
                        <View style={styles.ladolado}>
                            <Text style={styles.label}>Número:</Text>
                        <TextInput
                            style={styles.inputb}
                            value={numero}
                            onChangeText={setNumero}
                            keyboardType="numeric"
                        />
                        </View>
                        <View style={styles.ladolado}>
                            <Text style={styles.label}>Complemento:</Text>
                        <TextInput
                            style={styles.inputb}
                            value={complemento}
                            onChangeText={setComplemento}
                            keyboardType="default"
                        />
                        </View>
                    </View>
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
  },
  ladocontainer: {
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
  },
  ladolado: {
    flexDirection: 'column',
  },
  inputb: {
    width: 100,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
  }
});