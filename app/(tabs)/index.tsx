import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import {CarroselPedidos} from '@/components/Carrosel';
import CarroselCategorias from '@/components/CarroselPromo';

export default function TabOneScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Endereço</Text>
      <CarroselCategorias/>
      
      <CarroselPedidos/>
      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 5,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
    marginVertical: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 381,
  },
  box: {
    height: 80,
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.10)',
    backgroundColor: '#FCFCFE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    marginRight: 7,
  },
  cardText: {
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 15,
    fontWeight: '400',
  },


});
