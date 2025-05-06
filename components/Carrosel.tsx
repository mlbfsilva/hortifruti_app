import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { ListRenderItem } from "react-native";
import { ResponsiveCard } from "./Responsivecard";

const screenWidth = Dimensions.get("window").width;

type Pedido = {
  id: string;
  loja: string;
  image: any;
  valor: string;
};

const pedidos: Pedido[] = [
  {
    id: "001",
    loja: "Horta em Casa",
    image: require("../assets/images/hortifruti-logo.png"),
    valor: "R$ 45,90",
  },
  {
    id: "002",
    loja: "Frutaria da Maria",
    image: require("../assets/images/hortifruti-logo.png"),
    valor: "R$ 102,50",
  },
  {
    id: "003",
    loja: "Hortifruti Mais Mais",
    image: require("../assets/images/hortifruti-logo.png"),
    valor: "R$ 24,69",
  },
  {
    id: "004",
    loja: "Hortifruti.com",
    image: require("../assets/images/hortifruti-logo.png"),
    valor: "R$ 55,00",
  },
];

export const CarroselPedidos = () => {
  const renderItem: ListRenderItem<Pedido> = ({ item }) => (
    <ResponsiveCard>
      <View style={styles.content}>
        <Image source={item.image} style={styles.imagem} />
        <View style={styles.info}>
          <Text style={styles.idPedido}>Pedido #{item.id}</Text>
          <Text style={styles.nomeLoja}>{item.loja}</Text>
          <Text style={styles.valor}>{item.valor}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.botao}>
        <Text style={styles.textoBotao}>Pedir Novamente</Text>
      </TouchableOpacity>
    </ResponsiveCard>
  );

  return (
    <FlatList
      data={pedidos}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 3,
    width: screenWidth * 0.5 - 24, // metade da tela com margem
    height: screenWidth * 0.5, // altura igual à largura (quase quadrado)
    marginRight: 12,
    justifyContent: "space-between",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  imagem: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  info: {
    flex: 1,
    flexShrink: 1,
  },
  idPedido: {
    fontSize: 12,
    color: "#888",
  },
  nomeLoja: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  valor: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
  },
  botao: {
    backgroundColor: "#5994d4",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignSelf: "stretch",
    alignItems: "center",
  },
  textoBotao: {
    color: "#fff",
    fontSize: 16,
  },
});

export default CarroselPedidos;
