import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Ellipse } from 'react-native-svg';
import { mockLights, PROFILE_PLACEHOLDER } from '../data/mockData';

const { width } = Dimensions.get('window');

export default function RoomLightsScreen({ navigation }: any) {
  const handleLightPress = (lightId: string) => {
    navigation.navigate('LightDetail', { lightId });
  };

  return (
    <LinearGradient colors={['#78B85E', '#1E7B45']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Decorative Blobs - Simplified */}
        <View style={styles.blobContainer}>
          <View style={[styles.blob, { top: 100, left: -50 }]} />
          <View style={[styles.blob, { top: 300, right: -30 }]} />
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
          <Text style={styles.backText}>Choose a Room</Text>
        </TouchableOpacity>

        {/* Room Name */}
        <Text style={styles.roomName}>Living Room</Text>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Choose a Light</Text>
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
            <Text style={styles.addButtonText}>Add Light</Text>
          </TouchableOpacity>
        </View>

        {/* Light Cards Grid */}
        <View style={styles.lightsGrid}>
          {mockLights.map((light) => (
            <TouchableOpacity
              key={light.id}
              style={styles.lightCard}
              onPress={() => handleLightPress(light.id)}
            >
              <Text style={styles.lightName}>{light.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Edit Room Button */}
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Room</Text>
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
    backgroundColor: '#D9D9D9',
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
    fontWeight: '400',
    color: '#000000',
  },
  lightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 24,
    marginHorizontal: 16,
    gap: 16,
  },
  lightCard: {
    width: (width - 48) / 2,
    height: 112,
    backgroundColor: '#D9D9D9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  lightName: {
    fontFamily: 'Comfortaa',
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
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
