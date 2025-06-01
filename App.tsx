import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './src/navigation/BottomTabs';
import { View, StyleSheet } from 'react-native'; // <--- Importe StyleSheet também

export default function App() {
  return (
    // Esta View deve ter flex: 1 para garantir que ocupa toda a tela
    <View style={styles.container}>
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Um fundo claro para garantir que não está escondido por cor
  },
});