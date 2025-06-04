import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MOCK_DATA = {
  pedidos: 395,
  produtos: 605,
  valor: 6590.60,
  satisfacao: 75,
  weeklyData: [
    { day: 'Seg', value: 100 },
    { day: 'Ter', value: 90 },
    { day: 'Qua', value: 80 },
    { day: 'Qui', value: 70 },
    { day: 'Sex', value: 60 },
    { day: 'Sab', value: 50 },
    { day: 'Dom', value: 40 },
  ],
};

export default function DashboardScreen() {
  const [activeTab, setActiveTab] = useState('weekly');

  const renderStatCard = (title: string, value: string | number, subtitle: string) => (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statSubtitle}>{subtitle}</Text>
    </View>
  );

  const renderBarChart = () => (
    <View style={styles.chartContainer}>
      {MOCK_DATA.weeklyData.map((item, index) => (
        <View key={item.day} style={styles.barContainer}>
          <View style={[styles.bar, { height: item.value }]} />
          <Text style={styles.barLabel}>{item.day}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <View style={styles.statsGrid}>
        {renderStatCard(
          'Pedidos',
          MOCK_DATA.pedidos,
          'Pedidos'
        )}
        {renderStatCard(
          'Produtos',
          MOCK_DATA.produtos,
          'Produtos Vendidos'
        )}
        {renderStatCard(
          'Valor',
          `R$ ${MOCK_DATA.valor.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
          'Valor'
        )}
        {renderStatCard(
          'Satisfação',
          `${MOCK_DATA.satisfacao}%`,
          'Satisfação'
        )}
      </View>

      <View style={styles.periodContainer}>
        <Text style={styles.sectionTitle}>Por período</Text>
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'weekly' && styles.activeTabButton]}
            onPress={() => setActiveTab('weekly')}
          >
            <Text style={[styles.tabText, activeTab === 'weekly' && styles.activeTabText]}>
              Semanal
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'monthly' && styles.activeTabButton]}
            onPress={() => setActiveTab('monthly')}
          >
            <Text style={[styles.tabText, activeTab === 'monthly' && styles.activeTabText]}>
              Mensal
            </Text>
          </TouchableOpacity>
        </View>

        {renderBarChart()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 24,
  },
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
  periodContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    padding: 4,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: '#2196F3',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
  },
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