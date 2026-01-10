import React, { useState, useEffect } from 'react';
import { View, Text, Switch, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { PROFILE_PLACEHOLDER } from '../data/mockData';
import styles from '../styles/dashboardStyles';
import { energyService, CurrentEnergyStats, HourlyConsumption } from '../services/energyService';
import { lightsService } from '../services/lightsService';
import { routinesService } from '../services/routinesService';
import { useApp } from '../contexts/AppContext';

interface Light {
  id: number;
  name: string;
  room_name: string;
  is_on: boolean;
  power_consumption_watts: number;
}

const DashboardScreen: React.FC = () => {
  const { currentHouse } = useApp();
  const [lights, setLights] = useState<Light[]>([]);
  const [energyStats, setEnergyStats] = useState<CurrentEnergyStats | null>(null);
  const [hourlyData, setHourlyData] = useState<HourlyConsumption | null>(null);
  const [routines, setRoutines] = useState<any[]>([]);
  const [activeRoutine, setActiveRoutine] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [currentHouse]);

  const loadDashboardData = async () => {
    if (!currentHouse) return;
    try {
      setLoading(true);
      const [statsData, hourlyDataResult, lightsData, routinesData] = await Promise.all([
        energyService.getCurrentStats(currentHouse.id),
        energyService.getHourlyConsumption(currentHouse.id),
        lightsService.getLightsByHouse(currentHouse.id),
        routinesService.getRoutinesByHouse(currentHouse.id),
      ]);
      setEnergyStats(statsData);
      setHourlyData(hourlyDataResult);
      setLights(lightsData);
      setRoutines(routinesData);
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
      await lightsService.toggleLight(lightId, light.is_on);
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
        {/* Decorative Blobs - Simplified */}
        <View style={styles.blobContainer}>
          <View style={[styles.blob, { top: 100, left: -50 }]} />
          <View style={[styles.blob, { top: 300, right: -30 }]} />
          <View style={[styles.blob, { bottom: 100, left: 20 }]} />
        </View>
        {/* Glassmorphism Header */}
        <View style={styles.glassHeader}>
          <View style={styles.headerContent}>
            {/* Home Icon */}
            <Svg width={47} height={47} viewBox="0 0 47 47" fill="none">
              <Path
                d="M17.625 43.0832V23.4998H29.375V43.0832M5.875 17.6248L23.5 3.9165L41.125 17.6248V39.1665C41.125 40.2053 40.7124 41.2015 39.9778 41.936C39.2433 42.6705 38.2471 43.0832 37.2083 43.0832H9.79167C8.7529 43.0832 7.75668 42.6705 7.02216 41.936C6.28765 41.2015 5.875 40.2053 5.875 39.1665V17.6248Z"
                stroke="#F3F3F3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>

            {/* Title Section */}
            <View style={styles.titleContainer}>
              <Text style={styles.headerTitle}>Dashboard</Text>
              <View style={styles.divider} />
            </View>

            {/* Profile Picture */}
            <View style={styles.profilePicture}>
              <Image
                source={{ uri: PROFILE_PLACEHOLDER }}
                style={styles.profileImage}
              />
            </View>
          </View>

          {/* House ID */}
          <Text style={styles.houseId}>House 1</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Lights on</Text>
            <Text style={styles.statValue}>{energyStats?.lights_on_count || 0}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Energy Used</Text>
            <Text style={styles.statValue}>{Number(energyStats?.today_consumption_kwh || 0).toFixed(1)}<Text style={styles.statUnit}>kWh</Text></Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Energy Saved</Text>
            <Text style={styles.statValue}>{Number(energyStats?.today_saved_kwh || 0).toFixed(1)}<Text style={styles.statUnit}>kWh</Text></Text>
          </View>
        </View>

        {/* Consumption Chart */}
        <View style={styles.consumptionCard}>
          <Text style={styles.consumptionTitle}>Today's Consumption</Text>
          <View style={{ height: 120, marginTop: 12 }}>
            <Svg width="100%" height="100%" viewBox="0 0 350 120">
              <Defs>
                <SvgLinearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.4" />
                  <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0.02" />
                </SvgLinearGradient>
              </Defs>
              <Path d={generateAreaPath(hourlyData?.hourly_data.map(h => h.consumption_kwh) || [], 350, 120)} fill="url(#chartGrad)" />
              <Path d={generateLinePath(hourlyData?.hourly_data.map(h => h.consumption_kwh) || [], 350, 120)} stroke="#FFFFFF" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </View>
          <View style={styles.timeLabels}>
            {(hourlyData?.hourly_data || []).filter((_, i) => i % 4 === 0).slice(0, 6).map(h => (
              <Text key={h.hour} style={styles.timeLabel}>{h.hour}:00</Text>
            ))}
          </View>
        </View>

        {/* Lights Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Lights</Text>
        </View>
        <View style={styles.lightsCard}>
          {lights.length === 0 ? (
            <Text style={{ color: '#666', textAlign: 'center', padding: 20 }}>No lights found</Text>
          ) : (
            <View style={styles.lightsGrid}>
              {lights.slice(0, 4).map((light) => (
                <View key={light.id} style={styles.lightItem}>
                  <View>
                    <Text style={styles.lightName}>{light.name}</Text>
                    <Text style={styles.lightSub}>{(light.power_consumption_watts / 1000).toFixed(1)} kW/h</Text>
                  </View>
                  <Switch
                    value={light.is_on}
                    onValueChange={() => toggleLight(light.id)}
                    trackColor={{ false: '#e0e0e0', true: '#FFFFFF' }}
                    thumbColor="#78B85E"
                  />
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Routines Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Routines</Text>
        </View>
        <View style={styles.routinesCard}>
          {routines.length === 0 ? (
            <Text style={{ color: '#666', textAlign: 'center', padding: 20 }}>No routines found</Text>
          ) : (
            <View style={styles.routineRow}>
              {routines.slice(0, 4).map(r => (
                <TouchableOpacity 
                  key={r.id} 
                  onPress={() => setActiveRoutine(prev => prev === r.name ? null : r.name)}
                  style={[styles.routineButton, (activeRoutine === r.name || r.active) && styles.routineActive]}
                >
                  <Text style={[styles.routineText, (activeRoutine === r.name || r.active) && styles.routineTextActive]}>{r.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* House Action Buttons */}
        <View style={styles.houseButtons}>
          <TouchableOpacity style={styles.houseButton}>
            <Text style={styles.houseButtonText}>+ Add House</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.houseButton}>
            <Text style={styles.houseButtonText}>Edit House</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

// Helper functions for chart
function generateLinePath(data: number[], width: number, height: number) {
  if (!data || data.length === 0) return '';
  const step = width / (data.length - 1);
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  return data.map((d, i) => {
    const x = i * step;
    const y = height - ((d - min) / range) * (height - 20) - 10;
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(' ');
}

function generateAreaPath(data: number[], width: number, height: number) {
  const line = generateLinePath(data, width, height);
  if (!line) return '';
  return `${line} L ${width} ${height} L 0 ${height} Z`;
}

export default DashboardScreen;