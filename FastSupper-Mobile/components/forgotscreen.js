
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
import Navbar from './navbar'
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

export default function ForgotScreen({ navigation }) 
{
  const [email, setEmail] = useState("");
  const[error, setError] = useState("");

  

  const handleForgot = () => {
    axios.post('https://fastsupper.herokuapp.com/api/forgotpassword', {
    email: email,
  })
  .then(function (response) {
    console.log(response);
    navigation.navigate("Login");      
  })
  .catch(function (error) {
    console.log(error);
    setError(error.response.data);
  });
  
}

  

  return (

    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/fastSupperLogo.png')}/>
      <Text>Please Enter Your Email</Text>
        
      <Text>You can change to a personal password at settings after receiving your temporary password.</Text>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email:"
          placeholderTextColor="#000000"
          onChangeText={(email) => setEmail(email)}
        /> 
      </View>

      <Text style={styles.error}>{error}</Text>

      
      <TouchableOpacity>
        <Text onPress={handleForgot} style={styles.loginBtn}>Send New Password</Text>
      </TouchableOpacity> 
      
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
    height: 170,
    width: 170,
  },
  inputView: {
    backgroundColor: "#F0EEED",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#408E91",
  },
  error :{
    color: '#FF0000',
  }
});






    