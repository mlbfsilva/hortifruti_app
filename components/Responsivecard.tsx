import React from "react";
import { View, StyleSheet, Dimensions, ViewStyle } from "react-native";

const FLATLIST_OUTER_PADDING = 16; // Padding nas extremidades do FlatList

const getCardWidth = (cardMarginRight: number) => {
  const screenWidth = Dimensions.get("window").width;
  const availableWidth = screenWidth - (2 * FLATLIST_OUTER_PADDING); 

  let calculatedWidth = 0;

  if (screenWidth >= 768) {
    // Para telas maiores (tablet, web largo), 3 cartões por linha
    // Largura total = (3 * largura_cartao) + (2 * cardMarginRight)
    calculatedWidth = (availableWidth - (2 * cardMarginRight)) / 3; 
  } else {
    // Para telas menores (celular), 2 cartões por linha
    // Largura total = (2 * largura_cartao) + (1 * cardMarginRight)
    calculatedWidth = (availableWidth - cardMarginRight) / 2; 
  }

  // Arredonda para baixo para evitar sobreposição
  return Math.floor(calculatedWidth); 
};

export const ResponsiveCard = ({ children, style }: { children: React.ReactNode; style?: ViewStyle }) => {
  // Extrai marginRight do objeto de estilo se ele existir, caso contrário, usa 0
  const extractedMarginRight = (style && typeof style === 'object' && 'marginRight' in style && typeof style.marginRight === 'number') ? style.marginRight : 0;
  const size = getCardWidth(extractedMarginRight);

  return (
    <View style={[styles.cardBase, { width: size, height: size * 1.2 }, style]}> 
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  cardBase: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 3,
    justifyContent: "space-between",
    marginBottom: 12,
  },
});