// homescreen
import React, { Component, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';





export default function HomeScreen({route,navigation}){
    const{email, token} = route.params;

    return (
      <View style={styles.container}>
      <View style={styles.firstrow}></View>
      <View style={styles.secondrow}></View>
      <View style={styles.thirdrow}></View>
      </View>
    );  
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#1f2041',
  },
  firstrow: {
  flex: 1,
  backgroundColor: "#ffc857"
  },
  secondrow: {
  flex: 1,
  backgroundColor: "#4b3f72"
  },
  thirdrow: {
  flex: 1,
  backgroundColor: "#119da4"
  }
  });
