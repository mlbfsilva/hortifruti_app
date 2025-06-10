import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BarChartProps {
  data: { day: string; value: number }[];
}

export default function BarChart({ data }: BarChartProps) {
  return (
    <View style={styles.chartContainer}>
      {data.map((item) => (
        <View key={item.day} style={styles.barContainer}>
          <View style={[styles.bar, { height: item.value }]} />
          <Text style={styles.barLabel}>{item.day}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 200,
    paddingTop: 20,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 20,
    backgroundColor: '#2196F3',
    borderRadius: 10,
    opacity: 0.8,
  },
  barLabel: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
  },
});
