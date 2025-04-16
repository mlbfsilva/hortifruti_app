import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import Carrossel from '@/components/Carrosel';

export default function TabOneScreen() {
  const cards = ['Frutas', 'Graõs e produtos naturais', 'Hortaliças', 'Raizes e temperos'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Endereço</Text>

      <Text
        style={styles.getStartedText}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)">
        Promoção do dia:
      </Text>

      <View style={styles.row}>
        {cards.map((label, index) => (
          <View
            key={index}
            style={[styles.box, index < cards.length - 1]}>
            <Text style={styles.cardText}>{label}</Text>
          </View>
        ))}
      </View>
      <Carrossel /> 

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
