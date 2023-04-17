import React, { useEffect, useState } from 'react';
import {Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';

export default function ShowScreen({route,navigation}) {
  const{item,email,token} = route.params;

  const visitedRes = async (item) => {
    //console.log(token);
    //console.log(item._id);
    axios.post('https://fastsupper.herokuapp.com/api/history-visited', {
    token:token,
    restaurantID: item._id
  })
  .then(function (response) {
    console.log(response);
    navigation.navigate("Visited", {email:email,token:token})
  })
  .catch(function (error) {
    console.log(error);
  });
};

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.restaurant}>
          <Image source={{ uri: item.image_url }} style={styles.image} />
          <View style={styles.details}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.categories[0].title}</Text>
            <Text style={styles.description}>Address: {item.location.display_address}</Text>
            <Text style={styles.description}>Rating: {item.rating}</Text>
            <Text style={styles.description}>Price: {item.price}</Text>
          </View>
        </TouchableOpacity>

      <View style={styles.bottom}>
        <Button title="Visited" onPress={() => visitedRes(item)}></Button>
        <Button title="Go Back" onPress={() =>navigation.goBack()}></Button>
      </View>
    </View>
    
  );
};
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        width: 300,
        height: 500,
        backgroundColor: '#f8f8f8',
        padding: 20,
      },
      bottom:{
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
      }, 
      listContainer: {
        flexGrow: 1,
      },
      restaurant: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 20,
        overflow: 'hidden',
      },
      image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
      },
      details: {
        flex: 1,
        padding: 10,
      },
      name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      description: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 10,
      },
      button: {
        backgroundColor: '#f55d22',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
      },
      buttonText: {
        color: '#fff',
        fontSize: 18,
      },
      loading: {
        textAlign: 'center',
        color: '#ccc',
        marginTop: 10,
        marginBottom: 20,
      },
    });
    