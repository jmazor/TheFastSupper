import React, { useEffect, useState } from 'react';
import {Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';

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
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLiked}>
            <Text style={styles.buttonText}>Like</Text>
          </TouchableOpacity>
          </View>
        </TouchableOpacity>
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

      <View style={styles.bottom}>
        <Button title="Settings" onPress={() =>navigation.navigate("Settings",{email:email,token:token})}></Button>
        <Button title="Log Out" onPress={()=> navigation.navigate("Login")}></Button>
        <Button title="Liked" onPress={()=> navigation.navigate("Liked", {email:email,token:token})}></Button>
        <Button title="Places You've Visited" onPress={()=> navigation.navigate("Visited", {email:email,token:token})}></Button>
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
    
// const styles = StyleSheet.create({
//   container: {
//   flex: 1,
//   backgroundColor: '#1f2041',
//   },
//   firstrow: {
//   flex: 1,
//   backgroundColor: "#ffc857"
//   },
//   secondrow: {
//   flex: 1,
//   backgroundColor: "#4b3f72"
//   },
//   thirdrow: {
//   flex: 1,
//   backgroundColor: "#119da4"
//   }
//   });
