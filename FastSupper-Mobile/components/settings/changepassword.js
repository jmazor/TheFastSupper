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



export default function ChangePassword({route,navigation}){
    const{email, token, oldPassword} = route.params;
    console.log(oldPassword);
    const[oldPass, setOldPass] = useState(oldPassword);
    const[newPass, setNewPass] = useState("");
    const[isPasswordVisible, setIsPasswordVisible] = useState(false);
    const[error, setError] = useState("");
    


    const handleChangePassword = () => {
      axios.post('https://fastsupper.herokuapp.com/api/change-password', {
      token:token,
      newPassword:newPass,
      oldPassword:oldPass,
    })
    .then(function (response) {
      console.log(response);
      navigation.navigate("Home",{email:email,token:token});        
    })
    .catch(function (error) {
      console.log(error);
      setError(error.response.data);
    });
  }

  const togglePasswordVisibility = () =>{
    setIsPasswordVisible(!isPasswordVisible);
    };



  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../assets/fastSupperLogo.png')}/>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Old Password:"
          value={oldPass}
          placeholderTextColor="#000000"
          secureTextEntry={!isPasswordVisible}
        /> 
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Text  style={styles.toggleButton}> {isPasswordVisible ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="New Password:"
          placeholderTextColor="#000000"
          secureTextEntry={!isPasswordVisible}
          onChangeText={(newPass) => setNewPass(newPass)}
        /> 
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Text  style={styles.toggleButton}> {isPasswordVisible ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View> 

      <Text style={styles.error}>{error}</Text>
            
     
      <TouchableOpacity style={styles.loginBtn} onPress={handleChangePassword}>
        <Text style={styles.loginText}>Change Password</Text> 
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
    borderRadius: 45,
    width: "70%",
    height: 60,
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
  toggleButton:{
    color: '#007AFF',
    marginLeft: 10,
  },
  error :{
    color: '#FF0000',
  }
});
