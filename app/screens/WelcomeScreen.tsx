import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image, Dimensions } from 'react-native';
import { router } from 'expo-router';

const windowWidth = Dimensions.get('window').width;

export default function WelcomeScreen() {
  const handleOptionPress = (option: string) => {
    if (option === 'Entregador') {
      router.replace('/entregador/cadastro');
    
    }
    if (option === 'Parceiros'){
      router.replace('/parceiros/login');
    }
    else {
      console.log(`Selecionou: ${option}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.starContainer}>
          <Image
            source={require('../assets/images/Star 1.png')}
            style={styles.starImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>Bem vindo!</Text>
          <Text style={styles.subtitleText}>
            Como deseja acessar nossa plataforma?
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity 
            style={styles.optionButton}
            onPress={() => handleOptionPress('Entregador')}
          >
            <View style={styles.optionCircle}>
              {/* Aqui você pode adicionar um ícone para Entregador */}
            </View>
            <Text style={styles.optionText}>Entregador</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.optionButton}
            onPress={() => handleOptionPress('Cliente')}
          >
            <View style={styles.optionCircle}>
              {/* Aqui você pode adicionar um ícone para Cliente */}
            </View>
            <Text style={styles.optionText}>Cliente</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.optionButton}
            onPress={() => handleOptionPress('Parceiros')}
          >
            <View style={styles.optionCircle}>
              {/* Aqui você pode adicionar um ícone para Parceiros */}
            </View>
            <Text style={styles.optionText}>Parceiros</Text>
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
    padding: 16,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 16,
    color: '#666',
  },
  contentContainer: {
    width: windowWidth,
    paddingHorizontal: 35,
    paddingTop: 112,
    paddingBottom: 121,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 77,
  },
  starContainer: {
    alignItems: 'center',
  },
  starImage: {
    width: 170,
    height: 150,
  },
  textContainer: {
    alignItems: 'center',
    gap: 16,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  optionButton: {
    alignItems: 'center',
  },
  optionCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionText: {
    fontSize: 16,
    marginTop: 8,
    color: '#333',
  },
}); 