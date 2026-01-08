import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styles from '../styles/loginStyles';
import { signIn } from '../backend/auth';

type RootStackParamList = {
  Login: undefined;
  SignIn: undefined;
  Dashboard: undefined;
  Welcome: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await signIn(email, password);
      console.log('Login response', res);
      navigation.replace('Dashboard');
    } catch (err: any) {
      console.error('Login error', err);
      Alert.alert('Login failed', err.message || 'Please check your credentials and try again');
    }
  };

  return (
    <View style={styles.container}>
      {/* Background organic blobs */}
      <Svg height="100%" width="100%" style={styles.backgroundSvg}>
        {/* Top left blob */}
        <Path
          d="M-50 -50 Q 100 50, 200 150 Q 150 250, 50 300 Q -50 250, -100 150 Q -80 50, -50 -50 Z"
          fill="rgba(60, 140, 90, 0.5)"
        />
        
        {/* Top right blob */}
        <Path
          d="M450 -50 Q 550 0, 650 100 Q 700 200, 650 300 Q 550 350, 450 300 Q 400 200, 450 -50 Z"
          fill="rgba(80, 160, 100, 0.4)"
        />
        
        {/* Bottom left blob */}
        <Path
          d="M-100 1200 Q 50 1100, 200 1200 Q 250 1350, 150 1450 Q 0 1500, -100 1400 Q -150 1300, -100 1200 Z"
          fill="rgba(90, 150, 105, 0.45)"
        />
        
        {/* Bottom right blob - larger */}
        <Path
          d="M400 1100 Q 550 1050, 700 1150 Q 800 1250, 750 1400 Q 650 1550, 500 1500 Q 350 1450, 400 1100 Z"
          fill="rgba(100, 165, 115, 0.4)"
        />
      </Svg>

      {/* Content */}
      <View style={styles.content}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' }}
            style={styles.avatar}
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>Log In</Text>

        {/* Form Container with blob background */}
        <View style={styles.formContainer}>
          <View style={styles.formBlob}>
            <Svg height="100%" width="100%" viewBox="0 0 380 380" style={styles.blobSvg}>
              <Path
                d="M30 80 Q 100 20, 200 30 Q 320 40, 350 120 Q 370 200, 340 280 Q 300 360, 200 370 Q 80 370, 30 280 Q 10 180, 30 80 Z"
                fill="rgba(171, 200, 171, 0.5)"
              />
            </Svg>
          </View>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="password"
              placeholderTextColor="#999"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign up link */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.link}>Sign in <Text style={styles.linkUnderline}>here</Text></Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;