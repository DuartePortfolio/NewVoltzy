import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Svg, Path, Circle } from 'react-native-svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styles from '../styles/signinStyles';

type RootStackParamList = {
  Login: undefined;
  SignIn: undefined;
  Dashboard: undefined;
  Welcome: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const SignInScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    console.log('Sign In attempted with:', { name, username, email, password });
    navigation.replace('Dashboard');
  };

  return (
    <View style={styles.container}>
      {/* Background organic blobs */}
      <Svg height="100%" width="100%" style={styles.backgroundSvg}>
        {/* Top left blob */}
        <Path
          d="M-100 100 Q 50 0, 200 50 Q 250 150, 200 250 Q 100 300, 0 250 Q -100 200, -100 100 Z"
          fill="rgba(100, 165, 115, 0.4)"
        />
        
        {/* Top right blob - large */}
        <Path
          d="M400 -100 Q 550 -50, 700 50 Q 800 200, 750 350 Q 650 450, 500 400 Q 400 300, 400 -100 Z"
          fill="rgba(70, 145, 95, 0.5)"
        />
        
        {/* Bottom left blob */}
        <Path
          d="M-50 1200 Q 100 1150, 250 1250 Q 300 1350, 200 1450 Q 50 1500, -100 1400 Q -150 1300, -50 1200 Z"
          fill="rgba(85, 155, 100, 0.45)"
        />
        
        {/* Bottom right blob */}
        <Path
          d="M500 1100 Q 650 1050, 750 1150 Q 800 1250, 700 1350 Q 600 1400, 500 1300 Q 450 1200, 500 1100 Z"
          fill="rgba(95, 160, 110, 0.4)"
        />
      </Svg>

      {/* Content */}
      <View style={styles.content}>
        {/* Avatar placeholder with edit button */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarBlob}>
            <Svg height="100%" width="100%" viewBox="0 0 220 220" style={styles.avatarBlobSvg}>
              <Path
                d="M30 60 Q 80 10, 140 20 Q 200 30, 210 90 Q 220 150, 180 190 Q 130 220, 70 210 Q 20 200, 10 140 Q 5 100, 30 60 Z"
                fill="rgba(171, 200, 171, 0.7)"
              />
            </Svg>
            
            {/* User icon */}
            <View style={styles.userIconContainer}>
              <Svg width="120" height="120" viewBox="0 0 24 24" fill="none">
                {/* Head */}
                <Circle cx="12" cy="8" r="3.5" stroke="#2D2D2D" strokeWidth="2" fill="none" />
                {/* Body */}
                <Path
                  d="M5 20 C5 16 8 14 12 14 C16 14 19 16 19 20"
                  stroke="#2D2D2D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
              </Svg>
            </View>
          </View>
          
          {/* Edit button */}
          <TouchableOpacity style={styles.editButton}>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path
                d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                stroke="#2D2D2D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z"
                stroke="#2D2D2D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={styles.title}>Sign In</Text>

        {/* Form Container with blob background */}
        <View style={styles.formContainer}>
          <View style={styles.formBlob}>
            <Svg height="100%" width="100%" viewBox="0 0 380 450" style={styles.blobSvg}>
              <Path
                d="M30 80 Q 100 20, 200 30 Q 320 40, 350 120 Q 370 220, 350 320 Q 320 400, 220 430 Q 100 440, 40 360 Q 10 260, 30 80 Z"
                fill="rgba(171, 200, 171, 0.5)"
              />
            </Svg>
          </View>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="name"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
            <TextInput
              style={styles.input}
              placeholder="username"
              placeholderTextColor="#999"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
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

            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Login link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Login in <Text style={styles.linkUnderline}>here</Text></Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignInScreen;