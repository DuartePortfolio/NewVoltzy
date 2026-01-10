import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Ellipse } from 'react-native-svg';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens
import RoomLightsScreen from '../screens/RoomLightsScreen';
import LightDetailScreen from '../screens/LightDetailScreen';
import RoutinesListScreen from '../screens/RoutinesListScreen';
import RoutineDetailScreen from '../screens/RoutineDetailScreen';
import ChooseARoomScreen from '../screens/ChooseARoomScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ConsumptionScreen from '../screens/ConsumptionScreen';

const Tab = createBottomTabNavigator();
const LightsStack = createNativeStackNavigator();
const RoutinesStack = createNativeStackNavigator();

// Stack navigator for Lights tab (ChooseARoom → RoomLights → LightDetail)
function LightsStackNavigator() {
  return (
    <LightsStack.Navigator screenOptions={{ headerShown: false }}>
      <LightsStack.Screen name="ChooseARoom" component={ChooseARoomScreen} />
      <LightsStack.Screen name="RoomLights" component={RoomLightsScreen} />
      <LightsStack.Screen name="LightDetail" component={LightDetailScreen} />
    </LightsStack.Navigator>
  );
}

// Stack navigator for Routines tab (Frame 3 → Frame 4)
function RoutinesStackNavigator() {
  return (
    <RoutinesStack.Navigator screenOptions={{ headerShown: false }}>
      <RoutinesStack.Screen name="RoutinesList" component={RoutinesListScreen} />
      <RoutinesStack.Screen name="RoutineDetail" component={RoutineDetailScreen} />
    </RoutinesStack.Navigator>
  );
}

// Placeholder screens for other tabs
function PlaceholderScreen() {
  return <View style={styles.placeholder} />;
}

// Custom Tab Bar Icons
function LightBulbIcon({ focused }: { focused: boolean }) {
  return (
    <View style={[styles.tabIconContainer, focused && styles.tabIconActive]}>
      <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <Path
          d="M25.0001 31.6667H15.0001C14.0001 31.6667 13.3334 31 13.3334 30V29.1667C13.3334 26.8333 12.3334 24.5 10.5001 22.6667C7.83342 20 6.50008 16.5 6.66675 12.8333C7.00008 5.83333 12.8334 0.166667 19.8334 0H20.0001C27.3334 0 33.3334 6 33.3334 13.3333C33.3334 16.8333 32.0001 20.3333 29.3334 22.8333C27.5001 24.5 26.6667 26.8333 26.6667 29.1667V30C26.6667 31 26.0001 31.6667 25.0001 31.6667ZM16.6667 28.3333H23.3334C23.5001 25.3333 24.8334 22.6667 27.0001 20.3333C29.0001 18.5 30.0001 16 30.0001 13.3333C30.0001 7.83333 25.5001 3.33333 20.0001 3.33333H19.8334C14.6667 3.5 10.1667 7.66667 10.0001 13C9.83342 15.6667 11.0001 18.3333 12.8334 20.3333C15.1667 22.6667 16.5001 25.5 16.6667 28.3333Z"
          fill={focused ? '#FFFFFF' : '#43734C'}
        />
        <Path
          d="M20.0002 40.0002C16.3335 40.0002 13.3335 37.0002 13.3335 33.3335V30.0002C13.3335 29.0002 14.0002 28.3335 15.0002 28.3335H25.0002C26.0002 28.3335 26.6668 29.0002 26.6668 30.0002V33.3335C26.6668 37.0002 23.6668 40.0002 20.0002 40.0002ZM16.6668 31.6668V33.3335C16.6668 35.1668 18.1668 36.6668 20.0002 36.6668C21.8335 36.6668 23.3335 35.1668 23.3335 33.3335V31.6668H16.6668Z"
          fill={focused ? '#FFFFFF' : '#43734C'}
        />
        <Path
          d="M15.0002 14.9998C14.0002 14.9998 13.3335 14.3332 13.3335 13.3332C13.3335 9.6665 16.3335 6.6665 20.0002 6.6665C21.0002 6.6665 21.6668 7.33317 21.6668 8.33317C21.6668 9.33317 21.0002 9.99984 20.0002 9.99984C18.1668 9.99984 16.6668 11.4998 16.6668 13.3332C16.6668 14.3332 16.0002 14.9998 15.0002 14.9998Z"
          fill={focused ? '#FFFFFF' : '#43734C'}
        />
      </Svg>
    </View>
  );
}

