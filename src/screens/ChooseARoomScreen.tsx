import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { Svg, Path, Ellipse, Defs, LinearGradient, Stop } from 'react-native-svg';
import styles from '../styles/lightingControlStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useApp } from '../contexts/AppContext';
import { housesService } from '../services/housesService';

type RootStackParamList = {
  Login: undefined;
  SignIn: undefined;
  Dashboard: undefined;
  Welcome: undefined;
  ChooseARoom: undefined;
  RoomLights: { roomName: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'ChooseARoom'>;

interface RoomCardProps {
  roomName: string;
  onPress: () => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ roomName, onPress }) => {
  return (
    <TouchableOpacity style={styles.roomCard} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.roomCardText}>{roomName}</Text>
    </TouchableOpacity>
  );
};

const ChooseARoomScreen: React.FC<Props> = ({ navigation }) => {
  const { currentHouse } = useApp();
  const [rooms, setRooms] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRooms();
  }, [currentHouse]);

  const loadRooms = async () => {
    if (!currentHouse) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      // Get unique room names from lights
      const roomNames = await housesService.getRoomNames(currentHouse.id);
      setRooms(roomNames.length > 0 ? roomNames : ['Living Room', 'Kitchen', 'Bedroom', 'Bathroom']);
    } catch (error) {
      console.error('Failed to load rooms:', error);
      // Fallback to default rooms
      setRooms(['Living Room', 'Kitchen', 'Bedroom', 'Bathroom']);
    } finally {
      setLoading(false);
    }
  };

  const handleRoomPress = (roomName: string) => {
    console.log(`Room selected: ${roomName}`);
    navigation.navigate('RoomLights', { roomName });
  };

  const handleAddRoom = () => {
    console.log('Add room pressed');
    // TODO: Implement add room modal/screen
  };

  return (
    <View style={styles.container}>
      {/* Background gradient and decorative blobs */}
      <Svg height="100%" width="100%" style={styles.backgroundSvg}>
        <Defs>
          <LinearGradient id="bgGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#78B85E" />
            <Stop offset="0.9087" stopColor="#1E7B45" />
          </LinearGradient>
          <LinearGradient id="blob1" x1="310.85" y1="757.555" x2="271.86" y2="685.231">
            <Stop offset="0" stopColor="#78B85E" />
            <Stop offset="0.9087" stopColor="#1E7B45" />
          </LinearGradient>
          <LinearGradient id="blob2" x1="249.075" y1="911.379" x2="152.443" y2="732.132">
            <Stop offset="0" stopColor="#78B85E" />
            <Stop offset="0.9087" stopColor="#1E7B45" />
          </LinearGradient>
          <LinearGradient id="blob3" x1="438.628" y1="699.862" x2="570.009" y2="771.318">
            <Stop offset="0" stopColor="#78B85E" />
            <Stop offset="0.9087" stopColor="#1E7B45" />
          </LinearGradient>
          <LinearGradient id="blob4" x1="248.738" y1="537.355" x2="147.209" y2="158.445">
            <Stop offset="0" stopColor="#78B85E" />
            <Stop offset="0.9087" stopColor="#1E7B45" />
          </LinearGradient>
          <LinearGradient id="blob5" x1="602.019" y1="276.862" x2="372.387" y2="79.6148">
            <Stop offset="0" stopColor="#78B85E" />
            <Stop offset="0.9087" stopColor="#1E7B45" />
          </LinearGradient>
          <LinearGradient id="blob6" x1="429.637" y1="415" x2="429.637" y2="671.273">
            <Stop offset="0.0913" stopColor="#1E7B45" />
            <Stop offset="1" stopColor="#78B85E" />
          </LinearGradient>
        </Defs>

        {/* Decorative blobs */}
        <Path
          d="M265.165 690.2C256.538 701.738 256 721.5 256.832 732.082C257.663 742.664 256.6 764.547 280.3 762.024C304 759.5 344.014 750.008 340 726.541C334.299 693.219 278.089 672.916 265.165 690.2Z"
          fill="url(#blob1)"
        />
        <Path
          d="M288.844 885.78C266.231 915.719 201.861 907.952 167.04 888.645C132.218 869.338 121.341 864.362 112.887 827.697C104.432 791.032 148.887 711.697 175.387 729.197C201.887 746.697 176.188 769.953 182.387 783.197C188.585 796.442 198.752 803.963 221.887 815.197C245.022 826.431 277.614 802.247 294.567 821.373C311.519 840.499 311.457 855.84 288.844 885.78Z"
          fill="url(#blob2)"
        />
        <Path
          d="M555.968 670.805C599.543 684.236 590.148 722.537 581.325 746.913C572.502 771.289 570.482 768.02 559.78 778.373L559.489 778.654C548.779 789.018 532.309 804.955 504.471 804.54C476.38 804.121 457.241 808.96 426.369 786.334C395.497 763.708 430.535 713.447 453.793 677.55C477.051 641.654 512.392 657.375 555.968 670.805Z"
          fill="url(#blob3)"
        />
        <Path
          d="M174.869 506.758C241.7 549.197 317.889 535.379 341.278 479.516C364.667 423.652 368.569 407.215 356.293 375.079C344.017 342.942 345.941 273.529 322.945 250.617C299.948 227.705 222.48 138.276 164.124 153.913C105.768 169.549 77.2827 208.21 56.7349 225.443C36.1871 242.676 18.0184 265.135 39.6404 345.829C61.2624 426.524 108.037 464.32 174.869 506.758Z"
          fill="url(#blob4)"
        />
        <Path
          d="M386.316 228.638C325.114 164.841 371.671 129.782 376.724 99.0217C381.777 68.2618 386.052 60.0061 398.036 52.8326C410.02 45.659 447.311 48.1304 476.395 75.7995C505.478 103.469 447.391 148.976 480.135 163.215C512.88 177.454 534.839 147.5 577.262 141.39C619.684 135.281 650.516 182.815 648.166 209.014C645.817 235.213 603.613 279.132 564.21 286.94C524.808 294.748 447.519 292.435 386.316 228.638Z"
          fill="url(#blob5)"
        />
        <Path
          d="M332.145 607.618C332.819 575.68 378.511 553.559 396.645 536.118C414.779 518.678 403.342 534.378 420.645 514.118C437.948 493.859 415.567 417.374 452.145 415.118C488.723 412.863 496.055 443.196 511.145 474.618C526.235 506.04 535.158 540.759 517.645 569.118C500.132 597.478 482.816 588.594 452.145 607.618C421.474 626.642 391.362 685.444 361.645 668.118C331.928 650.792 331.471 639.557 332.145 607.618Z"
          fill="url(#blob6)"
        />
      </Svg>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Glassmorphism Header */}
        <View style={styles.glassHeader}>
          <View style={styles.headerContent}>
            {/* Home Icon */}
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} activeOpacity={0.7}>
              <Svg width={47} height={47} viewBox="0 0 47 47" fill="none">
              <Path
                d="M17.625 43.0832V23.4998H29.375V43.0832M5.875 17.6248L23.5 3.9165L41.125 17.6248V39.1665C41.125 40.2053 40.7124 41.2015 39.9778 41.936C39.2433 42.6705 38.2471 43.0832 37.2083 43.0832H9.79167C8.7529 43.0832 7.75668 42.6705 7.02216 41.936C6.28765 41.2015 5.875 40.2053 5.875 39.1665V17.6248Z"
                stroke="#F3F3F3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            </TouchableOpacity>

            {/* Title Section */}
            <View style={styles.titleContainer}>
              <Text style={styles.headerTitle}>Lighting Control</Text>
              <View style={styles.divider} />
            </View>

            {/* Profile Picture */}
            <View style={styles.profilePicture}>
              <Image
                source={{ uri: 'https://api.builder.io/api/v1/image/assets/TEMP/b91e984747ee07f07988d3e3b25238dbe77ace1c?width=98' }}
                style={styles.profileImage}
              />
            </View>
          </View>

          {/* House ID */}
          <Text style={styles.houseId}>{currentHouse?.name || 'House 1'}</Text>
        </View>

        {/* Choose a Room Section */}
        <View style={styles.roomsSection}>
          <View style={styles.roomsHeader}>
            <Text style={styles.roomsTitle}>Choose a Room</Text>
            <TouchableOpacity style={styles.addButton} onPress={handleAddRoom} activeOpacity={0.7}>
              <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
                <Path
                  d="M7.99992 3.3335V12.6668M3.33325 8.00016H12.6666"
                  stroke="#1E1E1E"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
              <Text style={styles.addButtonText}>Add Room</Text>
            </TouchableOpacity>
          </View>

          {/* Room Cards Grid */}
          {loading ? (
            <ActivityIndicator size="large" color="#FFFFFF" style={{ marginTop: 40 }} />
          ) : (
            <View style={styles.roomsGrid}>
              {rooms.map((room, index) => (
                <RoomCard key={index} roomName={room} onPress={() => handleRoomPress(room)} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <View style={styles.navBackground} />
        
        {/* Active indicator circle */}
        <Svg height={77} width={80} style={styles.activeIndicator}>
          <Ellipse cx={40} cy={38.5} rx={40} ry={38.5} fill="#649064" />
        </Svg>

        {/* Navigation Icons */}
        <View style={styles.navIcons}>
          {/* Light Bulb Icon - Active */}
          <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
            <Svg width={40} height={40} viewBox="0 0 40 40" fill="none">
              <Path
                d="M25.0001 31.6667H15.0001C14.0001 31.6667 13.3334 31 13.3334 30V29.1667C13.3334 26.8333 12.3334 24.5 10.5001 22.6667C7.83342 20 6.50008 16.5 6.66675 12.8333C7.00008 5.83333 12.8334 0.166667 19.8334 0H20.0001C27.3334 0 33.3334 6 33.3334 13.3333C33.3334 16.8333 32.0001 20.3333 29.3334 22.8333C27.5001 24.5 26.6667 26.8333 26.6667 29.1667V30C26.6667 31 26.0001 31.6667 25.0001 31.6667ZM16.6667 28.3333H23.3334C23.5001 25.3333 24.8334 22.6667 27.0001 20.3333C29.0001 18.5 30.0001 16 30.0001 13.3333C30.0001 7.83333 25.5001 3.33333 20.0001 3.33333H19.8334C14.6667 3.5 10.1667 7.66667 10.0001 13C9.83342 15.6667 11.0001 18.3333 12.8334 20.3333C15.1667 22.6667 16.5001 25.5 16.6667 28.3333Z"
                fill="white"
              />
              <Path
                d="M20.0002 40.0002C16.3335 40.0002 13.3335 37.0002 13.3335 33.3335V30.0002C13.3335 29.0002 14.0002 28.3335 15.0002 28.3335H25.0002C26.0002 28.3335 26.6668 29.0002 26.6668 30.0002V33.3335C26.6668 37.0002 23.6668 40.0002 20.0002 40.0002ZM16.6668 31.6668V33.3335C16.6668 35.1668 18.1668 36.6668 20.0002 36.6668C21.8335 36.6668 23.3335 35.1668 23.3335 33.3335V31.6668H16.6668Z"
                fill="white"
              />
              <Path
                d="M15.0002 14.9998C14.0002 14.9998 13.3335 14.3332 13.3335 13.3332C13.3335 9.6665 16.3335 6.6665 20.0002 6.6665C21.0002 6.6665 21.6668 7.33317 21.6668 8.33317C21.6668 9.33317 21.0002 9.99984 20.0002 9.99984C18.1668 9.99984 16.6668 11.4998 16.6668 13.3332C16.6668 14.3332 16.0002 14.9998 15.0002 14.9998Z"
                fill="white"
              />
            </Svg>
          </TouchableOpacity>

          {/* Game Controller Icon */}
          <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
            <Svg width={39} height={40} viewBox="0 0 39 40" fill="none">
              <Path
                d="M35.6111 19.4399C34.2096 12.9415 32.1308 8.7962 28.7991 7.78604C28.1538 7.59298 27.4847 7.49667 26.8125 7.5001C24.7643 7.5001 23.1479 8.7501 19.5 8.7501C15.8522 8.7501 14.2327 7.5001 12.1875 7.5001C11.4873 7.49639 10.79 7.59262 10.1157 7.78604C6.77933 8.7962 4.71812 12.9454 3.30056 19.4399C1.85329 26.0735 2.11532 31.3149 4.94435 32.3212C6.92482 33.0243 8.69581 31.5704 10.3731 29.4306C12.2774 26.9931 14.6227 26.2431 19.5 26.2431C24.3773 26.2431 26.6312 26.9931 28.5386 29.4306C30.2144 31.572 32.0509 33.0079 33.9788 32.3337C37.1033 31.2392 37.0592 26.1517 35.6111 19.4399Z"
                stroke="#43734C"
                strokeWidth="3"
                strokeMiterlimit="10"
              />
              <Path
                d="M22.2422 19.0625C23.0836 19.0625 23.7656 18.3629 23.7656 17.5C23.7656 16.6371 23.0836 15.9375 22.2422 15.9375C21.4008 15.9375 20.7188 16.6371 20.7188 17.5C20.7188 18.3629 21.4008 19.0625 22.2422 19.0625Z"
                fill="#43734C"
              />
              <Path
                d="M12.1875 13.75V21.25M15.8438 17.5H8.53125"
                stroke="#43734C"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>

          {/* Home Icon */}
          <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
            <Svg width={40} height={40} viewBox="0 0 40 40" fill="none">
              <Path
                d="M15 36.6668V20.0002H25V36.6668M5 15.0002L20 3.3335L35 15.0002V33.3335C35 34.2176 34.6488 35.0654 34.0237 35.6905C33.3986 36.3156 32.5507 36.6668 31.6667 36.6668H8.33333C7.44928 36.6668 6.60143 36.3156 5.97631 35.6905C5.35119 35.0654 5 34.2176 5 33.3335V15.0002Z"
                stroke="#43734C"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>

          {/* Schedule Icon */}
          <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
            <Svg width={40} height={40} viewBox="0 0 40 40" fill="none">
              <Path
                d="M14.9999 33.3333H9.99992C6.31802 33.3333 3.33325 30.3485 3.33325 26.6667V11.6667C3.33325 7.98477 6.31802 5 9.99992 5H28.3333C32.0151 5 34.9999 7.98477 34.9999 11.6667V16.6667"
                stroke="#43734C"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path d="M13.3333 3.3335V6.66683M25 3.3335V6.66683M3.33325 13.3335H34.9999" stroke="#43734C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <Path
                d="M28.3333 36.6667C32.9357 36.6667 36.6667 32.9357 36.6667 28.3333C36.6667 23.731 32.9357 20 28.3333 20C23.731 20 20 23.731 20 28.3333C20 32.9357 23.731 36.6667 28.3333 36.6667Z"
                stroke="#43734C"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>

          {/* Graph Icon */}
          <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
            <Svg width={40} height={40} viewBox="0 0 40 40" fill="none">
              <Path
                d="M6.66675 8.3335V31.6668C6.66675 32.5873 7.41295 33.3335 8.33341 33.3335H31.6667"
                stroke="#43734C"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M30.0001 15L21.6667 23.3332L17.5001 19.1663L11.6667 24.9997"
                stroke="#43734C"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChooseARoomScreen;
