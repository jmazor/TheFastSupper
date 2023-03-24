// signupscreen.js
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
// import './assets/fastSupperLogo.png';



export default function SignupScreen() 
{
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const navigation = useNavigation();
  
    const handleSignUp = () => {
      axios.post('https://fastsupper.herokuapp.com/api/signup', {
        email: email,
        password: password,
        firstName: first,
        lastName: last
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
     navigation.goBack();
    }
  
  return (
    <View style={styles.container}>
      
      {/* <Image style={styles.image} source={require("./assets/fastSupperLogo.png")} />  */}
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="First Name:"
          placeholderTextColor="#000000"
          onChangeText={(first) => setFirst(first)}
        /> 
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Last Name:"
          placeholderTextColor="#000000"
          onChangeText={(last) => setLast(last)}
        /> 
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email:"
          placeholderTextColor="#000000"
          onChangeText={(email) => setEmail(email)}
        /> 
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password:"
          placeholderTextColor="#000000"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        /> 
      </View>  
      <TouchableOpacity style={styles.loginBtn}>
        <Button title="Sign Up" onPress={handleSignUp} style={styles.loginText}   ></Button>   
        
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
});