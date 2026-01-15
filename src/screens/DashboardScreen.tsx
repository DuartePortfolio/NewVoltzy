import React, { useState, useEffect } from 'react';
import { View, Text, Switch, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { PROFILE_PLACEHOLDER } from '../data/mockData';
import styles from '../styles/dashboardStyles';

const DashboardScreen: React.FC = () => {
  const [lights, setLights] = useState({
    kitchen: true,
    bedroom: true,
    bathroom: true,
    livingRoom: true,
  });

  const [activeRoutine, setActiveRoutine] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Reload data when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadDashboardData();
    }, [currentHouse])
  );

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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topArea}>
        <View style={styles.headerRow}>
          <TouchableOpacity>
            <View style={{ width: 32, height: 32, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'white' }}>⌂</Text>
            </View>
          </TouchableOpacity>

          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.header}>Hello, user</Text>
            <Text style={styles.houseText}>House 1</Text>
          </View>

          <TouchableOpacity>
            <View style={styles.avatar} />
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}><Text style={styles.statLabel}>Lights on</Text><Text style={styles.statValue}>5</Text></View>
          <View style={styles.statCard}><Text style={styles.statLabel}>Energy Used</Text><Text style={styles.statValue}>32.4 kW/h</Text></View>
          <View style={styles.statCard}><Text style={styles.statLabel}>Energy Saved</Text><Text style={styles.statValue}>14.8 kWh</Text></View>
        </View>
      </View>

      <View style={styles.consumptionCard}>
        <Text style={{ color: '#fff', fontWeight: '700', marginBottom: 8 }}>Today's Consumption</Text>
        <View style={{ height: 100 }}>
          {/* Inline sparkline chart using react-native-svg */}
          <Svg width="100%" height="100%" viewBox="0 0 300 100">
            <Defs>
              <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor="#9fe7a8" stopOpacity="0.6" />
                <Stop offset="1" stopColor="#9fe7a8" stopOpacity="0.05" />
              </LinearGradient>
            </Defs>
            <Path d={generateAreaPath([6,12,30,20,40,28,22], 300, 100)} fill="url(#grad)" />
            <Path d={generateLinePath([6,12,30,20,40,28,22], 300, 100)} stroke="#dfffdc" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Lights</Text>
      <View style={styles.lightsCard}>
        {Object.keys(lights).map((k) => (
          <View key={k} style={styles.lightRow}>
            <View>
                <Text style={styles.lightName}>{k.charAt(0).toUpperCase() + k.slice(1)}</Text>
                <Text style={styles.lightSub}>8.2 kWh</Text>
              </View>
            <Switch
              value={lights[k as keyof typeof lights]}
              onValueChange={() => toggleLight(k)}
              trackColor={{ false: '#ccc', true: '#7ee08a' }}
              thumbColor={lights[k as keyof typeof lights] ? '#fff' : '#fff'}
            />
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Routines</Text>
      <View style={styles.routineRow}>
        {['night','day','eco','comfort'].map(r => (
          <TouchableOpacity key={r} onPress={() => setActiveRoutine(prev => prev===r ? null : r)}>
            <Text style={[styles.routine, activeRoutine===r && styles.routineActive]}>{r.charAt(0).toUpperCase() + r.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ height: 12 }} />
      <View style={styles.bottomNav}>
        <View style={{ flexDirection: 'row', width: '80%', justifyContent: 'space-between' }}>
          <Svg width={28} height={28} viewBox="0 0 24 24"><Path d="M3 12h18" stroke="#2ca24b" strokeWidth={2} strokeLinecap="round"/></Svg>
          <Svg width={28} height={28} viewBox="0 0 24 24"><Circle cx={12} cy={12} r={10} fill="#2ca24b"/></Svg>
          <Svg width={28} height={28} viewBox="0 0 24 24"><Path d="M12 3v18" stroke="#2ca24b" strokeWidth={2} strokeLinecap="round"/></Svg>
        </View>
      </View>
    </ScrollView>
  );
};

// helpers to generate SVG path strings from data
function generateLinePath(data: number[], width: number, height: number) {
  if (!data || data.length === 0) return '';
  const step = width / (data.length - 1);
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  return data.map((d, i) => {
    const x = i * step;
    const y = height - ((d - min) / range) * (height - 10) - 5; // padding
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(' ');
}

function generateAreaPath(data: number[], width: number, height: number) {
  const line = generateLinePath(data, width, height);
  if (!line) return '';
  // close the path to bottom
  const lastX = width;
  return `${line} L ${width} ${height} L 0 ${height} Z`;
}

// styles imported from ../styles/dashboardStyles

export default DashboardScreen;
