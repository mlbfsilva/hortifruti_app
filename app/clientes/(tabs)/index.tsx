import { StyleSheet, ScrollView, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { CarroselPedidos } from '@/components/Carrosel';
import CarroselCategorias from '@/components/CarroselPromo';

export default function HomeCliente() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Seção do Endereço */}
          <View style={styles.addressBar}>
            <View style={styles.addressTextWrapper}>
              <Text style={styles.addressText}>Endereço</Text>
              <AntDesign name="caretdown" size={16} color="#333" />
            </View>
            <TouchableOpacity style={styles.bellIcon}>
              <AntDesign name="bells" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {/* Seção de Promoções do Dia (Carrossel Placeholder) */}
          <View style={styles.promoCarouselContainer}>
            <Text style={styles.promoCarouselText}>Promoções do Dia</Text>
            <Text style={styles.promoCarouselSubtext}>(carrossel)</Text>
            {/* Placeholder para o carrossel de promoções real */}
            <View style={styles.promoIndicators}>
              <View style={styles.promoIndicator}></View>
              <View style={styles.promoIndicator}></View>
              <View style={styles.promoIndicator}></View>
              <View style={styles.promoIndicator}></View>
            </View>
          </View>

          {/* Seção de Categorias */}
          <View style={styles.section}>
            <CarroselCategorias />
          </View>

          {/* Seção Pedir Novamente? */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Pedir novamente?</Text>
          </View>
          <View style={styles.section}>
            <CarroselPedidos />
          </View>

          {/* Seção Lojas */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Lojas</Text>
            <AntDesign name="right" size={18} color="black" />
          </View>
          <View style={styles.section}>
            {/* Placeholder para o carrossel ou lista de lojas */}
            <Text>Conteúdo das Lojas aqui</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  addressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 16,
  },
  addressTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  addressText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
  },
  bellIcon: {
    // position: 'absolute', // Removido para usar justify-content: 'space-between'
    // right: 20,
  },
  promoCarouselContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 15,
    height: 180, // Altura fixa para o placeholder
  },
  promoCarouselText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  promoCarouselSubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  promoIndicators: {
    flexDirection: 'row',
    marginTop: 20,
  },
  promoIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  section: {
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 25,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
