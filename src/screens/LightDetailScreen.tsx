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
import Slider from '@react-native-community/slider';
import { PROFILE_PLACEHOLDER } from '../data/mockData';
import { lightsService } from '../services/lightsService';
import { useApp } from '../contexts/AppContext';

const { width } = Dimensions.get('window');

interface Light {
  id: number;
  name: string;
  room_name: string;
  is_on: boolean;
  brightness: number;
  color: string;
}

export default function LightDetailScreen({ route, navigation }: any) {
  const { lightId } = route.params;
  const { currentHouse } = useApp();
  const [light, setLight] = useState<Light | null>(null);
  const [loading, setLoading] = useState(true);

  const [isOn, setIsOn] = useState(false);
  const [brightness, setBrightness] = useState(0);
  const [selectedColor, setSelectedColor] = useState('#FFFFFF');

  useEffect(() => {
    loadLight();
  }, [lightId]);

  const loadLight = async () => {
    try {
      setLoading(true);
      const data = await lightsService.getLight(lightId);
      setLight(data);
      setIsOn(data.is_on);
      setBrightness(data.brightness);
      setSelectedColor(data.color);
    } catch (error: any) {
      console.error('Failed to load light:', error);
      Alert.alert('Error', 'Failed to load light details');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    try {
      await lightsService.updateLight(lightId, {
        is_on: isOn,
        brightness: brightness,
        color: selectedColor,
      });
      Alert.alert('Success', 'Light updated successfully');
      navigation.goBack();
    } catch (error: any) {
      console.error('Failed to update light:', error);
      Alert.alert('Error', 'Failed to update light');
    }
  };

  if (loading || !light) {
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
          <View style={[styles.blob, { top: -50, right: -40 }]} />
          <View style={[styles.blob, { top: 200, left: -60 }]} />
          <View style={[styles.blob, { bottom: 150, right: -30 }]} />
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
              <Text style={styles.title}>Lighting Control</Text>
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
          <Text style={styles.backText}>Choose a Light</Text>
        </TouchableOpacity>

        {/* Light Info */}
        <Text style={styles.roomName}>{light.room_name}</Text>
        <Text style={styles.lightName}>{light.name}</Text>

        {/* Power Control */}
        <View style={styles.controlCard}>
          <Text style={styles.controlLabel}>Power</Text>
          <TouchableOpacity
            style={[styles.toggle, isOn && styles.toggleOn]}
            onPress={() => setIsOn(!isOn)}
          >
            <View style={[styles.toggleKnob, isOn && styles.toggleKnobOn]} />
          </TouchableOpacity>
        </View>

        {/* Brightness Control */}
        <View style={styles.controlCard}>
          <Text style={styles.controlLabel}>Brightness</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            value={brightness}
            onValueChange={setBrightness}
            minimumTrackTintColor="#34C759"
            maximumTrackTintColor="#2E2E2E"
            thumbTintColor="#FFFFFF"
          />
        </View>

        {/* Color Control */}
        <View style={styles.controlCard}>
          <Text style={styles.controlLabel}>Color</Text>
          <LinearGradient
            colors={[
              '#E8403B',
              '#EB753C',
              '#E9AB3E',
              '#E7E040',
              '#89E743',
              '#3CCAE7',
              '#694AE8',
              '#B33ED5',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.colorGradient}
          />
        </View>

        {/* Edit Light Button */}
        <TouchableOpacity style={styles.editButton} onPress={handleSaveChanges}>
          <Text style={styles.editButtonText}>Save Changes</Text>
        </TouchableOpacity>
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
    width: 240,
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
  roomName: {
    fontFamily: 'Comfortaa',
    fontSize: 20,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 16,
  },
  lightName: {
    fontFamily: 'Comfortaa',
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 8,
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
  slider: {
    width: '100%',
    height: 40,
  },
  colorGradient: {
    height: 40,
    borderRadius: 12,
    marginTop: 8,
  },
  editButton: {
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#D9D9D9',
    borderRadius: 12,
    marginTop: 32,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  editButtonText: {
    fontFamily: 'Comfortaa',
    fontSize: 12,
    fontWeight: '400',
    color: '#000000',
  },
});
