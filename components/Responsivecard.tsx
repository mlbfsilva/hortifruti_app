import React from "react";
import { View, StyleSheet, Dimensions, ViewStyle } from "react-native";

const getCardWidth = () => {
  const screenWidth = Dimensions.get("window").width;
  return screenWidth >= 768 ? screenWidth / 3 - 24 : screenWidth / 2 - 24;
};

export const ResponsiveCard = ({ children, style }: { children: React.ReactNode; style?: ViewStyle }) => {
  const size = getCardWidth();

  return (
    <View style={[styles.cardBase, { width: size, height: size }, style]}>
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
    marginRight: 12,
    justifyContent: "space-between",
  },
});