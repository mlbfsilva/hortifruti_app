import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert} from 'react-native';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { supabase } from "@/lib/supabase";

export default function criarContaParceiros(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confimarsenha, setConfirmarSenha] = useState('');

    const handleConfirmar = () => {
        if (!email || !password || !confimarsenha) {
            Alert.alert(
            "Atenção",
            "Campos incompletos. Para avançar, preencha o campo corretamente.",
            [{ text: "OK" }]
);
            return;
        }
        router.push('/parceiros/criar-conta-info');
    }
    const handleVoltar = () => {
        router.back();
    };

  async function handleSignUp() {
  if (password !== confimarsenha) {
    Alert.alert("Erro", "As senhas não coincidem.");
    return;
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: email
      }
    }
  });

  if (error) {
    Alert.alert('Erro', error.message);
    return;
  }

  router.push('/parceiros/criar-conta-info');
}


    return(
        <View style={styles.container}>
            {/* <View style={styles.header}>
                <TouchableOpacity onPress={handleVoltar} style={styles.backButton}>
                <AntDesign name="left" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Cadastro</Text>
            </View> */}
            <View style={styles.infoPage}>
                <Text style={styles.pageTitle}>Cadastro para Parceiros</Text>
                <Text style={styles.pageParagrafo}>Para iniciar o cadastro informe o e-mail e a senha que será usada para acessar o aplicativo</Text>
            </View>
            <View style={styles.formContainer}>
              <Text style={styles.label}>Email:</Text>
                              <TextInput
                                  style={styles.input}
                                  value={email}
                                  onChangeText={setEmail}
                                  keyboardType="email-address"
                                  autoCapitalize="none"
                              />
                      
                              <Text style={styles.label}>Senha:</Text>
                              <TextInput
                                  style={styles.input}
                                  value={password}
                                  onChangeText={setPassword}
                                  secureTextEntry
                                  placeholder="********"
                              />

                              <Text style={styles.label}>Digite a senha novamente:</Text>
                              <TextInput 
                                style={styles.input}
                                value={confimarsenha}
                                onChangeText={setConfirmarSenha}
                                secureTextEntry
                                placeholder="********"
                              />

                              <TouchableOpacity style={styles.confimButton} onPress={handleSignUp}>
                                <Text style={styles.confirmButtonText}>Próximo</Text>
                              </TouchableOpacity>

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
  }
});