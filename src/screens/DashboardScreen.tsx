import React, { useState } from 'react';
import { View, Text, Switch, ScrollView, TouchableOpacity } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import styles from '../styles/dashboardStyles';

const DashboardScreen: React.FC = () => {
  const [lights, setLights] = useState({
    kitchen: true,
    bedroom: true,
    bathroom: true,
    livingRoom: true,
  });

  const [activeRoutine, setActiveRoutine] = useState<string | null>(null);

  const toggleLight = (key: string) => {
    setLights(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#5fb36a' }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header Section with gradient background */}
        <View style={styles.topArea}>
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.homeIcon}>
              <Svg width={28} height={28} viewBox="0 0 24 24">
                <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#fff" strokeWidth={2} fill="none"/>
                <Path d="M9 22V12h6v10" stroke="#fff" strokeWidth={2} fill="none"/>
              </Svg>
            </TouchableOpacity>

            <View style={{ flex: 1, marginLeft: 16, alignItems: 'center' }}>
              <Text style={styles.header}>Hello, user</Text>
              <Text style={styles.houseText}>House 1</Text>
            </View>

            <TouchableOpacity>
              <View style={styles.avatar}>
                {/* Avatar placeholder - you can add image here */}
              </View>
            </TouchableOpacity>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Lights on</Text>
              <Text style={styles.statValue}>5</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Energy Used</Text>
              <Text style={styles.statValue}>32.4<Text style={styles.statUnit}>kW/h</Text></Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Energy Saved</Text>
              <Text style={styles.statValue}>14.8<Text style={styles.statUnit}>kWh</Text></Text>
            </View>
          </View>
        </View>

        {/* Consumption Chart */}
        <View style={styles.consumptionCard}>
          <Text style={styles.consumptionTitle}>Today's Consumption</Text>
          <View style={{ height: 120, marginTop: 12 }}>
            <Svg width="100%" height="100%" viewBox="0 0 350 120">
              <Defs>
                <LinearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor="#7ee08a" stopOpacity="0.4" />
                  <Stop offset="1" stopColor="#7ee08a" stopOpacity="0.02" />
                </LinearGradient>
              </Defs>
              <Path d={generateAreaPath([20, 35, 65, 45, 55, 30, 25], 350, 120)} fill="url(#chartGrad)" />
              <Path d={generateLinePath([20, 35, 65, 45, 55, 30, 25], 350, 120)} stroke="#5fb36a" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </View>
          <View style={styles.timeLabels}>
            <Text style={styles.timeLabel}>6:07</Text>
            <Text style={styles.timeLabel}>9:00</Text>
            <Text style={styles.timeLabel}>12:00</Text>
            <Text style={styles.timeLabel}>15:00</Text>
            <Text style={styles.timeLabel}>18:00</Text>
          </View>
        </View>

        {/* Lights Section */}
        <View style={styles.lightsCard}>
          <Text style={styles.sectionTitle}>Lights</Text>
          <View style={styles.lightsGrid}>
            <View style={styles.lightItem}>
              <View>
                <Text style={styles.lightName}>Kitchen</Text>
                <Text style={styles.lightSub}>8.2 kW/h</Text>
              </View>
              <Switch
                value={lights.kitchen}
                onValueChange={() => toggleLight('kitchen')}
                trackColor={{ false: '#e0e0e0', true: '#7ee08a' }}
                thumbColor="#fff"
              />
            </View>
            <View style={styles.lightItem}>
              <View>
                <Text style={styles.lightName}>Bedroom</Text>
                <Text style={styles.lightSub}>8.2 kW/h</Text>
              </View>
              <Switch
                value={lights.bedroom}
                onValueChange={() => toggleLight('bedroom')}
                trackColor={{ false: '#e0e0e0', true: '#7ee08a' }}
                thumbColor="#fff"
              />
            </View>
            <View style={styles.lightItem}>
              <View>
                <Text style={styles.lightName}>Bathroom</Text>
                <Text style={styles.lightSub}>8.2 kW/h</Text>
              </View>
              <Switch
                value={lights.bathroom}
                onValueChange={() => toggleLight('bathroom')}
                trackColor={{ false: '#e0e0e0', true: '#7ee08a' }}
                thumbColor="#fff"
              />
            </View>
            <View style={styles.lightItem}>
              <View>
                <Text style={styles.lightName}>Living Room</Text>
                <Text style={styles.lightSub}>8.2 kW/h</Text>
              </View>
              <Switch
                value={lights.livingRoom}
                onValueChange={() => toggleLight('livingRoom')}
                trackColor={{ false: '#e0e0e0', true: '#7ee08a' }}
                thumbColor="#fff"
              />
            </View>
          </View>
        </View>

        {/* Routines Section */}
        <View style={styles.routinesCard}>
          <Text style={styles.sectionTitle}>Routines</Text>
          <View style={styles.routineRow}>
            {['Night', 'Day', 'Eco', 'Comfort'].map(r => (
              <TouchableOpacity 
                key={r} 
                onPress={() => setActiveRoutine(prev => prev === r ? null : r)}
                style={[styles.routineButton, activeRoutine === r && styles.routineActive]}
              >
                <Text style={[styles.routineText, activeRoutine === r && styles.routineTextActive]}>{r}</Text>
              </TouchableOpacity>
            ))}
          </View>
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

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Svg width={28} height={28} viewBox="0 0 24 24">
            <Path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" stroke="#2ca24b" strokeWidth={2} fill="none"/>
          </Svg>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Svg width={28} height={28} viewBox="0 0 24 24">
            <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#2ca24b" strokeWidth={2} fill="none"/>
          </Svg>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemCenter}>
          <Svg width={32} height={32} viewBox="0 0 24 24">
            <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="#fff" stroke="#fff" strokeWidth={1.5}/>
            <Path d="M9 22V12h6v10" fill="#2ca24b" stroke="#2ca24b" strokeWidth={1.5}/>
          </Svg>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Svg width={28} height={28} viewBox="0 0 24 24">
            <Path d="M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" stroke="#2ca24b" strokeWidth={2} fill="none"/>
          </Svg>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Svg width={28} height={28} viewBox="0 0 24 24">
            <Path d="M3 3v18h18" stroke="#2ca24b" strokeWidth={2} fill="none"/>
            <Path d="M18 17l-5-5-5 3-5-3" stroke="#2ca24b" strokeWidth={2} fill="none"/>
          </Svg>
        </TouchableOpacity>
      </View>
    </View>
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