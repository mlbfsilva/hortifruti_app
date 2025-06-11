// components/StatCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatCardProps {
  value: string | number;
  subtitle: string;
}

export default function StatCard({ value, subtitle }: StatCardProps) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statSubtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '47%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statSubtitle: {
    fontSize: 14,
    color: '#666',
  },
});