function GameControllerIcon({ focused }: { focused: boolean }) {
  return (
    <Svg width="39" height="40" viewBox="0 0 39 40" fill="none">
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
        d="M12.1875 13.75V21.25"
        stroke="#43734C"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.8438 17.5H8.53125"
        stroke="#43734C"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function HomeIcon({ focused }: { focused: boolean }) {
  return (
    <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <Path
        d="M15 36.6668V20.0002H25V36.6668M5 15.0002L20 3.3335L35 15.0002V33.3335C35 34.2176 34.6488 35.0654 34.0237 35.6905C33.3986 36.3156 32.5507 36.6668 31.6667 36.6668H8.33333C7.44928 36.6668 6.60143 36.3156 5.97631 35.6905C5.35119 35.0654 5 34.2176 5 33.3335V15.0002Z"
        stroke="#43734C"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function ScheduleIcon({ focused }: { focused: boolean }) {
  return (
    <View style={[styles.tabIconContainer, focused && styles.tabIconActive]}>
      <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <Path
          d="M14.9999 33.3333H9.99992C6.31802 33.3333 3.33325 30.3485 3.33325 26.6667V11.6667C3.33325 7.98477 6.31802 5 9.99992 5H28.3333C32.0151 5 34.9999 7.98477 34.9999 11.6667V16.6667"
          stroke={focused ? '#FFFFFF' : '#43734C'}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M13.3333 3.3335V6.66683"
          stroke={focused ? '#FFFFFF' : '#43734C'}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M25 3.3335V6.66683"
          stroke={focused ? '#FFFFFF' : '#43734C'}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M3.33325 13.3335H34.9999"
          stroke={focused ? '#FFFFFF' : '#43734C'}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M30.8333 26.0718L28.3333 28.5718"
          stroke={focused ? '#FFFFFF' : '#43734C'}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M28.3333 36.6667C32.9357 36.6667 36.6667 32.9357 36.6667 28.3333C36.6667 23.731 32.9357 20 28.3333 20C23.731 20 20 23.731 20 28.3333C20 32.9357 23.731 36.6667 28.3333 36.6667Z"
          stroke={focused ? '#FFFFFF' : '#43734C'}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

function GraphIcon({ focused }: { focused: boolean }) {
  return (
    <View style={[styles.tabIconContainer, focused && styles.tabIconActive]}>
      <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <Path
          d="M6.66675 8.3335V31.6668C6.66675 32.5873 7.41295 33.3335 8.33341 33.3335H31.6667"
          stroke={focused ? '#FFFFFF' : '#43734C'}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M30.0001 15L21.6667 23.3332L17.5001 19.1663L11.6667 24.9997"
          stroke={focused ? '#FFFFFF' : '#43734C'}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          height: 96,
          backgroundColor: '#D9D9D9',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          borderTopWidth: 0,
          elevation: 0,
          paddingTop: 30,
        },
      }}
    >
      <Tab.Screen
        name="Lights"
        component={LightsStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => <LightBulbIcon focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Gaming"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: ({ focused }) => <GameControllerIcon focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused }) => <HomeIcon focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Routines"
        component={RoutinesStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => <ScheduleIcon focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={ConsumptionScreen}
        options={{
          tabBarIcon: ({ focused }) => <GraphIcon focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    backgroundColor: '#78B85E',
  },
  tabIconContainer: {
    width: 80,
    height: 77,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIconActive: {
    backgroundColor: '#649064',
  },
});
