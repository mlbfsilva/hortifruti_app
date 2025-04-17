
import { View, Text, Image, StyleSheet, TouchableOpacity, ListRenderItem, FlatList } from 'react-native';
import Animated from 'react-native-reanimated';


const pedidos: Pedido[] = [
  {
    id: "001",
    loja: "Horta em Casa",
    image: '../assets/images/hortifruti-logo.png',
    valor: 'R$ 45,90',
  },
  {
    id: "002",
    loja: "Frutaria da Maria",
    image: '../assets/images/hortifruti-logo.png',
    valor: 'R$ 102,50',
  },
  {
    id: "003",
    loja: "Hortifruti Mais Mais",
    image: '../assets/images/hortifruti-logo.png',
    valor: 'R$ 24,69',
  },
  {
    id: "004",
    loja: "Hortifruti.com",
    image: '../assets/images/hortifruti-logo.png',
    valor: 'R$ 55,00',
  },
]
type Pedido ={
  id: string;
  loja: string;
  image: any;
  valor: string;
};

export const CarroselPedidos = () => {
  const renderItem: ListRenderItem<Pedido> = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.imagem} />
      <View style={styles.info}>
        <Text style={styles.idPedido}>Pedido #{item.id}</Text>
        <Text style={styles.nomeLoja}>{item.loja}</Text>
        <Text style={styles.valor}>{item.valor}</Text>
        </View>
        <TouchableOpacity style={styles.botao}>
          <Text style={styles.textoBotao}>Pedir Novamente</Text>
        </TouchableOpacity>
      
    </View>
  );
  return (
    <FlatList 
    data={pedidos}
    renderItem={renderItem}
    keyExtractor={(item)=> item.id}
    horizontal showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  
  card:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    marginRight: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 3,
    minWidth: 280
  },

  imagem:{
    width: 54,
    height: 54,
    borderRadius: 24,
    marginRight: 12,
  },

  info:{
    flex: 1,
  },

  idPedido:{
    fontSize: 12,
    color: '#888',
  },

  nomeLoja:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333,'
  },

  valor:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },

  botao:{
    backgroundColor: '#5994d4',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16, 
  },

  textoBotao:{
    color: '#fff',
    fontSize: 16,
  },
})