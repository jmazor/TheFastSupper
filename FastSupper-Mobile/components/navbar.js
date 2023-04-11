import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import react from 'react';
//tell React that we will implement a navigator
import { NavigationContainer } from "@react-navigation/native";
//create a stack navigator
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./components/loginscreen";
import SignupScreen from "./components/signupscreen";
import HomeScreen from "./components/homescreen";
import ForgotScreen from "./components/forgotscreen";
import HistoryScreen from "./components/historyscreen";
import SavedScreen from "./components/savedscreen";


const homeName = "Home";
const savedName = "Saved";
const historyName = "History";
const settingsName = "Settings";

const Tab = createBottomTabNavigator();

function navbar() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';
              
            } else if (rn === savedName) {
                iconName = focused ? 'saved' : 'saved-outline;'

            } else if (rn === historyName) {
              iconName = focused ? 'history' : 'history-outline';

            } else if (rn === settingsName) {
              iconName = focused ? 'settings' : 'settings-outline';

            } 

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70}
        }}>

        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={savedName} component={SavedScreen} />
        <Tab.Screen name={historyName} component={HistoryScreen} />
        <Tab.Screen name={settingsName} component={SettingsScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default navbar;