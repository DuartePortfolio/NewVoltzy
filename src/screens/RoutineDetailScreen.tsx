import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { PROFILE_PLACEHOLDER } from '../data/mockData';
import { routinesService, Routine } from '../services/routinesService';

export default function RoutineDetailScreen({ route, navigation }: any) {
  const { routineId } = route.params;
  const [routine, setRoutine] = useState<Routine | null>(null);
  const [loading, setLoading] = useState(true);

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    loadRoutine();
  }, [routineId]);

  const loadRoutine = async () => {
    try {
      setLoading(true);
      const data = await routinesService.getRoutine(routineId);
      setRoutine(data);
      setIsActive(data.active);
    } catch (error: any) {
      console.error('Failed to load routine:', error);
      Alert.alert('Error', 'Failed to load routine details');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async () => {
    try {
      await routinesService.toggleRoutine(routineId);
      setIsActive(!isActive);
    } catch (error: any) {
      console.error('Failed to toggle routine:', error);
      Alert.alert('Error', 'Failed to toggle routine');
    }
  };

  if (loading || !routine) {
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
        {/* Decorative Blobs */}
        <View style={styles.blobContainer}>
          <View style={[styles.blob, { top: -30, left: -50 }]} />
          <View style={[styles.blob, { top: 250, right: -60 }]} />
          <View style={[styles.blob, { bottom: 100, left: 20 }]} />
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

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <Path
              d="M11 6.6L6.6 11M6.6 11L11 15.4M6.6 11H15.4M22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11Z"
              stroke="#F5F5F5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
          <Text style={styles.backText}>Choose a Routine</Text>
        </TouchableOpacity>

        {/* Routine Name */}
        <Text style={styles.routineName}>{routine.name}</Text>
        {routine.description && (
          <Text style={{ color: '#FFFFFF', textAlign: 'center', marginTop: 8, fontSize: 14 }}>
            {routine.description}
          </Text>
        )}

        {/* State Toggle */}
        <View style={styles.controlCard}>
          <Text style={styles.controlLabel}>State</Text>
          <TouchableOpacity
            style={[styles.toggle, isActive && styles.toggleOn]}
            onPress={handleToggleActive}
          >
            <View style={[styles.toggleKnob, isActive && styles.toggleKnobOn]} />
          </TouchableOpacity>
        </View>

        {/* Time Display */}
        <View style={styles.controlCard}>
          <View style={styles.timeRow}>
            <View style={styles.timeSection}>
              <Text style={styles.timeLabel}>Start Time</Text>
              <Text style={styles.timeButtonText}>{routine.start_time}</Text>
            </View>

            <View style={styles.timeSection}>
              <Text style={[styles.timeLabel, styles.timeLabelRight]}>End Time</Text>
              <Text style={styles.timeButtonText}>{routine.end_time}</Text>
            </View>
          </View>
        </View>

        {/* Color Display (if available) */}
        {routine.color && (
          <View style={styles.controlCard}>
            <Text style={styles.controlLabel}>Color</Text>
            <View style={{ height: 40, backgroundColor: routine.color, borderRadius: 12, marginTop: 8 }} />
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
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginLeft: 16,
    gap: 10,
  },
  backText: {
    fontFamily: 'Comfortaa',
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  routineName: {
    fontFamily: 'Comfortaa',
    fontSize: 20,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 16,
  },
  controlCard: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    backgroundColor: 'rgba(171, 200, 171, 0.5)',
    borderRadius: 15,
  },
  controlLabel: {
    fontFamily: 'Comfortaa',
    fontSize: 16,
    fontWeight: '700',
    color: '#2E2E2E',
    marginBottom: 12,
  },
  toggle: {
    width: 64,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    paddingHorizontal: 2,
  },
  toggleOn: {
    backgroundColor: '#34C759',
  },
  toggleKnob: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
  },
  toggleKnobOn: {
    alignSelf: 'flex-end',
  },
  stateButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  stateButton: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: '#D9D9D9',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  stateButtonActive: {
    backgroundColor: '#A8C9A8',
  },
  stateButtonText: {
    fontFamily: 'Comfortaa',
    fontSize: 12,
    fontWeight: '400',
    color: '#000000',
  },
  colorGradient: {
    height: 40,
    borderRadius: 12,
    marginTop: 8,
  },
  timeRow: {
    flexDirection: 'row',
    gap: 16,
  },
  timeSection: {
    flex: 1,
  },
  timeLabel: {
    fontFamily: 'Comfortaa',
    fontSize: 16,
    fontWeight: '700',
    color: '#2E2E2E',
    marginBottom: 8,
  },
  timeLabelRight: {
    textAlign: 'right',
  },
  timeButtons: {
    flexDirection: 'row',
    gap: 6,
  },
  timeButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#D9D9D9',
    borderRadius: 12,
    alignItems: 'center',
  },
  timeButtonText: {
    fontFamily: 'SF Pro',
    fontSize: 17,
    fontWeight: '400',
    color: '#000000',
  },
});
