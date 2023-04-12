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
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';





export default function Settings({route,navigation}){
    const{email, token} = route.params;
    
    return(

        <View>
                <Button title="Change Password" onPress={() => navigation.navigate("ChangePassword",{email:email,token:token})}></Button>

        </View>


    );


};