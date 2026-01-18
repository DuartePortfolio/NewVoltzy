import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Ellipse } from 'react-native-svg';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useApp } from '../contexts/AppContext';

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

// Custom Tab Bar Icons
function LightBulbIcon({
  focused,
  activeColor,
  inactiveColor,
  activeBg,
}: {
  focused: boolean;
  activeColor: string;
  inactiveColor: string;
  activeBg: string;
}) {
  return (
    <View style={[styles.tabIconContainer, focused && { backgroundColor: activeBg }]}>
      <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <Path
          d="M25.0001 31.6667H15.0001C14.0001 31.6667 13.3334 31 13.3334 30V29.1667C13.3334 26.8333 12.3334 24.5 10.5001 22.6667C7.83342 20 6.50008 16.5 6.66675 12.8333C7.00008 5.83333 12.8334 0.166667 19.8334 0H20.0001C27.3334 0 33.3334 6 33.3334 13.3333C33.3334 16.8333 32.0001 20.3333 29.3334 22.8333C27.5001 24.5 26.6667 26.8333 26.6667 29.1667V30C26.6667 31 26.0001 31.6667 25.0001 31.6667ZM16.6667 28.3333H23.3334C23.5001 25.3333 24.8334 22.6667 27.0001 20.3333C29.0001 18.5 30.0001 16 30.0001 13.3333C30.0001 7.83333 25.5001 3.33333 20.0001 3.33333H19.8334C14.6667 3.5 10.1667 7.66667 10.0001 13C9.83342 15.6667 11.0001 18.3333 12.8334 20.3333C15.1667 22.6667 16.5001 25.5 16.6667 28.3333Z"
          fill={focused ? activeColor : inactiveColor}
        />
        <Path
          d="M20.0002 40.0002C16.3335 40.0002 13.3335 37.0002 13.3335 33.3335V30.0002C13.3335 29.0002 14.0002 28.3335 15.0002 28.3335H25.0002C26.0002 28.3335 26.6668 29.0002 26.6668 30.0002V33.3335C26.6668 37.0002 23.6668 40.0002 20.0002 40.0002ZM16.6668 31.6668V33.3335C16.6668 35.1668 18.1668 36.6668 20.0002 36.6668C21.8335 36.6668 23.3335 35.1668 23.3335 33.3335V31.6668H16.6668Z"
          fill={focused ? activeColor : inactiveColor}
        />
        <Path
          d="M15.0002 14.9998C14.0002 14.9998 13.3335 14.3332 13.3335 13.3332C13.3335 9.6665 16.3335 6.6665 20.0002 6.6665C21.0002 6.6665 21.6668 7.33317 21.6668 8.33317C21.6668 9.33317 21.0002 9.99984 20.0002 9.99984C18.1668 9.99984 16.6668 11.4998 16.6668 13.3332C16.6668 14.3332 16.0002 14.9998 15.0002 14.9998Z"
          fill={focused ? activeColor : inactiveColor}
        />
      </Svg>
    </View>
  );
}

function HomeIcon({
  focused,
  activeColor,
  inactiveColor,
}: {
  focused: boolean;
  activeColor: string;
  inactiveColor: string;
}) {
  return (
    <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <Path
        d="M15 36.6668V20.0002H25V36.6668M5 15.0002L20 3.3335L35 15.0002V33.3335C35 34.2176 34.6488 35.0654 34.0237 35.6905C33.3986 36.3156 32.5507 36.6668 31.6667 36.6668H8.33333C7.44928 36.6668 6.60143 36.3156 5.97631 35.6905C5.35119 35.0654 5 34.2176 5 33.3335V15.0002Z"
        stroke={focused ? activeColor : inactiveColor}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function ScheduleIcon({
  focused,
  activeColor,
  inactiveColor,
  activeBg,
}: {
  focused: boolean;
  activeColor: string;
  inactiveColor: string;
  activeBg: string;
}) {
  return (
    <View style={[styles.tabIconContainer, focused && { backgroundColor: activeBg }]}>
      <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <Path
          d="M14.9999 33.3333H9.99992C6.31802 33.3333 3.33325 30.3485 3.33325 26.6667V11.6667C3.33325 7.98477 6.31802 5 9.99992 5H28.3333C32.0151 5 34.9999 7.98477 34.9999 11.6667V16.6667"
          stroke={focused ? activeColor : inactiveColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M13.3333 3.3335V6.66683"
          stroke={focused ? activeColor : inactiveColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M25 3.3335V6.66683"
          stroke={focused ? activeColor : inactiveColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M3.33325 13.3335H34.9999"
          stroke={focused ? activeColor : inactiveColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M30.8333 26.0718L28.3333 28.5718"
          stroke={focused ? activeColor : inactiveColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M28.3333 36.6667C32.9357 36.6667 36.6667 32.9357 36.6667 28.3333C36.6667 23.731 32.9357 20 28.3333 20C23.731 20 20 23.731 20 28.3333C20 32.9357 23.731 36.6667 28.3333 36.6667Z"
          stroke={focused ? activeColor : inactiveColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

function GraphIcon({
  focused,
  activeColor,
  inactiveColor,
  activeBg,
}: {
  focused: boolean;
  activeColor: string;
  inactiveColor: string;
  activeBg: string;
}) {
  return (
    <View style={[styles.tabIconContainer, focused && { backgroundColor: activeBg }]}>
      <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <Path
          d="M6.66675 8.3335V31.6668C6.66675 32.5873 7.41295 33.3335 8.33341 33.3335H31.6667"
          stroke={focused ? activeColor : inactiveColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M30.0001 15L21.6667 23.3332L17.5001 19.1663L11.6667 24.9997"
          stroke={focused ? activeColor : inactiveColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

export default function BottomTabNavigator() {
  const { theme } = useApp();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          height: 96,
          backgroundColor: theme.colors.tabBar,
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
          tabBarIcon: ({ focused }) => (
            <LightBulbIcon
              focused={focused}
              activeColor={theme.colors.tabIconActive}
              inactiveColor={theme.colors.tabIcon}
              activeBg={theme.colors.tabIconActiveBg}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <HomeIcon
              focused={focused}
              activeColor={theme.colors.tabIconActive}
              inactiveColor={theme.colors.tabIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Routines"
        component={RoutinesStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <ScheduleIcon
              focused={focused}
              activeColor={theme.colors.tabIconActive}
              inactiveColor={theme.colors.tabIcon}
              activeBg={theme.colors.tabIconActiveBg}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={ConsumptionScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <GraphIcon
              focused={focused}
              activeColor={theme.colors.tabIconActive}
              inactiveColor={theme.colors.tabIcon}
              activeBg={theme.colors.tabIconActiveBg}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabIconContainer: {
    width: 80,
    height: 77,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
