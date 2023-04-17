import React, { useEffect, useState } from 'react';
import {Dimensions, Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import Navbar from './navbar'

export default function HomeScreen({route,navigation}) {
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const{email, token} = route.params;
  const[currentIndex,setCurrentIndex] = useState(0);
  const[restaurantID,setRestaurantID] = useState("");

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.post(`https://fastsupper.herokuapp.com/api/restaurants`,{
        token:token,
      })
      const data = response.data;
      setCurrentIndex(0);
      setRestaurants(data.randomRestaurants);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLiked = () => {
    const item = restaurants[currentIndex];
    axios.post('https://fastsupper.herokuapp.com/api/history-new', {
    token:token,
    restaurantID: item._id,
    liked:true
  })
  .then(function (response) {
    console.log(response);
    handleNext();    
  })
  .catch(function (error) {
    console.log(error);
  });
};

const renderRestaurant = () => {
  const item = restaurants[currentIndex];
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.restaurant}>
        <Image source={{ uri: item.image_url }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.description}>{item.categories[0].title}</Text>
          <Text style={styles.description}>{item.location.display_address}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLiked}>
          <Text style={styles.buttonText}>Like</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

  

  const handleNext = () => {
    if (currentIndex === restaurants.length - 1)
    {
        fetchRestaurants();
    }
    else{
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <View style={styles.container}>
      {restaurants.length > 0 ? renderRestaurant() : <Text>Loading...</Text>}
      <Navbar email={email} token={token} navigation={navigation} />
    </View>
    
    
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  },
  listContainer: {
    flex: 1,
  },
  restaurant: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  image: {
    width: Dimensions.get('window').width / 2,
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#2f95dc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loading: {
    textAlign: 'center',
    color: '#ccc',
    marginTop: 10,
    marginBottom: 20,
  },
});