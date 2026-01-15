import React, { useState, useEffect } from 'react';
import { View, Text, Switch, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop, Circle } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { PROFILE_PLACEHOLDER } from '../data/mockData';
import styles from '../styles/dashboardStyles';
import { useApp } from '../contexts/AppContext';
import { energyService } from '../services/energyService';
import { lightsService } from '../services/lightsService';
import { routinesService } from '../services/routinesService';

const DashboardScreen: React.FC = () => {
  const { user, currentHouse } = useApp();
  
  const [lights, setLights] = useState<any[]>([]);
  const [routines, setRoutines] = useState<any[]>([]);
  const [energyStats, setEnergyStats] = useState<any>(null);
  const [hourlyData, setHourlyData] = useState<number[]>([6,12,30,20,40,28,22]);
  const [activeRoutine, setActiveRoutine] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Reload data when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadDashboardData();
    }, [currentHouse])
  );

  const loadDashboardData = async () => {
    if (!currentHouse) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const [statsData, hourlyDataResult, lightsData, routinesData] = await Promise.all([
        energyService.getCurrentStats(currentHouse.id),
        energyService.getHourlyConsumption(currentHouse.id),
        lightsService.getLightsByHouse(currentHouse.id),
        routinesService.getRoutinesByHouse(currentHouse.id),
      ]);
      setEnergyStats(statsData);
      setHourlyData(Array.isArray(hourlyDataResult) ? hourlyDataResult : [6,12,30,20,40,28,22]);
      setLights(Array.isArray(lightsData) ? lightsData : []);
      setRoutines(Array.isArray(routinesData) ? routinesData : []);
    } catch (error: any) {
      console.error('Failed to load dashboard data:', error);
      Alert.alert('Error', 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const toggleLight = async (lightId: number) => {
    try {
      const light = lights.find(l => l.id === lightId);
      if (!light) return;
      await lightsService.toggleLight(lightId, !light.is_on);
      setLights(lights.map(l => l.id === lightId ? { ...l, is_on: !l.is_on } : l));
      // Reload stats after toggling
      if (currentHouse) {
        const statsData = await energyService.getCurrentStats(currentHouse.id);
        setEnergyStats(statsData);
      }
    } catch (error: any) {
      console.error('Failed to toggle light:', error);
      Alert.alert('Error', 'Failed to toggle light');
    }
  };

  if (loading) {
    return (
      <LinearGradient colors={['#78B85E', '#1E7B45']} style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#78B85E', '#1E7B45']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.topArea}>
          <View style={styles.headerRow}>
            <TouchableOpacity>
              <View style={{ width: 32, height: 32, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white' }}>⌂</Text>
              </View>
            </TouchableOpacity>

            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.header}>Hello, {user?.name || 'user'}</Text>
              <Text style={styles.houseText}>{currentHouse?.name || 'House'}</Text>
            </View>

            <TouchableOpacity>
              <View style={styles.avatar} />
            </TouchableOpacity>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Lights on</Text>
              <Text style={styles.statValue}>{lights.filter(l => l.is_on).length}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Energy Used</Text>
              <Text style={styles.statValue}>{energyStats?.current_usage?.toFixed(1) || '0'} kWh</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Energy Saved</Text>
              <Text style={styles.statValue}>{energyStats?.savings?.toFixed(1) || '0'} kWh</Text>
            </View>
          </View>
        </View>

        <View style={styles.consumptionCard}>
          <Text style={styles.consumptionTitle}>Today's Consumption</Text>
          <View style={{ height: 100, marginTop: 8 }}>
            {/* Inline sparkline chart using react-native-svg */}
            <Svg width="100%" height="100%" viewBox="0 0 300 100">
              <Defs>
                <SvgLinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor="#9fe7a8" stopOpacity="0.6" />
                  <Stop offset="1" stopColor="#9fe7a8" stopOpacity="0.05" />
                </SvgLinearGradient>
              </Defs>
              <Path d={generateAreaPath(hourlyData, 300, 100)} fill="url(#grad)" />
              <Path d={generateLinePath(hourlyData, 300, 100)} stroke="#dfffdc" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Lights</Text>
        </View>
        <View style={styles.lightsCard}>
          {lights.length > 0 ? (
            lights.map((light) => (
              <View key={light.id} style={styles.lightRow}>
                <View>
                  <Text style={styles.lightName}>{light.name || light.room_name}</Text>
                  <Text style={styles.lightSub}>{light.power_watts ? `${light.power_watts}W` : '0W'}</Text>
                </View>
                <Switch
                  value={light.is_on}
                  onValueChange={() => toggleLight(light.id)}
                  trackColor={{ false: '#ccc', true: '#7ee08a' }}
                  thumbColor={light.is_on ? '#fff' : '#fff'}
                />
              </View>
            ))
          ) : (
            <Text style={styles.lightSub}>No lights available</Text>
          )}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Routines</Text>
        </View>
        <View style={styles.routinesCard}>
          <View style={styles.routineRow}>
            {['night','day','eco','comfort'].map(r => (
              <TouchableOpacity 
                key={r} 
                style={[styles.routineButton, activeRoutine===r && styles.routineActive]}
                onPress={() => setActiveRoutine(prev => prev===r ? null : r)}
              >
                <Text style={[styles.routineText, activeRoutine===r && styles.routineTextActive]}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

// helpers to generate SVG path strings from data
function generateLinePath(data: number[], width: number, height: number) {
  if (!data || !Array.isArray(data) || data.length === 0) return '';
  const step = width / (data.length - 1);
  const max = Math.max.apply(null, data);
  const min = Math.min.apply(null, data);
  const range = max - min || 1;
  return data.map((d, i) => {
    const x = i * step;
    const y = height - ((d - min) / range) * (height - 10) - 5; // padding
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(' ');
}

function generateAreaPath(data: number[], width: number, height: number) {
  if (!data || !Array.isArray(data) || data.length === 0) return '';
  const line = generateLinePath(data, width, height);
  if (!line) return '';
  // close the path to bottom
  const lastX = width;
  return `${line} L ${width} ${height} L 0 ${height} Z`;
}

// styles imported from ../styles/dashboardStyles

export default DashboardScreen;
