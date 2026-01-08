import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Svg, Path, Circle, Rect } from 'react-native-svg';
import styles from '../styles/welcomeStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  SignIn: undefined;
  Dashboard: undefined;
  Welcome: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Progress bar at top */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar} />
      </View>

      {/* Background organic blobs */}
      <Svg height="100%" width="100%" style={styles.backgroundSvg}>
        {/* Top left blob */}
        <Path
          d="M-50 200 Q 150 100, 250 250 Q 200 400, 0 450 Q -100 350, -50 200 Z"
          fill="rgba(45, 125, 75, 0.6)"
        />
        
        {/* Top right blob */}
        <Path
          d="M350 -50 Q 500 50, 550 200 Q 600 350, 500 450 Q 400 500, 350 400 Q 300 250, 350 -50 Z"
          fill="rgba(60, 140, 90, 0.5)"
        />
        
        {/* Bottom left blob - larger */}
        <Path
          d="M-100 600 Q 50 550, 200 650 Q 300 750, 200 900 Q 50 1000, -100 900 Q -150 750, -100 600 Z"
          fill="rgba(100, 160, 115, 0.4)"
        />
        
        {/* Bottom right blob */}
        <Path
          d="M400 700 Q 550 650, 650 750 Q 700 850, 600 950 Q 500 1000, 400 900 Q 350 800, 400 700 Z"
          fill="rgba(80, 145, 95, 0.45)"
        />
        
        {/* Center decorative blobs */}
        <Path
          d="M150 400 Q 250 350, 350 400 Q 400 500, 300 550 Q 200 500, 150 400 Z"
          fill="rgba(70, 150, 100, 0.3)"
        />
      </Svg>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.welcome}>Welcome to</Text>
        <Text style={styles.title}>Voltzy</Text>
        
        {/* Custom blob-shaped button */}
        <TouchableOpacity 
          style={styles.buttonWrapper} 
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.8}
        >
          <View style={styles.buttonBlob}>
            <Svg height="100%" width="100%" viewBox="0 0 280 180" style={styles.blobSvg}>
              <Path
                d="M50 20 Q 140 -10, 230 20 Q 280 50, 270 90 Q 260 140, 210 160 Q 140 180, 70 160 Q 10 140, 5 90 Q 0 50, 50 20 Z"
                fill="#B8E6A1"
              />
            </Svg>
            
            {/* Icon and text overlay */}
            <View style={styles.buttonContent}>
              {/* Rocket icon */}
              <Svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M12 2C12 2 7 4 7 12C7 12 7 14 9 16L8 22L12 19L16 22L15 16C17 14 17 12 17 12C17 4 12 2 12 2Z"
                  fill="#000"
                  stroke="#000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Circle cx="12" cy="11" r="1.5" fill="#FFF" />
                <Path
                  d="M9 16L5 20M15 16L19 20"
                  stroke="#000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </Svg>
              
              <Text style={styles.buttonText}>Get started</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;