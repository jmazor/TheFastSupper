import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, TextInput, Alert, Modal, Pressable} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import Navbar from './navbar'



export default function LikedScreen({route,navigation}) {
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const{email, token} = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const[modalVisible, setModalVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };



  useEffect(() => {
      wishlist();
  },[]);
  //[page]

  const wishlist = async () => {
    //setLoading(true);
    try {
      const response = await axios.post('https://fastsupper.herokuapp.com/api/wishlist',{
      token:token
      })
      const data = response.data;
      setRestaurants(prevRestaurants => [...prevRestaurants, ...data.wishlist]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRes = async (item) => {

    axios.post('https://fastsupper.herokuapp.com/api/history-delete', {
    token:token,
    restaurantID: item._id
  })
  .then(function (response) {
    console.log(response);
    deleteItemByID(item.id);
  })
  .catch(function (error) {
    console.log(error);
  });
};



  deleteItemByID = (id) =>{
    let arr = restaurants.filter(function(item) {
      return item.id !== id
    })
    setRestaurants(arr);
  }

  const handleSearch = text =>{
    setSearchQuery(text); 
  }

  const filteredRestaurants = restaurants.filter(
    restaurant =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const RenderHeader = () => {
    return(
    <View style={styles.header}>
      <TextInput autoCapitalize='none'
        onChangeText={handleSearch}
        value={searchQuery}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoFocus={isFocused}
        status='info'
        placeholder='Search'
       ></TextInput>
    </View>
  )}

  const renderRestaurant = ({ item }) => (
    <TouchableOpacity style={styles.restaurant}>
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.categories[0].title}</Text>
        <Text style={styles.description}>{item.location.display_address}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonInfo} onPress={()=>navigation.navigate("Show", {item:item,email:email,token:token})}>
            <Text style={styles.buttonText}>Information</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>deleteRes(item)} style={styles.buttonDel}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
  

  return (
    <View style={styles.container}>
      <FlatList style={styles.listContainer}
        data={filteredRestaurants}
        //data={restaurants}
        renderItem={renderRestaurant}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={RenderHeader}
        //onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading && <Text style={styles.loading}>Loading more restaurants...</Text>}
      />
      
      <Navbar email={email} token={token} navigation={navigation} />
      
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B2B2B2',
    paddingBottom: 70,
  },
  navbar: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  listContainer: {
    flexGrow: 1,
  },
  header: {
    borderRadius: 25,
    backgroundColor: '#fff',
    padding: 10,
    margin: 20,
    marginTop: 80, // add margin to the top of the header
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    borderRadius: 25,
    borderColor: '#333',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',

  },
  restaurant: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#2C394B',
    backgroundColor: '#3C4048',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    padding: 10,
    marginHorizontal: 20,
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
    color: 'white',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',

  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    color: 'white',

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonInfo: {
    backgroundColor: '#00ABB3',
    borderRadius: 5,
    padding: 10,
    marginRight: 5,
  },
  buttonDel: {
    backgroundColor: '#FF4C29',
    borderRadius: 5,
    padding: 10,
    marginRight: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  }, 
  loading: {
    textAlign: 'center',
    color: '#ccc',
    marginTop: 10,
    marginBottom: 20,
  },
});
