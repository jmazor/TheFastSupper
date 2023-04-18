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
  Dimensions
} from "react-native";
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import Navbar from '../navbar'

export default function Settings({route,navigation}) {
    const {email, token} = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>

                <TouchableOpacity style={styles.buttonInfo} onPress={()=>navigation.navigate("ChangePassword",{email:email,token:token})}>
                  <Text style={styles.buttonText}>Information</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonDel} onPress={()=>navigation.navigate("Login")}>
                 <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>

            </View>
            <Navbar email={email} token={token} navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B2B2B2',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    },
    // buttonContainer: {
    //   flexDirection: 'row',
    //   justifyContent: 'space-between',
    //   width: '100%',
    //   paddingHorizontal: 60,
    //   marginBottom: 700,
    // },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 60,
      marginBottom: 700,
    },
    buttonInfo: {
      backgroundColor: '#00ABB3',
      borderRadius: 5,
      padding: 15,
      marginRight: 20,
    },
    buttonDel: {
      backgroundColor: '#FF4C29',
      borderRadius: 5,
      padding: 15,
      marginLeft: 20,


    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 20,
    }, 
    loading: {
        textAlign: 'center',
        color: '#ccc',
        marginTop: 10,
        marginBottom: 20,
    },
});
