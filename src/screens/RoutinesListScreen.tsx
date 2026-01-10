import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { PROFILE_PLACEHOLDER } from '../data/mockData';
import { routinesService } from '../services/routinesService';
import { useApp } from '../contexts/AppContext';

const { width } = Dimensions.get('window');

interface Routine {
  id: number;
  name: string;
  active: boolean;
}

export default function RoutinesListScreen({ navigation }: any) {
  const { currentHouse } = useApp();
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRoutines();
  }, [currentHouse]);

  const loadRoutines = async () => {
    if (!currentHouse) return;
    try {
      setLoading(true);
      const data = await routinesService.getRoutinesByHouse(currentHouse.id);
      setRoutines(data);
    } catch (error: any) {
      console.error('Failed to load routines:', error);
      Alert.alert('Error', 'Failed to load routines');
    } finally {
      setLoading(false);
    }
  };

  const handleRoutinePress = (routineId: number) => {
    navigation.navigate('RoutineDetail', { routineId });
  };

  return (
    <LinearGradient colors={['#78B85E', '#1E7B45']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Decorative Blobs */}
        <View style={styles.blobContainer}>
          <View style={[styles.blob, { top: 120, left: -40 }]} />
          <View style={[styles.blob, { top: 350, right: -50 }]} />
          <View style={[styles.blob, { bottom: 200, left: 30 }]} />
        </View>

        {/* Header with Glass Effect */}
        <View style={styles.glassHeader}>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Svg width="47" height="47" viewBox="0 0 47 47" fill="none">
                <Path
                  d="M17.625 43.0832V23.4998H29.375V43.0832M5.875 17.6248L23.5 3.9165L41.125 17.6248V39.1665C41.125 40.2053 40.7124 41.2015 39.9778 41.936C39.2433 42.6705 38.2471 43.0832 37.2083 43.0832H9.79167C8.7529 43.0832 7.75668 42.6705 7.02216 41.936C6.28765 41.2015 5.875 40.2053 5.875 39.1665V17.6248Z"
                  stroke="#F3F3F3"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>

            <View style={styles.titleContainer}>
              <Text style={styles.title}>Routines</Text>
              <View style={styles.divider} />
            </View>

            <Image source={{ uri: PROFILE_PLACEHOLDER }} style={styles.profilePic} />
          </View>

          <Text style={styles.houseId}>House 1</Text>
        </View>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Choose a Routine</Text>
          <TouchableOpacity style={styles.addButton}>
            <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <Path
                d="M7.99992 3.3335V12.6668M3.33325 8.00016H12.6666"
                stroke="#1E1E1E"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text style={styles.addButtonText}>Add Routine</Text>
          </TouchableOpacity>
        </View>

        {/* Routine Cards Grid */}
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        ) : routines.length === 0 ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
            <Text style={{ color: '#FFFFFF', fontSize: 16 }}>No routines yet</Text>
          </View>
        ) : (
          <View style={styles.routinesGrid}>
            {routines.map((routine) => (
              <TouchableOpacity
                key={routine.id}
                style={styles.routineCard}
                onPress={() => handleRoutinePress(routine.id)}
              >
                <Text style={styles.routineName}>{routine.name}</Text>
                <Text style={{ fontSize: 12, color: routine.active ? '#34C759' : '#999', marginTop: 4 }}>
                  {routine.active ? 'Active' : 'Inactive'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  blobContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  blob: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(30, 123, 69, 0.3)',
  },
  glassHeader: {
    marginTop: 40,
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.26)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  titleContainer: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 12,
  },
  title: {
    fontFamily: 'Comfortaa',
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  divider: {
    width: 128,
    height: 2,
    backgroundColor: '#FFFFFF',
    marginTop: 4,
  },
  profilePic: {
    width: 49,
    height: 49,
    borderRadius: 25,
  },
  houseId: {
    fontFamily: 'Comfortaa',
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: 'Comfortaa',
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  addButtonText: {
    fontFamily: 'Comfortaa',
    fontSize: 12,
    fontWeight: '500',
    color: '#000000',
  },
  routinesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 24,
    marginHorizontal: 16,
    gap: 16,
  },
  routineCard: {
    width: (width - 48) / 2,
    height: 112,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  routineName: {
    fontFamily: 'Comfortaa',
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
});
